const { Schema, model } = require('mongoose')

const AdminSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        validate: {
            validator: function(v) {
              return v.length >= 6;},message: 'El nombre debe tener al menos 6 caracteres.'}
    },
    contrasena: {
        type: String,
        required: [true, 'contraseña requerida'],
        validate: {
            validator: function(v) {
              return /[a-zA-Z]/.test(v) && /[0-9]/.test(v);},message: 'La contraseña debe contener al menos una letra y un número.'}  
    }
}, { timestamps: true} )

module.exports = model('Admin', AdminSchema)

