// backend/index.js

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDatabase = require('./config/db')

const authRoutes = require('./routes/auth')
const foodRoutes = require('./routes/foods')
const petRoutes = require('./routes/pets')

const app = express()

// Only allow requests from your Vercel front-end
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://pet-feeding-app.vercel.app'

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json())

// Connect to the database
connectDatabase()

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Pet Feeding API is running')
})

// Mount authentication routes under "/auth"
app.use('/auth', authRoutes)

// Mount other resource routes under "/api"
app.use('/api/foods', foodRoutes)
app.use('/api/pets', petRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
