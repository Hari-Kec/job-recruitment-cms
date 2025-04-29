const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeLink: String,
  appliedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Application', applicationSchema)
