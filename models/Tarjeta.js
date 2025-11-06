import mongoose from 'mongoose';

const opcionesSchema = new mongoose.Schema({
    descripcion: {type: String, required: true, unique: false},
    esRespuestaCorrecta: {type: Boolean, required: true, unique: false}
});

const tarjetaSchema = new mongoose.Schema({
    pregunta: {type: String, required: true, unique: false},
    opciones: [opcionesSchema]
});

const Tarjeta = mongoose.model('Tarjeta', tarjetaSchema);
export default Tarjeta;