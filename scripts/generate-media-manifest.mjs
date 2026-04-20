import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const mediaDirectory = path.resolve(process.cwd(), 'public', 'media');
const outputPath = path.join(mediaDirectory, 'manifest.json');
const allowedExtensions = new Set([
  '.mp4', '.webm', '.mov', '.m4v',
  '.mp3', '.wav', '.ogg', '.m4a', '.aac',
  '.jpg', '.jpeg', '.png', '.webp', '.gif',
  '.pdf',
]);

const run = async () => {
  await mkdir(mediaDirectory, { recursive: true });

  const entries = await readdir(mediaDirectory, { withFileTypes: true });
  const mediaFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => {
      if (name === 'manifest.json' || name.startsWith('.')) return false;
      return allowedExtensions.has(path.extname(name).toLowerCase());
    })
    .sort((a, b) => a.localeCompare(b));

  const manifest = mediaFiles.map((fileName) => ({ fileName }));
  await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(`Generated media manifest with ${manifest.length} file(s).`);
};

run().catch((error) => {
  console.error('Failed to generate media manifest:', error);
  process.exit(1);
});
