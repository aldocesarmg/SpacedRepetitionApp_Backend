import express from "express";
import session from "express-session";

const router = express.Router();

router.get('/login', (req, res) => {
    req.session.user = { id: 'abc', username: 'aldocesarmg' };
    res.send('Logged in successfully')
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

export default router;