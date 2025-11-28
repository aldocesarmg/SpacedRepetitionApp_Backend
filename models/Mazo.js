import mongoose from 'mongoose';

const mazoSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: false, unique: false},
    author: {type: String, required: true, unique: false},
    color: {type: String, required: true, unique: false},
    terms: {type: Number, required: true, unique: false},
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarjeta'}]
});

const Mazo = mongoose.model('Mazo', mazoSchema);
export default Mazo;