/**
 * Store / in-app alias (`/toldya/safety`) for Child Safety Standards.
 * Same content as `/toldya/child-safety` so static export returns HTTP 200
 * (Cloudflare `_redirects` also maps this path for clients that hit the alias).
 */
export {
  default,
  generateMetadata,
} from '../child-safety/page';
