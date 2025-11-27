import mongoose from 'mongoose';

const optionsSchema = new mongoose.Schema({
    description: {type: String, required: true, unique: false},
    isCorrectAnwser: {type: Boolean, required: true, unique: false}
});

const tarjetaSchema = new mongoose.Schema({
    question: {type: String, required: true, unique: false},
    options: [optionsSchema],
    mazo: { type: mongoose.Schema.Types.ObjectId, ref: 'Mazo'}
});

const Tarjeta = mongoose.model('Tarjeta', tarjetaSchema);
export default Tarjeta;