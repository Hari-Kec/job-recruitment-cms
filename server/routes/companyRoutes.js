import express from 'express';

import {getCompanies, getCompany, createCompany, updateCompany, addEmployee, removeEmployee} from '../controllers/companyController.js';


import {protect,authorize} from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCompanies)
  .post(protect, authorize('admin', 'recruiter'), createCompany);

router.route('/:id')
  .get(getCompany)
  .put(protect, updateCompany);

router.route('/:id/employees')
  .post(protect, addEmployee);

router.route('/:id/employees/:employeeId')
  .delete(protect, removeEmployee);
export default router;