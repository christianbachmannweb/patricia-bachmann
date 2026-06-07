import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const IMAGES_DIR = './public/images';
const CONVERT_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];
// Diese Dateien nicht konvertieren (Favicon/Webclip bleiben PNG für Browser/OS)
const SKIP = ['68f693e4a34b49b0779b4f31_favicon-32x32.png', '68f6942db4d0e09d8a747738_webclip-patricia-bachmann.png'];

const files = readdirSync(IMAGES_DIR).filter(f => {
  const ext = extname(f).toLowerCase();
  return CONVERT_EXTS.includes(ext) && !SKIP.includes(f);
});

console.log(`Konvertiere ${files.length} Dateien nach AVIF...\n`);

for (const file of files) {
  const input = join(IMAGES_DIR, file);
  const outName = basename(file, extname(file)) + '.avif';
  const output = join(IMAGES_DIR, outName);

  if (existsSync(output)) {
    console.log(`⏭  ${outName} (existiert bereits)`);
    continue;
  }

  try {
    await sharp(input).avif({ quality: 80 }).toFile(output);
    console.log(`✅  ${file} → ${outName}`);
  } catch (e) {
    console.error(`❌  ${file}: ${e.message}`);
  }
}

console.log('\nFertig!');
