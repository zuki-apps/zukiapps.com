import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'app-ads.txt');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    return new NextResponse(fileContent.trim(), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error reading app-ads.txt:', error);
    return new NextResponse('File not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

// Ensure this route is not cached incorrectly
export const dynamic = 'force-dynamic';

