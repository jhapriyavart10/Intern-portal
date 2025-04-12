const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const { connectDB } = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin : 'http://localhost:3000',
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    }
));
// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/applications', applicationRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});