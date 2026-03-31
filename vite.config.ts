import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// ── Image upload plugin ───────────────────────────────────────────────────────
// Exposes POST /api/upload?slug=<slug> in dev mode.
// Saves the uploaded file to public/case-studies/<slug>/ and returns its URL.
function imageUploadPlugin() {
  return {
    name: 'image-upload',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: () => void) => {
        if (!req.url?.startsWith('/api/upload') || req.method !== 'POST') {
          return next();
        }
        const urlObj = new URL(req.url, 'http://localhost');
        const slug = urlObj.searchParams.get('slug') || 'misc';
        const contentType: string = req.headers['content-type'] || '';
        const boundaryMatch = contentType.match(/boundary=([^\s;]+)/);
        if (!boundaryMatch) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'No multipart boundary' }));
        }
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          try {
            const body = Buffer.concat(chunks);
            const parsed = parseFirstFile(body, boundaryMatch[1]);
            if (!parsed) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'No file in upload' }));
            }
            const safeName = parsed.filename
              .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9._-]/g, '');
            const dir = path.resolve('public/case-studies', slug);
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, safeName), parsed.data);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ url: `/case-studies/${slug}/${safeName}` }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

function parseFirstFile(body: Buffer, boundary: string): { filename: string; data: Buffer } | null {
  const headerEnd = body.indexOf(Buffer.from('\r\n\r\n'));
  if (headerEnd === -1) return null;
  const headers = body.slice(0, headerEnd).toString();
  const filenameMatch = headers.match(/filename="([^"]+)"/i);
  if (!filenameMatch) return null;
  const dataStart = headerEnd + 4;
  const endMarker = Buffer.from('\r\n--' + boundary);
  const dataEnd = body.indexOf(endMarker, dataStart);
  const data = body.slice(dataStart, dataEnd === -1 ? body.length : dataEnd);
  return { filename: filenameMatch[1], data };
}
// ─────────────────────────────────────────────────────────────────────────────

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), imageUploadPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
