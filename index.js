const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const { v4: uuidv4 } = require('uuid');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Generate a UUIDv4 and use it as the session secret
const SESSION_SECRET = uuidv4();
process.env.SESSION_SECRET = SESSION_SECRET;

// Set up session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to database
connectDB();

// Configure Passport local strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }),
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Define API routes
app.use('/notes', noteRoutes);
app.use('/users', userRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
