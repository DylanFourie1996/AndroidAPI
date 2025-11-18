const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  moduleName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Module', moduleSchema);
