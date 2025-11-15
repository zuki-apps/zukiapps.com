import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', '.well-known', 'assetlinks.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(fileContent);

    return new NextResponse(JSON.stringify(json), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error reading assetlinks.json:', error);
    return new NextResponse(
      JSON.stringify({ error: 'File not found' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

