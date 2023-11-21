const { Schema, model } = require('mongoose')


const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
    },
}, { timestamps: true})

module.exports = model('Categoria', CategoriaSchema)

