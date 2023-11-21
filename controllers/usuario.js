
const { request, response } = require('express');
const Usuario = require('../models/usuario');
/**
 * crear
 */
const createUsuario = async (req = request, res = response) => {
    try {
        const { nombre, email, contrasena, direccion, esVendedor } = req.body;

        const usuarioDB = await Usuario.findOne({ email });

        if(usuarioDB){// ya existe
            return res.status(400).json({msg: 'Ya existe el email'});
        }
        const datos = {
            nombre,
            email,
            contrasena,
            direccion,
            esVendedor
        }

        const usuario = new Usuario(datos); 

        await usuario.save();

        

        return res.status(201).json(usuario);
    }catch(e) {
        return res.status(500).json({msj: e})
    }

 }
/**
 * Consultar todos 
 */
const getUsuarios = async (req, res = response) => {
    try {
        const usuarioDB = await Usuario.find();
        return res.json(usuarioDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Consultar por Id
 */
const getUsuarioPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const query = {_id: id}
        const usuarioDB = await Usuario.findOne(query)
        return res.json(usuarioDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Actualiza por su ID
 */
const updateUsuarioPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { nombre, email, contrasena, direccion, esVendedor } = req.body
        const data = {
            nombre,
            email,
            contrasena,
            direccion,
            esVendedor
        }
        const usuario = 
            await Usuario.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(usuario)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Borrar por su ID
 */
const deleteUsuarioByID = async (req = request, res = response) => {
    try{
        const id = req.params.id;
        const usuario = await Usuario.findByIdAndDelete(id);
        res.status(204).json(usuario);
         }catch(e) {
            return res.status(500).json({msj: e})
        }
}


module.exports = { 
    createUsuario,
    getUsuarios,
    getUsuarioPorId,
    updateUsuarioPorId,
    deleteUsuarioByID
}