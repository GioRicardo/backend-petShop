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
    precioTotal:{
        type: Number,
        required: [true, 'Precio total requerido'],
    },
    
}, { timestamps: true })

module.exports = model('venta', VentaSchema)

