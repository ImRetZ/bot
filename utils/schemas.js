const mongoose = require('mongoose')

const User = new mongoose.Schema({
  id: { type: String, unique: true, required: true},
  uang: { type: Number, default: 0},
  xp: { type: Number, default: 1000},
  fish: { type: Number, default: 0}
})

module.exports = { User: mongoose.model("User", User) }