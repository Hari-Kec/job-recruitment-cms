const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const jobRoutes = require('./routes/jobRoutes')
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/recruitment')

app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)

app.listen(5000)
