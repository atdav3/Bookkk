const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        // Use a default MongoDB URI if environment variable is not set
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/library_management';
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
