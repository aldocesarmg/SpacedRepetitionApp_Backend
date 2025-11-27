import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

import mazosRouter from './routes/mazosRoutes.js';
import tarjetasRouter from './routes/tarjetasRoutes.js';
import sessionRouter from './routes/session.js';

import "dotenv/config";

const app = express();

app.use(session({
    secret: process.env.SECRET, // this must be a 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        ttl: 1 * 24 * 60 * 60, // Session TTL in seconds (e.g., 1 day)
        autoRemove: 'native' // Uses MongoDB's TTL feature to remove expired sessions
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Cookie expiration time (1 day),
        httpOnly: true, // prevents client-side javascript from reading the cookie
        secure: false // use true for production environments (for secure cookies)
    }
}));

app.use(cors({
    origin: 'http://localhost:3001', // react frontend app's url
    credentials: true // crucial for sending/receiving cookies
}));

app.use(express.json());
app.use('/mazos/', mazosRouter);
app.use('/tarjetas/', tarjetasRouter);
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