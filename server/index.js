const express = require('express');
const cors = require('cors');
const foodsRouter = require('./foods');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/foods', foodsRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Fooddy Express Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});