const mongoose = require('mongoose');

const motherboardSchema = new mongoose.Schema({
  name: String,
  formFactor: String,
});

module.exports = mongoose.model('Motherboard', motherboardSchema);