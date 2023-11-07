const { Schema, model } = require('mongoose')


const TipoUsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
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

module.exports = model('TipoUsuario', TipoUsuarioSchema)

