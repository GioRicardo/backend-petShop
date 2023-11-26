
const { request, response } = require('express');
const Usuario = require('../models/usuario');
const Producto = require("../models/producto");
/**
 * crear
 */
const createProducto = async (req = request, res = response) => {
    try {
        const { usuario, categoria, nombre, descripcion, precio, stock, img } = req.body;

        const usuarioBD = await Usuario.findOne({
            _id: usuario
        })
        if(!usuarioBD){
            return res.status(400).json({
                msj: 'No existe el usuario'
            })
        }
        const datos = {
            usuario,
            categoria,
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
            path: 'usuario'
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
            path: 'usuario'
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
        const { id } = req.query
        const data = req.body

        const productoDB = await Producto.findByIdAndUpdate(id,data, {new: true})

        if(!productoDB) return res.json({msg: 'No hay datos'})
        
        return res.json({productoDB})

    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Borrar por su ID
 */
const deleteProductoByID = async (req = request, res = response) => {
    try{
        const { id } = req.query

        const productoDB = await Producto.findById(id)

        if(productoDB){
            const productoDBfound = await Producto.findByIdAndDelete(id)
            return res.json({msg: 'El producto fue eliminado con exito'})
        }
        if(!productoDB){
            return res.json({msg: 'No existe ese id'})
        } 
    
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