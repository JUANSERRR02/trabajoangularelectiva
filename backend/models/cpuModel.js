const mongoose = require('mongoose');

const cpuSchema = new mongoose.Schema({
  name: String,
  cores: Number,
});

module.exports = mongoose.model('CPU', cpuSchema);