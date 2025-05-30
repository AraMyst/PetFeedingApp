const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db');

const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/foods');
const petRoutes = require('./routes/pets');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

app.get('/', (req, res) => {
  res.send('Pet Feeding API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/pets', petRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
