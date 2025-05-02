import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  coverLetter: String,
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'submitted',
  },
  notes: [
    {
      text: String,
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = mongoose.model('Application', applicationSchema);
export default applicationSchema;