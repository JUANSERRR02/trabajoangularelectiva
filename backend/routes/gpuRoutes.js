const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controller/gpuController");

function gpuRoutes(req, res) {
  const { url, method } = req;

  // Check if the URL starts with /api/gpu
  if (!url.startsWith('/api/gpu')) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Not Found" }));
  }

  // Remove the /api prefix and match the remaining path
  const baseRoute = url.replace('/api', '');
  const idMatch = baseRoute.match(/\/gpu\/(\w+)$/);
  const id = idMatch ? idMatch[1] : null;

  if (baseRoute === "/gpu" && method === "GET") {
    getAll(req, res);
  } else if (baseRoute === "/gpu" && method === "POST") {
    createOne(req, res);
  } else if (id && method === "GET") {
    getOne(req, res, id);
  } else if (id && method === "PUT") {
    updateOne(req, res, id);
  } else if (id && method === "DELETE") {
    deleteOne(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
}

module.exports = gpuRoutes;