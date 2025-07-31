const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');
const cors = require('cors');


const PORT = process.env.PORT || 4000;

const connection = require('./config/database');
connection();

const authRoute = require('./routes/authRoute');
const complaintRoute = require('./routes/complaintRoute');
const userRoute = require('./routes/userRoute');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');


app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoute);
app.use('/api/complaints', complaintRoute);
app.use('/api/users', userRoute);
app.get("/", (req, res) => {
  console.log("running backend");
  res.send("backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

app.use(notFound);
app.use(errorHandler);
