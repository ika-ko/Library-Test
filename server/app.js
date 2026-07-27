const express = require('express');
const app = express();
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');

app.use(express.json());
app.use('/api/authors',authorRouter);
app.use('/api/books',bookRouter);
app.use((req, res) => {                        
  res.status(404).json({ error: 'Route not found' });
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
});


app.listen(3000,()=>{
    console.log('app is listening on port 3000');
})