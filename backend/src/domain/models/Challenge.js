// models/Challenge.js

const mongoose = require('mongoose')

const milestoneSchema = new mongoose.Schema({
  title: String,
  description: String,
  completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const challengeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    goal: Number,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    milestones: [milestoneSchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Challenge', challengeSchema)
