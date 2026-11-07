const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';

  const fullPath = path.join(ROOT, safePath);

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(fullPath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Ziki Whimsical Server running at http://localhost:${PORT}`);
});
