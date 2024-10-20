const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' } 
});

const TokenModel = mongoose.model('Token', tokenSchema);
module.exports= TokenModel;