const mongoose = require('mongoose');

const gpuSchema = new mongoose.Schema({
  name: String,
  brand: String,
});

module.exports = mongoose.model('GPU', gpuSchema);