import ErrorResponse from '../utils/errorResponse.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private (Admin/Recruiter)
export const getApplications = async (req, res, next) => {
  try {
    let query;

    if (req.user.role === 'recruiter') {
      // For recruiters, only show applications for their jobs
      const jobs = await Job.find({ postedBy: req.user.id });
      const jobIds = jobs.map(job => job._id);
      query = Application.find({ job: { $in: jobIds } });
    } else if (req.user.role === 'candidate') {
      // For candidates, only show their own applications
      query = Application.find({ candidate: req.user.id });
    } else {
      // For admins, show all applications
      query = Application.find();
    }

    const applications = await query
      .populate('job candidate')
      .sort('-appliedAt');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
export const getApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job candidate');

    if (!application) {
      return next(new ErrorResponse(`Application not found with id of ${req.params.id}`, 404));
    }

    // Check if user is authorized to view this application
    if (
      req.user.role === 'candidate' && 
      application.candidate._id.toString() !== req.user.id
    ) {
      return next(new ErrorResponse(`Not authorized to view this application`, 401));
    }

    if (req.user.role === 'recruiter') {
      const job = await Job.findById(application.job._id);
      if (job.postedBy.toString() !== req.user.id) {
        return next(new ErrorResponse(`Not authorized to view this application`, 401));
      }
    }

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// @desc    Create application
// @route   POST /api/applications
// @access  Private (Candidate)
export const createApplication = async (req, res, next) => {
  try {
    // Check if user is a candidate
    if (req.user.role !== 'candidate') {
      return next(new ErrorResponse(`Only candidates can apply for jobs`, 400));
    }

    // Add candidate to req.body
    req.body.candidate = req.user.id;

    // Check if job exists
    const job = await Job.findById(req.body.job);
    if (!job) {
      return next(new ErrorResponse(`Job not found with id of ${req.body.job}`, 404));
    }

    // Check if job is open
    if (job.status !== 'open') {
      return next(new ErrorResponse(`This job is not currently accepting applications`, 400));
    }

    // Check if deadline has passed
    if (job.deadline && new Date(job.deadline) < new Date()) {
      return next(new ErrorResponse(`The application deadline for this job has passed`, 400));
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: req.body.job,
      candidate: req.user.id,
    });

    if (existingApplication) {
      return next(new ErrorResponse(`You have already applied for this job`, 400));
    }

    const application = await Application.create(req.body);

    // Add application to job's applications array
    await Job.findByIdAndUpdate(req.body.job, {
      $push: { applications: application._id },
    });

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter/Admin)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    let application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return next(new ErrorResponse(`Application not found with id of ${req.params.id}`, 404));
    }

    // Check if user is authorized to update this application
    if (req.user.role === 'recruiter') {
      const job = await Job.findById(application.job._id);
      if (job.postedBy.toString() !== req.user.id) {
        return next(new ErrorResponse(`Not authorized to update this application`, 401));
      }
    }

    // Update status
    application.status = req.body.status;
    await application.save();

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// @desc    Add note to application
// @route   POST /api/applications/:id/notes
// @access  Private (Recruiter/Admin)
export const addApplicationNote = async (req, res, next) => {
  try {
    let application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return next(new ErrorResponse(`Application not found with id of ${req.params.id}`, 404));
    }

    // Check if user is authorized to add note
    if (req.user.role === 'recruiter') {
      const job = await Job.findById(application.job._id);
      if (job.postedBy.toString() !== req.user.id) {
        return next(new ErrorResponse(`Not authorized to add note to this application`, 401));
      }
    }

    // Add note
    application.notes.push({
      text: req.body.text,
      createdBy: req.user.id,
    });
    await application.save();

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// Export all controller functions
export default {
  getApplications,
  getApplication,
  createApplication,
  updateApplicationStatus,
  addApplicationNote
};