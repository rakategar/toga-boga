// Server lokal: file statis + /api/chat (meniru Vercel). Jalankan: node _dev/server.mjs
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
try {
  for (const line of (await readFile(join(root, '.env.local'), 'utf8')).split('\n')) {
    const m = line.match(/^(\w+)=(.*)$/);
    if (m) process.env[m[1]] ??= m[2];
  }
} catch {}
const { POST } = await import('../api/chat.js');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml' };
const port = +process.env.PORT || 5317;

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/api/chat' && req.method === 'POST') {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const r = await POST(new Request(url, { method: 'POST', headers: req.headers, body: Buffer.concat(chunks) }));
    res.writeHead(r.status, Object.fromEntries(r.headers));
    for await (const c of r.body) res.write(c);
    return res.end();
  }
  let p = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (p.endsWith('/')) p += 'index.html';
  const file = join(root, p);
  try {
    if (!(await stat(file)).isFile()) throw 0;
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`http://localhost:${port}`));
