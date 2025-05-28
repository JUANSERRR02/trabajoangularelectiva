const PSU = require("../models/psuModel");
const { sendJsonResponse } = require("../utils/jsonResponse");

async function getAll(req, res) {
  try {
    const psus = await PSU.find();
    sendJsonResponse(res, 200, psus);
  } catch (error) {
    sendJsonResponse(res, 500, { error: "Internal Server Error" });
  }
}

async function getOne(req, res, id) {
  try {
    const psu = await PSU.findById(id);
    if (!psu) {
      return sendJsonResponse(res, 404, { error: "Not Found" });
    }
    sendJsonResponse(res, 200, psu);
  } catch (error) {
    sendJsonResponse(res, 500, { error: "Internal Server Error" });
  }
}

async function createOne(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const newItem = new PSU(JSON.parse(body));
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
      const updatedItem = await PSU.findByIdAndUpdate(id, JSON.parse(body), {
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
    const deletedItem = await PSU.findByIdAndDelete(id);
    if (!deletedItem) {
      return sendJsonResponse(res, 404, { error: "Not Found" });
    }
    sendJsonResponse(res, 200, { message: "Deleted successfully" });
  } catch (error) {
    sendJsonResponse(res, 500, { error: "Internal Server Error" });
  }
}

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
