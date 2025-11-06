import express from "express";
import Mazo from "../models/Mazo.js";

const router = express.Router();

// get all mazos
router.get('/', async (req, res) => {
    const mySearch = await Mazo.find({  });
    res.json(mySearch);
});

router.post('/', async (req, res) => {
    try {
        await Mazo.create({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author
        });

        res.status(201).json({
            responseCode: 'SP_000',
            responseText: 'Successfully added new mazo'
        });
    } catch (error) {
        res.status(400).json({
            responseCode: 'SP_001',
            responseText: 'Error when trying to add new mazo: ' + error
        });
    }
});

export default router;