import mongoose from "mongoose";
import express from "express";
import "dotenv/config";

const app = express();

await mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server listening...');
    });
}).catch(err => console.error('Error: ' + err));

process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await mongoose.disconnect();
    console.log('Mongoose connection closed');
    process.exit(0);
});