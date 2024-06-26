import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import taskRoutes from './taskController.js';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => console.log('db connected'))
    .catch(err => console.log(err));

const __dirname = path.resolve();
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// routes
app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(3000, () => {
    console.log('server is running on port 3000');
})