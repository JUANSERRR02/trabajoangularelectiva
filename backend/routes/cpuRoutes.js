const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controller/cpuController");

function cpuRoutes(req, res) {
  const { url, method } = req;

  if (!url.startsWith('/api/cpu')) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Not Found" }));
  }

  const baseRoute = url.replace('/api', '');
  const idMatch = baseRoute.match(/\/cpu\/(\w+)$/);
  const id = idMatch ? idMatch[1] : null;

  if (baseRoute === "/cpu" && method === "GET") {
    getAll(req, res);
  } else if (baseRoute === "/cpu" && method === "POST") {
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

module.exports = cpuRoutes;