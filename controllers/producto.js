
const { request, response } = require('express');
const Usuario = require('../models/usuario');
const Producto = require("../models/producto");
/**
 * crear
 */
const createProducto = async (req = request, res = response) => {
    try {
        const { vendedor, nombre, descripcion, precio, stock, img } = req.body;

        const vendedorBD = await Usuario.findOne({
            _id: vendedor
        })
        if(!vendedorBD){
            return res.status(400).json({
                msj: 'No existe el vendedor'
            })
        }
        const datos = {
            vendedor,
            nombre,
            descripcion,
            precio,
            stock,
            img
        }

        const producto = new Producto(datos); 

        await producto.save();

        

        return res.status(201).json(producto);
    }catch(e) {
        return res.status(500).json({msj: e})
    }

 }
/**
 * Consultar todos 
 */
const getProductos = async (req, res = response) => {
    try {
        const productoDB = await Producto.find().populate({
            path: 'vendedor'
        });
        return res.json(productoDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Consultar por Id
 */
const getProductoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const query = {_id: id}
        const productoDB = await Producto.findOne(query).populate({
            path: 'vendedor'
        });
        return res.json(productoDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Actualiza por su ID
 */
const updateProductoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { vendedor, nombre, descripcion, precio, stock, img } = req.body
        const data = {
            vendedor,
            nombre,
            descripcion,
            precio,
            stock,
            img
        }
        const vendedorBD = await Usuario.findOne({
            _id: vendedor
        })
        if(!vendedorBD){
            return res.status(400).json({
                msj: 'No existe el vendedor'
            })
        }
        const producto = 
            await Producto.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(producto)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Borrar por su ID
 */
const deleteProductoByID = async (req = request, res = response) => {
    try{
        const id = req.params.id;
        const producto = await Producto.findByIdAndDelete(id);
        res.status(204).json(producto);
         }catch(e) {
            return res.status(500).json({msj: e})
        }
}


module.exports = { 
    createProducto,
    getProductos,
    getProductoPorId,
    updateProductoPorId,
    deleteProductoByID
}