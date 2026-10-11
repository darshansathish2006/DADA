// Prepare web-sized copies without cropping. Source files remain unchanged.
import { createRequire } from 'node:module';
import { copyFile, mkdir } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const sharp = require(require.resolve('sharp', { paths: [process.cwd(), 'D:/Projects/DADA-PORTFOLIO/DADA-Portfolio'] }));
const photos = [
  ['D:/Projects/Portfolio/assets/img/stage/ai-nexus.webp', 'ai-nexus-conversation.webp'],
  ['D:/Projects/Portfolio/assets/img/stage/hackathon-awareness.webp', 'hackathon-awareness.webp'],
  ['D:/Projects/Portfolio/assets/img/stage/click-phase-1.webp', 'click-phase-1.webp'],
  ['click-deploy1.png', 'click-deploy1.webp'],
  ['click-deploy2.jpeg', 'click-deploy2.webp'],
];
await mkdir('public/assets/events', { recursive: true });
for (const filename of ['ainexus-stall.jpg', 'click-launch.jpg', 'awareness-talk.jpg']) {
  await copyFile(`D:/Projects/DADA-PORTFOLIO/DADA-Portfolio/public/events/${filename}`, `public/assets/events/${filename}`);
}
for (const [source, filename] of photos) {
  const result = await sharp(source).rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86 }).toFile(`public/assets/events/${filename}`);
  console.log(`${filename}: ${result.width} × ${result.height}, ${Math.round(result.size / 1024)} KB`);
}
