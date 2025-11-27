import express from "express";
import Mazo from "../models/Mazo.js";
import mongoose from "mongoose";

const router = express.Router();

// get all mazos --- /mazos
router.get('/', async (req, res) => {
    let mySearch = await Mazo.findOne({ author:'kailapimentel'}).populate('cards').exec();
    res.json(mySearch);
});

// create mazo --- /mazos
router.post('/', async (req, res) => {
    try {
        await Mazo.create({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
            cards: req.body.cards
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