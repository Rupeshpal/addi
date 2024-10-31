const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/user');
const productRouter = require('./routes/products');
const dashuserRouter =require('./routes/dashuser');
const logReqRes = require('./middlewares');  // Import the middleware function
require('dotenv').config();
const path = require('path'); 

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware - plugin
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes('log.txt'));  // Use the logReqRes middleware with a log file



// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to serve home page
app.get('/', (req, res) => {
    res.render('home'); // This will render 'views/home.ejs'
});

// Routers
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/dashuser', dashuserRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
