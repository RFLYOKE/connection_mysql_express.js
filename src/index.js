require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
