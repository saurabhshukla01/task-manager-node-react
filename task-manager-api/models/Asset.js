const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  secretKey: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Asset', assetSchema);


