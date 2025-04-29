const express = require('express')
const router = express.Router()
const Job = require('../models/Job')
const Application = require('../models/Application')

router.post('/', async (req, res) => {
  const job = new Job(req.body)
  await job.save()
  res.status(201).json(job)
})

router.get('/', async (req, res) => {
  const jobs = await Job.find()
  res.json(jobs)
})

router.post('/:jobId/apply', async (req, res) => {
  const { candidate, resumeLink } = req.body
  const application = new Application({
    job: req.params.jobId,
    candidate,
    resumeLink
  })
  await application.save()
  res.status(201).json(application)
})

module.exports = router
