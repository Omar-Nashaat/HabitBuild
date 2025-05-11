const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
  streak: { type: Number, default: 0 },
  lastCompleted: { type: Date },
  createdAt: { type: Date, default: Date.now },
  reminderTime: { type: String }, // Format: "07:00"
  completionHistory: [{ type: Date }],
  totalCompletions: { type: Number, default: 0 },
  goal: { type: Number }, // e.g. 5 days in a row

})

module.exports = mongoose.model('Habit', habitSchema)
