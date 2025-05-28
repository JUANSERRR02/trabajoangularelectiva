const CPU = require('../models/cpuModel');
const { sendJsonResponse } = require("../utils/jsonResponse");

async function getAll(req, res) {
  try {
    const cpus = await CPU.find();
    sendJsonResponse(res, 200, cpus);
  } catch (error) {
    sendJsonResponse(res, 500, { error: 'Internal Server Error' });
  }
}

async function getOne(req, res, id) {
  try {
    const cpu = await CPU.findById(id);
    if (!cpu) {
      return sendJsonResponse(res, 404, { error: 'Not Found' });
    }
    sendJsonResponse(res, 200, cpu);
  } catch (error) {
    sendJsonResponse(res, 500, { error: 'Internal Server Error' });
  }
}

async function createOne(req, res) {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', async () => {
    try {
      const newItem = new CPU(JSON.parse(body));
      await newItem.save();
      sendJsonResponse(res, 201, newItem);
    } catch (error) {
      sendJsonResponse(res, 400, { error: 'Invalid input' });
    }
  });
}

async function updateOne(req, res, id) {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', async () => {
    try {
      const updatedItem = await CPU.findByIdAndUpdate(id, JSON.parse(body), { new: true });
      if (!updatedItem) {
        return sendJsonResponse(res, 404, { error: 'Not Found' });
      }
      sendJsonResponse(res, 200, updatedItem);
    } catch (error) {
      sendJsonResponse(res, 400, { error: 'Invalid input' });
    }
  });
}

async function deleteOne(req, res, id) {
  try {
    const deletedItem = await CPU.findByIdAndDelete(id);
    if (!deletedItem) {
      return sendJsonResponse(res, 404, { error: 'Not Found' });
    }
    sendJsonResponse(res, 200, { message: 'Deleted successfully' });
  } catch (error) {
    sendJsonResponse(res, 500, { error: 'Internal Server Error' });
  }
}

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };