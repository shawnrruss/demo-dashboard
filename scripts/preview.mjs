import console from 'node:console';
import process from 'node:process';
import { mkdir } from 'node:fs/promises';
import { preview } from 'astro';
import { chromium } from 'playwright';

async function main() {
  const server = await preview({ server: { host: '127.0.0.1', port: 4321 }, logLevel: 'error' });
  try {
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, locale: 'en-GB', timezoneId: 'UTC' });
      await page.goto(`http://127.0.0.1:${server.port}/members/member-1/`, { waitUntil: 'networkidle' });
      await page.getByRole('heading', { name: 'Plot bookings' }).waitFor();
      await mkdir('docs', { recursive: true });
      await page.screenshot({ path: 'docs/preview.png', fullPage: true });
      console.log('Saved docs/preview.png from the built member dashboard.');
    } finally {
      await browser.close();
    }
  } finally {
    await server.stop();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
