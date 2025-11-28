import express from "express";
import Tarjeta from "../models/Tarjeta.js";

const router = express.Router();

// get all tarjetas --- /tarjetas
router.get('/', async (req, res) => {
    try {
        let retrievedTarjetas = null;

        if (req.query.isRandomUnique == 'y') { // to get one random element from tarjetas
            retrievedTarjetas = await Tarjeta.aggregate([{ $sample: { size: 1 } }]); 
            res.json(retrievedTarjetas);
            return;
        } else {
            console.log('i did not entered in random');
            retrievedTarjetas = await Tarjeta.find();
        }
        res.json(retrievedTarjetas);
    } catch (anyException) {
        res.status(400).json({
            responseCode: 'SP_001',
            responseText: 'Error when trying to add new tarjeta: ' + anyException
        });
    }
});

// create tarjeta --- /tarjetas
router.post('/', async (req, res) => {
    try {
        await Tarjeta.create({
            question: req.body.question,
            options: req.body.options
        });

        res.status(201).json({
            responseCode: 'SP_000',
            responseText: 'Successfully added new tarjeta'
        });
    } catch (error) {
        res.status(400).json({
            responseCode: 'SP_001',
            responseText: 'Error when trying to add new tarjeta: ' + error
        });
    }
});

export default router;