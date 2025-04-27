const mongoose = require('mongoose');
require('dotenv').config();

const connectionUrl = process.env.MONGO_CONNECTION_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(`${connectionUrl}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;