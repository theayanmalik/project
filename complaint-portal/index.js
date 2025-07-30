const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 4000;

const connection = require('./config/database');
const authRoute = require('./routes/authRoute');
const complaintRoute = require('./routes/complaintRoute');
const userRoute = require('./routes/userRoute');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

connection();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/complaints', complaintRoute);
app.use('/api/users', userRoute);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
