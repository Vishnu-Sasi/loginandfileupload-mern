const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  fileName: { type: String, required: true },
});

module.exports = mongoose.model('File', fileSchema);
