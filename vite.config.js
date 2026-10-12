import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { projects } from './src/consultancy/data/projects.ts';

const root = fileURLToPath(new URL('.', import.meta.url));
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Preserve direct case-study URLs in development and on ordinary static hosts.
function consultancyPages() {
  let output;
  let isBuild = false;
  return {
    name: 'consultancy-pages',
    configResolved(config) { output = resolve(config.root, config.build.outDir); isBuild = config.command === 'build'; },
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (/^\/consultancy\/work\/[^/?]+\/?(?:\?.*)?$/.test(req.url || '')) req.url = '/consultancy/index.html';
        next();
      });
    },
    async closeBundle() {
      if (!isBuild) return;
      const template = await readFile(resolve(output, 'consultancy/index.html'), 'utf8');
      for (const project of projects) {
        const directory = resolve(output, 'consultancy/work', project.slug);
        await mkdir(directory, { recursive: true });
        await writeFile(resolve(directory, 'index.html'), template
          .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(project.title)} | DADA Consultancy</title>`)
          .replace(/(<meta name="description" content=")[^"]*("\s*\/>)/, `$1${escapeHtml(project.summary)}$2`));
      }
    },
  };
}

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  plugins: [tailwindcss(), consultancyPages()],
  resolve: { alias: { '@': resolve(root, 'src/consultancy') } },
  build: { rollupOptions: { input: {
    main: resolve(root, 'index.html'),
    consultancy: resolve(root, 'consultancy/index.html'),
    workshop: resolve(root, 'workshop/index.html'),
  } } },
});
