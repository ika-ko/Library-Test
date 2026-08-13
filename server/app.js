require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const authRouter = require('./routes/authRouter')
const passport = require("passport");
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { NotFoundError } = require('./errors/NotFoundError');

const corsOptions = {
    origin : process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
    store : new pgSession({conString : process.env.DATABASE_URL}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, // Blocks client JS from accessing cookie (XSS protection)
        sameSite: 'lax', // Controls cross-site cookie behavior (CSRF protection)
        secure: process.env.NODE_ENV === 'production', // Forces HTTPS in production
        maxAge: 1000 * 60 * 60 * 24 * 7 // Cookie duration in ms (e.g., 7 days)
    }
}));
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth',authRouter);
app.use('/api/authors',authorRouter);
app.use('/api/books',bookRouter);
app.use((req, res, next) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
});
// eslint-disable-next-line no-unused-vars -- Express only treats a 4-arg function as an error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // A 4xx is an expected outcome, not an incident. Only 5xx is worth a stack trace.
    if (statusCode >= 500) {
        console.error(err);
    }

    // err.message on a 5xx is whatever Postgres or Node produced. That is internal
    // detail, and shipping it to the browser is an information leak.
    const message = statusCode >= 500 ? 'Internal Server Error' : err.message;

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})