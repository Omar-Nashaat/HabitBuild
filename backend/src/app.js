// src/app.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./interfaces/routes/authRoutes')
const habitRoutes = require('./interfaces/routes/habitRoutes')
const challengeRoutes = require('./interfaces/routes/challengeRoutes')
const userRoutes = require('./interfaces/routes/userRoutes')

const app = express()

// Middlewares

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // ← correct frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  })
)
app.use(express.json())

app.use(bodyParser.json()) // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })) // Parse URL-encoded bodies

//

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/habits', habitRoutes)
app.use('/api/challenges', challengeRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/', (req, res) => {
  res.send('Habit Builder Backend is running')
})

module.exports = app
