const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

process.on("uncaughtException", (err) => {
    console.log(err);
    console.log("Uncaught Exceptions!");
    process.exit(1);
});



const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(err);
    console.log("Unhandled Rejections!");
    process.exit(1);
});