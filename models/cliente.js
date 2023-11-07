const { Schema, model } = require('mongoose')

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        validate: {
            validator: function(v) {
              return v.length >= 6;},message: 'El nombre debe tener al menos 6 caracteres.'}
    },
    email: {
        type: String,
        required: [true, 'Email requerido'],
        unique: [true, 'ingresa un Email diferente']
    },
    contrasena: {
        type: String,
        default: true,
        validate: {
            validator: function(v) {
              return /[a-zA-Z]/.test(v) && /[0-9]/.test(v);},message: 'La contraseña debe contener al menos una letra y un número.'}  
    },
    direccion: {
        type: String,
        required: [true, 'Dirección requerida'],
        validate: {
            validator: function(v) {
              return v.length >= 6;},message: 'La dirección debe tener al menos 6 caracteres.'}
    },
    tipoUsuario:{
        type: Schema.Types.ObjectId,
        ref: 'TipoUsuario',
        required: true
    },
    fechaCreacion:{
        type: Date,
        default: new Date()
    },
    fechaActualizacion:{
        type: Date,
        default: new Date()
    },
})
module.exports = model('Cliente', ClienteSchema)
