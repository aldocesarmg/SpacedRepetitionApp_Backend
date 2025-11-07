import mongoose from 'mongoose';

const uspwdSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false}
});

const UsPwd = mongoose.model('UsPwd', uspwdSchema);

export default UsPwd;