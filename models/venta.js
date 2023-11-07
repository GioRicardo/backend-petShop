const { Schema, model } = require('mongoose')

const VentaSchema = Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    producto:{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad:{
        type: Number,
        required: [true, 'Cantidad requerida'],
    },
    fecha:{
        type: Date,
        default: new Date()
    },
    precioTotal:{
        type: Number,
        required: [true, 'Precio total requerido'],
    },
    
})

module.exports = model('venta', VentaSchema)

