const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body
  const hash = await bcrypt.hash(password, 10)
  const user = new User({ name, email, password: hash, role })
  await user.save()
  res.status(201).send('Registered')
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(400).send('User not found')
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).send('Invalid password')
  res.json({ userId: user._id, role: user.role })
})

module.exports = router
