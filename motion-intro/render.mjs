// Render motion design ke MP4 frame-demi-frame (deterministik).
// Pemakaian: node render.mjs [output.mp4] [fps]
//   START=0 END=20 node render.mjs seg1.mp4   -> render sebagian (detik), untuk render paralel
//   PREVIEW="1,5.5,12" node render.mjs   -> simpan still PNG di frame waktu tertentu
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || path.join(here, 'pakaiai-intro.mp4');
const fps = +(process.argv[3] || 30);
const ffmpeg = process.env.FFMPEG || 'ffmpeg';

const browser = await chromium.launch({
  executablePath: process.env.CHROME || undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('console', m => { if (m.type() === 'error') console.error('[page]', m.text()); });
page.on('pageerror', e => console.error('[pageerror]', e.message));
await page.goto(pathToFileURL(path.join(here, 'index.html')).href + '?render=1');
await page.waitForFunction(() => window.__ready === true);
const dur = await page.evaluate(() => window.__DUR);

if (process.env.PREVIEW) {
  for (const t of process.env.PREVIEW.split(',').map(Number)) {
    await page.evaluate(t => window.__seek(t), t);
    await page.screenshot({ path: path.join(process.env.PREVIEW_DIR || here, `still-${String(t).padStart(5, '0')}.png`) });
  }
  await browser.close();
  process.exit(0);
}

const first = Math.round((+(process.env.START || 0)) * fps);
const last = Math.min(Math.round(dur * fps), Math.round((+(process.env.END || dur)) * fps));
const ff = spawn(ffmpeg, ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out],
  { stdio: ['pipe', 'inherit', 'inherit'] });
const t0 = Date.now();
for (let i = first; i < last; i++) {
  await page.evaluate(t => window.__seek(t), i / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 150 === 0) console.log(`frame ${i}/${last}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await browser.close();
console.log('selesai:', out);
