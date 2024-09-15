const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('./Db'); // Ensure the connection is properly set up
const signupUserRoute = require('./Routes/Signupuser');
const loginUserRoute = require('./Routes/Loginuser');
const foodDataRoute = require('./Routes/FoodData');
const ordersRoute = require('./Routes/Orders');
const searchRoute = require('./Routes/Search');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'https://shopme-front.vercel.app', // Make sure this origin matches your frontend deployment
  credentials: true,
}));

app.use(bodyParser.json());

app.use(session({
  secret: 'MynameisEndtoEndYoutubeChannel$#',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure this is 'true' in production
  },
}));

connection(); // Ensure your DB connection is correctly set up

// User routes
app.use('/api', signupUserRoute);
app.use('/api', loginUserRoute);

// Additional routes
app.use('/api', foodDataRoute);
app.use('/api', ordersRoute);
app.use('/api', searchRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
