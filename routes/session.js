import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import UsPwd from "../models/UsPwd.js";

const router = express.Router();
const saltRounds = 10;

router.post('/login', async (req, res) => {
    try {
        const userAndPassword = await UsPwd.find({ username: req.body.username });

        if (userAndPassword.length == 0) {
            res.json({
                responseCode: 'SP_001',
                responseText: `User does not exist`
            });
            return;
        }

        bcrypt.compare(req.body.password, userAndPassword[0].password, (errorWhenComparing, result) => {
        if (errorWhenComparing) {
            res.json({
                responseCode: 'SP_001',
                responseText: `There was an error when comparing password: ${errorWhenComparing}`
            });
            return;
        }

        if (result === true) {
            req.session.user = { id: userAndPassword[0].id, username: userAndPassword[0].username };
            res.json({
                responseCode: 'SP_000',
                responseText: `Logged in successfully`
            });
        } else {
            res.json({
                responseCode: 'SP_001',
                responseText: `Incorrect password`
            });
        }
    });
    } catch (generalError) {
        res.json({
            responseCode: 'SP_001',
            responseText: `There was an error: ${generalError}`
        });
    }
});

router.get('/profile', (req, res) => {
     if (req.session.user) {
        res.send(`Welcome ${req.session.user.username}!`);
     } else {
        res.send(`Please log in`);
     }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.send('Logged out');
    });
});

router.post('/signup', async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async (errorWhenHashing, hash) => {
        if (errorWhenHashing) {
            res.json({
                responseCode: 'SP_001',
                responseText: `There was an error when hashing: ${errorWhenHashing}`
            });
            return;
        }

        try {
            await UsPwd.create({
                username: req.body.username,
                password: hash
            });

            res.json({
                responseCode: 'SP_000',
                responseText: `Successfully created user`
            });
        } catch (errorWhenCreating) {
            res.json({
                responseCode: 'SP_001',
                responseText: `There was an error: ${errorWhenCreating}`
            });
        }
    });
});

export default router;