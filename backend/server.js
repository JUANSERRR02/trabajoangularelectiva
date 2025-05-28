const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");

const corsMiddleware = cors();

const MONGO_LOCAL = "mongodb://localhost:27017/mi-db";
const MONGO_SERVER = "mongodb://51.210.177.195:27017/mi-db";

mongoose
  .connect(MONGO_LOCAL)
  .then(() => console.log("Connected to Mongolandia"))
  .catch((err) => console.error("Mongolandia connection error:", err));

const psuRoutes = require("./routes/psuRoutes");
const motherboardRoutes = require("./routes/motherboardRoutes");
const gpuRoutes = require("./routes/gpuRoutes");
const cpuRoutes = require("./routes/cpuRoutes");

const server = http.createServer(async (req, res) => {
  corsMiddleware(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.writeHead(204, { "Content-Type": "text/plain" });
      return res.end();
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;

    if (path.startsWith("/api/cpu")) {
      cpuRoutes(req, res);
    } else if (path.startsWith("/api/psu")) {
      psuRoutes(req, res);
    } else if (path.startsWith("/api/motherboard")) {
      motherboardRoutes(req, res);
    } else if (path.startsWith("/api/gpu")) {
      gpuRoutes(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    }
  });
});

const PORT = 8001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});