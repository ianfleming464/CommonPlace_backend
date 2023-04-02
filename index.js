const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectDB();

// Define API routes
app.use('/notes', noteRoutes);
app.use('/users', userRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
