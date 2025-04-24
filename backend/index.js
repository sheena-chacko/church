const express = require('express');
const mongoose =require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const router = require('./routes');
dotenv.config();

connectDB();
const app = express();

// CORS Configuration
app.use(
    cors({
        origin: 'https://nexus-one-dun.vercel.app/',
        credentials: true,
        optionsSuccessStatus: 200
    })
);


app.use(express.json());

app.use('/api/v1', router)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));