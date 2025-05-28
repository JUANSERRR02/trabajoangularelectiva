const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controller/gpuController");

function gpuRoutes(req, res) {
  const { url, method } = req;

  const idMatch = url.match(/\/gpu\/(\w+)$/);
  const id = idMatch ? idMatch[1] : null;

  if (url === "/gpu" && method === "GET") {
    getAll(req, res);
  } else if (url === "/gpu" && method === "POST") {
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
