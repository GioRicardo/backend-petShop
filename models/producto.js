const { Schema, model } = require('mongoose')


const ProductoSchema = Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        validate: {
            validator: function(v) {
              return v.length >= 6;},message: 'El nombre debe tener al menos 6 caracteres.'}
    },
    descripcion:{
        type: String,
        required: [true, 'Descripción requerida'],
        validate: {
            validator: function(v) {
              return v.length >= 6;},message: 'La dirección debe tener al menos 6 caracteres.'}
    },
    precio:{
        type: Number,
        required: [true, 'Precio requerido'],
    },
    stock:{
        type: Number,
        required: [true, 'Stock requerido'],
    },
    img: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3342/3342177.png"
    }

})

module.exports = model('Producto', ProductoSchema)

