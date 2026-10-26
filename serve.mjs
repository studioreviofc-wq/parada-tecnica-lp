// Servidor estático mínimo para revisar o wireframe. Uso: node serve.mjs  →  http://localhost:8094
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 8094;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };

createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const path = join(root, normalize(url).replace(/^(\.\.[/\\])+/, ''));
  try {
    if ((await stat(path)).isDirectory()) {
      if (!url.endsWith('/')) {
        res.writeHead(301, { Location: url + '/' });
        return res.end();
      }
      return send(res, join(path, 'index.html'));
    }
    return send(res, path);
  } catch {
    res.writeHead(404).end('404');
  }
}).listen(port, () => console.log(`Wireframe em http://localhost:${port}/`));

async function send(res, file) {
  const data = await readFile(file);
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  res.end(data);
}
