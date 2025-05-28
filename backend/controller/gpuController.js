const GPU = require("../models/gpuModel");
const { sendJsonResponse } = require("../utils/jsonResponse");

async function getAll(req, res) {
  try {
    const gpus = await GPU.find();
    sendJsonResponse(res, 200, gpus);
  } catch (error) {
    sendJsonResponse(res, 500, { error: "Internal Server Error" });
  }
}

async function getOne(req, res, id) {
  try {
    const gpu = await GPU.findById(id);
    if (!gpu) {
      return sendJsonResponse(res, 404, { error: "Not Found" });
    }
    sendJsonResponse(res, 200, gpu);
  } catch (error) {
    sendJsonResponse(res, 500, { error: "Internal Server Error" });
  }
}

async function createOne(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const newItem = new GPU(JSON.parse(body));
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
      const updatedItem = await GPU.findByIdAndUpdate(id, JSON.parse(body), {
        new: true,
      });
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
    const deletedItem = await GPU.findByIdAndDelete(id);
    if (!deletedItem) {
      return sendJsonResponse(res, 404, { error: "Not Found" });
    }
    sendJsonResponse(res, 200, { message: "Deleted successfully" });
  } catch (error) {
    sendJsonResponse(res, 500, { error: "Internal Server Error" });
  }
}

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
