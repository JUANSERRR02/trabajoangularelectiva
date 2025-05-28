const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controller/psuController");

function psuRoutes(req, res) {
  const { url, method } = req;

  const idMatch = url.match(/\/psu\/(\w+)$/);
  const id = idMatch ? idMatch[1] : null;

  if (url === "/psu" && method === "GET") {
    getAll(req, res);
  } else if (url === "/psu" && method === "POST") {
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

module.exports = psuRoutes;
