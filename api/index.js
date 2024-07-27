const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const hotelsRouter = require('./routes/hotels');
const roomsRouter = require('./routes/rooms');
const cookieParser = require('cookie-parser');
const cors = require('cors')

dotenv.config();

const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected");
});

app.use(cookieParser());
app.use(cors())
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect();
    console.log('Server is running on port 8800');
});
