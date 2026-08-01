require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');

const corsOptions = {
    origin : process.env.CLIENT_URL || 'https://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/authors',authorRouter);
app.use('/api/books',bookRouter);
app.use((req, res) => {                        
  res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

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