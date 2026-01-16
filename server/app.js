const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const globalErrorHandler = require('./controllers/errorController');
const ApiError = require('./utlis/ApiError');
const taskRouter = require('./routes/taskRouter');


const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// General rate limiter for API routes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again in 15 minutes!",
});

app.use('/api/', limiter);

// Routes
app.use('/api/v1/tasks', taskRouter);

// Unhandled Routes
app.use((req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl} on this server!.`, 404));
});

app.use(globalErrorHandler);
module.exports = app;