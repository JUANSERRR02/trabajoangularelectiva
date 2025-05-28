const mongoose = require('mongoose');

const psuSchema = new mongoose.Schema({
  name: String,
  wattage: Number,
});

module.exports = mongoose.model('PSU', psuSchema);