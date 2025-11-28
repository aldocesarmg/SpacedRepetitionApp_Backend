import express from "express";
import Mazo from "../models/Mazo.js";

const router = express.Router();

// get all mazos --- /mazos
router.get('/', async (req, res) => {
    try {
        let retrievedMazos = null;

        if (req.query.limit) {
            retrievedMazos = await Mazo.find().limit(req.query.limit);
        } else {
            retrievedMazos = await Mazo.find();
        }

        res.json(retrievedMazos);
    } catch (anyException) {
        res.status(400).json({
            responseCode: 'SP_001',
            responseText: 'Error when trying to add new tarjeta: ' + anyException
        });
    }
});


router.get('/:mazo', async (req, res) => {
    try {
        let retrievedMazo = await Mazo.findById(req.params.mazo).select('title cards').populate('cards', 'question options.description').exec();
        res.json(retrievedMazo);
    } catch(anyException) {
        res.status(400).json({
            responseCode: 'SP_001',
            responseText: 'Error when trying to add new tarjeta: ' + anyException
        });
    }
});

// create mazo --- /mazos
router.post('/', async (req, res) => {
    try {
        await Mazo.create({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            color: req.body.color,
            terms: req.body.terms,
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