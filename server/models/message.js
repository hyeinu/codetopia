//Should not be committed should be kept as an env variable

const mongoose = require('mongoose')
const { Schema } = mongoose;


const messageSchema = new mongoose.Schema({
  user_from: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true }
})


const User = mongoose.model('Message', messageSchema)

module.exports = User;
