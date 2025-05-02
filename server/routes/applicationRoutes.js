
import express from 'express';

import {getApplications,getApplication, createApplication, updateApplicationStatus, addApplicationNote} from '../controllers/applicationController.js';
import {protect,authorize} from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getApplications)
  .post(protect, authorize('candidate'), createApplication);

router.route('/:id')
  .get(protect, getApplication);

router.route('/:id/status')
  .put(protect, authorize('recruiter', 'admin'), updateApplicationStatus);

router.route('/:id/notes')
  .post(protect, authorize('recruiter', 'admin'), addApplicationNote);

export default router;