import mongoose from "mongoose";
import express from "express";
import mazosRouter from './routes/mazosRoutes.js';
import sessionRouter from './routes/session.js';
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

app.use(session({
    secret: 'abcxyz',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        ttl: 1 * 24 * 60 * 60, // Session TTL in seconds (e.g., 1 day)
        autoRemove: 'native' // Uses MongoDB's TTL feature to remove expired sessions
    })
}));

app.use(express.json());
app.use('/mazos', mazosRouter);
app.use('/users/', sessionRouter);

await mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server listening...');
    });
}).catch(err => console.error('Error: ' + err));

// For shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await mongoose.disconnect();
    console.log('Mongoose connection closed');
    process.exit(0);
});