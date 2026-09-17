require('node:dns').setServers(['1.1.1.1', '8.8.8.8']);
require('dotenv').config();

const express = require('express');
const app = express();

// Routers
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const vendorRouter = require('./routes/vendorRouter');

// Database Configuration
const dbConfig = require('./config/dbConfig');
const { vendorMiddleware, adminMiddleware, userMiddleware } = require('./middlewares/roleMiddlewares');

// Connect to Database
dbConfig();

// Middleware
app.use(express.json());

// Main Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user',userMiddleware, userRouter);
app.use('/api/v1/admin',adminMiddleware, adminRouter);
app.use('/api/v1/vendor',vendorMiddleware, vendorRouter);

// Server Listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});