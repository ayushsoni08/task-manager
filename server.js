import express from 'express';

const app = express();

// for testing
app.get('/', (req, res) => {
    res.send('task manager server');
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})