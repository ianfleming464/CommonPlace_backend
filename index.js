// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');
const authRoutes = require('./auth');
const jwt = require('jsonwebtoken');

const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Set up JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

// Connect to database
connectDB();

// Define API routes
app.use('/notes', noteRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
