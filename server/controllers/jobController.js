import Job from '../models/Job.js';
import Company from '../models/Company.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Job.find(JSON.parse(queryStr)).populate('company postedBy');

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Job.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const jobs = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: jobs.length,
      pagination,
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('company postedBy applications');

    if (!job) {
      return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Recruiter/Admin)
export const createJob = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.postedBy = req.user.id;

    const job = await Job.create(req.body);

    // Add job to company's jobs array
    await Company.findByIdAndUpdate(req.body.company, {
      $push: { jobs: job._id },
    });

    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Recruiter/Admin)
export const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is job poster or admin
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this job`, 401));
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter/Admin)
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is job poster or admin
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this job`, 401));
    }

    await job.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// Option 1: Named exports (recommended)
export default { getJobs, getJob, createJob, updateJob, deleteJob };

// Option 2: Default export (alternative)
// export default { getJobs, getJob, createJob, updateJob, deleteJob };