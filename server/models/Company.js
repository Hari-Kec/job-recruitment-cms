import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  industry: String,
  website: String,
  logo: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  employees: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['admin', 'recruiter', 'hiring_manager'],
      },
    },
  ],
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default companySchema;