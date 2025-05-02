import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [String],
  skillsRequired: [String],
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
    required: true,
  },
  salary: {
    min: Number,
    max: Number,
    currency: String,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    },
  ],
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open',
  },
  deadline: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default jobSchema;