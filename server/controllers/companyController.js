import Company from '../models/Company.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
export const getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find().populate('jobs employees.user');

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
export const getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('jobs employees.user');

    if (!company) {
      return next(new ErrorResponse(`Company not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
};

// @desc    Create company
// @route   POST /api/companies
// @access  Private (Admin/Recruiter)
export const createCompany = async (req, res, next) => {
  try {
    // Check if company name already exists
    const existingCompany = await Company.findOne({ name: req.body.name });
    if (existingCompany) {
      return next(new ErrorResponse(`Company with name ${req.body.name} already exists`, 400));
    }

    const company = await Company.create(req.body);

    res.status(201).json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
};

// @desc    Update company
// @route   PUT /api/companies/:id
// @access  Private (Admin/Company Admin)
export const updateCompany = async (req, res, next) => {
  try {
    let company = await Company.findById(req.params.id);

    if (!company) {
      return next(new ErrorResponse(`Company not found with id of ${req.params.id}`, 404));
    }

    // Check if user is company admin or super admin
    const isAdmin = company.employees.some(
      emp => emp.user.toString() === req.user.id && emp.role === 'admin'
    );

    if (!isAdmin && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this company`, 401));
    }

    company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
};

// @desc    Add employee to company
// @route   POST /api/companies/:id/employees
// @access  Private (Admin/Company Admin)
export const addEmployee = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return next(new ErrorResponse(`Company not found with id of ${req.params.id}`, 404));
    }

    // Check if user is company admin or super admin
    const isAdmin = company.employees.some(
      emp => emp.user.toString() === req.user.id && emp.role === 'admin'
    );

    if (!isAdmin && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to add employees`, 401));
    }

    // Check if employee already exists
    const existingEmployee = company.employees.find(
      emp => emp.user.toString() === req.body.user
    );

    if (existingEmployee) {
      return next(new ErrorResponse(`User ${req.body.user} is already an employee`, 400));
    }

    company.employees.push({
      user: req.body.user,
      role: req.body.role || 'recruiter',
    });

    await company.save();

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove employee from company
// @route   DELETE /api/companies/:id/employees/:employeeId
// @access  Private (Admin/Company Admin)
export const removeEmployee = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return next(new ErrorResponse(`Company not found with id of ${req.params.id}`, 404));
    }

    // Check if user is company admin or super admin
    const isAdmin = company.employees.some(
      emp => emp.user.toString() === req.user.id && emp.role === 'admin'
    );

    if (!isAdmin && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to remove employees`, 401));
    }

    // Find employee index
    const employeeIndex = company.employees.findIndex(
      emp => emp._id.toString() === req.params.employeeId
    );

    if (employeeIndex === -1) {
      return next(new ErrorResponse(`Employee not found with id of ${req.params.employeeId}`, 404));
    }

    company.employees.splice(employeeIndex, 1);
    await company.save();

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
};

// Export all controller functions
export default {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  addEmployee,
  removeEmployee
};