const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Import models
const Task = require('../models/Task');

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Read JSON file
const tasks = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'tasks.json'), 'utf-8')
);

// Import data into DB
const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Task.deleteMany({});
        console.log('🗑️  Cleared existing tasks');

        // Insert new data
        const result = await Task.create(tasks);
        console.log(`✅ Imported ${result.length} tasks successfully`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error importing data:', error);
        process.exit(1);
    }
};

// Delete data from DB
const deleteData = async () => {
    try {
        await connectDB();
        await Task.deleteMany({});
        console.log('🗑️  Deleted all tasks successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error deleting data:', error);
        process.exit(1);
    }
};

// Run based on command line argument
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    console.log('Usage: node import-dev-data.js [--import|--delete]');
    process.exit(1);
}
