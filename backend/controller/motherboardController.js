const Motherboard = require("../models/motherboardModel");
const { sendJsonResponse } = require("../utils/jsonResponse");

async function getAll(req, res) {
  try {
    const motherboards = await Motherboard.find();
    sendJsonResponse(res, 200, motherboards);
  } catch (error) {
    sendJsonResponse(res, 500, { error: "Internal Server Error" });
  }
}

async function getOne(req, res, id) {
  try {
    const motherboard = await Motherboard.findById(id);
    if (!motherboard) {
      return sendJsonResponse(res, 404, { error: "Not Found" });
    }
    sendJsonResponse(res, 200, motherboard);
  } catch (error) {
    sendJsonResponse(res, 500, { error: "Internal Server Error" });
  }
}

async function createOne(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const newItem = new Motherboard(JSON.parse(body));
      await newItem.save();
      sendJsonResponse(res, 201, newItem);
    } catch (error) {
      sendJsonResponse(res, 400, { error: "Invalid input" });
    }
  });
}

async function updateOne(req, res, id) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const updatedItem = await Motherboard.findByIdAndUpdate(
        id,
        JSON.parse(body),
        { new: true }
      );
      if (!updatedItem) {
        return sendJsonResponse(res, 404, { error: "Not Found" });
      }
      sendJsonResponse(res, 200, updatedItem);
    } catch (error) {
      sendJsonResponse(res, 400, { error: "Invalid input" });
    }
  });
}

async function deleteOne(req, res, id) {
  try {
    const deletedItem = await Motherboard.findByIdAndDelete(id);
    if (!deletedItem) {
      return sendJsonResponse(res, 404, { error: "Not Found" });
    }
    sendJsonResponse(res, 200, { message: "Deleted successfully" });
  } catch (error) {
    sendJsonResponse(res, 500, { error: "Internal Server Error" });
  }
}

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
