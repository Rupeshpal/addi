const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routes/user');
const productRouter = require('./routes/products');
const dashuserRouter = require('./routes/dashuser');
const logReqRes = require('./middlewares');  // Import the middleware function

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;

// Initialize Express app
const app = express();

// Database Connection
(async function initializeDB() {
  try {
    await connectDB();
    console.log('Database connected successfully.');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);  // Exit process with failure
  }
})();

// Middleware
app.use(express.json());  // Use JSON parser for API requests
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes('log.txt'));  // Custom logging middleware

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Basic home route
app.get('/', (req, res) => {
  res.render('home');
});

// Routes
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/dashuser', dashuserRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at ${BASE_URL}:${PORT}`);
});
