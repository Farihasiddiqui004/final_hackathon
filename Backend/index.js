const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Always load .env at the top

// Connect to MongoDB
const connectDB = require('./connectDb');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Import task routes

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests


// API routes for task management (protected by JWT authentication)
app.use('/api', taskRoutes); 

// Authentication routes for user management
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    console.log('✅ Received request at main route');
    res.send('MongoDB connected with Express.js');
});

// 404 Error handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
