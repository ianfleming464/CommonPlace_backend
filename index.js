const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB database
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define API routes
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
