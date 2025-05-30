// backend/index.js

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDatabase = require('./config/db')

const authRoutes = require('./routes/auth')
const foodRoutes = require('./routes/foods')
const petRoutes = require('./routes/pets')

dotenv.config()

const app = express()

// Configure CORS so your Vercel-hosted frontend can talk to this API
const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  'https://pet-feeding-app.vercel.app' // adjust if your actual Vercel domain is different

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. mobile apps, curl)
    if (!origin || origin === FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

// Apply CORS middleware
app.use(cors(corsOptions))
// Explicitly enable pre-flight for all routes
app.options('*', cors(corsOptions))

// Parse JSON bodies
app.use(express.json())

// Connect to your database
connectDatabase()

// Health check
app.get('/', (req, res) => {
  res.send('Pet Feeding API is running')
})

// Route registration
app.use('/api/auth', authRoutes)
app.use('/api/foods', foodRoutes)
app.use('/api/pets', petRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
