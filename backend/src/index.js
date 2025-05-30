// backend/index.js

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDatabase = require('./config/db')

const authRoutes = require('./routes/auth')
const foodRoutes = require('./routes/foods')
const petRoutes = require('./routes/pets')

const app = express()

// Allow only your Vercel front-end origin to access this API
const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  'https://pet-feeding-app.vercel.app'

// Enable CORS before any routes are defined
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Parse JSON bodies
app.use(express.json())

// Connect to Mongo (or your database)
connectDatabase()

// Health check
app.get('/', (req, res) => {
  res.send('Pet Feeding API is running')
})

// Mount your routers
app.use('/auth', authRoutes)
app.use('/api/foods', foodRoutes)
app.use('/api/pets', petRoutes)

// Start the server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
