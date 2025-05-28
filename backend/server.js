const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

const corsMiddleware = cors();

mongoose.connect('mongodb://localhost:27017/mi-db')
  .then(() => console.log('Connected to Mongolandia'))
  .catch((err) => console.error('Mongolandia connection error:', err));

const psuRoutes = require('./routes/psuRoutes');
const motherboardRoutes = require('./routes/motherboardRoutes');
const gpuRoutes = require('./routes/gpuRoutes');
const cpuRoutes = require('./routes/cpuRoutes');

const server = http.createServer(async (req, res) => {
  corsMiddleware(req, res, async () => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, { 'Content-Type': 'text/plain' });
      return res.end();
    }

    if (req.url.startsWith('/psu')) {
      psuRoutes(req, res);
    } else if (req.url.startsWith('/motherboards')) {
      motherboardRoutes(req, res);
    } else if (req.url.startsWith('/gpu')) {
      gpuRoutes(req, res);
    } else if (req.url.startsWith('/cpu')) {
      cpuRoutes(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});