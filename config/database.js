const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("\x1b[32m%s\x1b[0m", "-------- Successfully connected to MongoDB Atlas --------"); // Green
        require('../utils/initAdmin')();
    } catch (err) {
        console.log("\x1b[31m%s\x1b[0m", "-------- Issue in connecting to MongoDB --------"); // Red
        console.error("\x1b[33m%s\x1b[0m", err.message); // Yellow
        process.exit(1);
    }
};

module.exports = connectDB;
