/**
 * After `npm run build`, starts `next start` briefly and verifies /sitemap.xml returns 200
 * and looks like a sitemap (urlset or sitemapindex).
 */
import { spawn } from 'child_process';
import http from 'http';

const port = process.env.SMOKE_PORT || '4310';
const isCi = process.env.CI === 'true';
const maxAttempts = isCi ? 50 : 35;
const firstWaitMs = isCi ? 5000 : 3000;
const retryWaitMs = isCi ? 3000 : 2000;

const child = spawn('npx', ['next', 'start', '-p', port], {
  stdio: 'inherit',
  env: { ...process.env, PORT: port },
  shell: true,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fetchSitemap() {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${port}/sitemap.xml`, (res) => {
      let body = '';
      res.on('data', (c) => {
        body += c;
      });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Expected 200, got ${res.statusCode}`));
          return;
        }
        if (!/<urlset[\s>]/.test(body) && !/<sitemapindex[\s>]/.test(body)) {
          reject(new Error('Response is not a sitemap (missing urlset/sitemapindex)'));
          return;
        }
        const locs = [...body.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1].trim());
        for (const loc of locs) {
          if (!/^https?:\/\//i.test(loc)) {
            reject(new Error(`Sitemap <loc> must be absolute URL, got: ${loc || '(empty)'}`));
            return;
          }
        }
        const hrefs = [...body.matchAll(/<xhtml:link[^>]*href="([^"]*)"/gi)].map((m) => m[1].trim());
        for (const href of hrefs) {
          if (!/^https?:\/\//i.test(href)) {
            reject(new Error(`Alternate href must be absolute URL, got: ${href || '(empty)'}`));
            return;
          }
        }
        resolve();
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function main() {
  try {
    for (let i = 0; i < maxAttempts; i++) {
      await sleep(i === 0 ? firstWaitMs : retryWaitMs);
      try {
        await fetchSitemap();
        console.log('smoke-sitemap: OK');
        return;
      } catch {
        /* server still starting */
      }
    }
    throw new Error('smoke-sitemap: failed after retries');
  } finally {
    child.kill('SIGTERM');
    if (process.platform === 'win32') {
      try {
        spawn('taskkill', ['/pid', String(child.pid), '/f', '/t'], { stdio: 'ignore' });
      } catch {
        /* ignore */
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  try {
    child.kill('SIGTERM');
  } catch {
    /* ignore */
  }
  process.exit(1);
});
