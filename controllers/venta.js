
const { request, response } = require('express');
const Usuario = require('../models/usuario');
const Venta = require("../models/venta");
const Producto = require("../models/producto");

/**
 * crear
 */
const createVenta = async (req = request, res = response) => {
    try {
        const { usuario, producto, cantidad, precioTotal } = req.body;


        const usuarioBD = await Usuario.findOne({
            _id: usuario
        })
        if(!usuarioBD){
            return res.status(400).json({
                msj: 'No existe el usuario'
            })
        }
        const productoBD = await Producto.findOne({
            _id: producto
        })
        if(!productoBD){
            return res.status(400).json({
                msj: 'No existe el producto'
            })
        }
        const datos = {
            usuario,
            producto,
            cantidad,
            precioTotal
        }

        const venta = new Venta(datos); 

        await venta.save();

        

        return res.status(201).json(venta);
    }catch(e) {
        return res.status(500).json({msj: e})
    }

 }
/**
 * Consultar todos 
 */
const getVentas = async (req, res = response) => {
    try {
        const ventaDB = await Venta.find().populate({
            path: 'usuario'
        }).populate({
            path: 'producto'
        });
        return res.json(ventaDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Consultar por Id
 */
const getVentaPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const query = {_id: id}
        const ventaDB = await Venta.findOne(query).populate({
            path: 'usuario'
        }).populate({
            path: 'producto'
        });
        return res.json(ventaDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Actualiza por su ID
 */
const updateVentaPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { usuario, producto, cantidad, precioTotal } = req.body
        const data = {
            usuario,
            producto,
            cantidad,
            precioTotal
        }
        const venta = 
            await Venta.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(venta)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Borrar por su ID
 */
const deleteVentaByID = async (req = request, res = response) => {
    try{
        const id = req.params.id;
        const venta = await Venta.findByIdAndDelete(id);
        res.status(204).json(venta);
         }catch(e) {
            return res.status(500).json({msj: e})
        }
}


module.exports = { 
    createVenta,
    getVentas,
    getVentaPorId,
    updateVentaPorId,
    deleteVentaByID
}