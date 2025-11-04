import mongoose from 'mongoose';

const mazoSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: false, unique: false},
    author: {type: String, required: true, unique: false}
});

const Mazo = mongoose.model('Mazo', mazoSchema);
export default Mazo;