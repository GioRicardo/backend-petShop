
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

        const { id } = req.query
        const data = req.body

        const usuarioDB = await Usuario.findByIdAndUpdate(id, data, {new : true});

        if(!usuarioDB) return res.json({msg: 'No hay datos'})
        
        return res.json({usuarioDB})


    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Borrar por su ID
 */
const deleteUsuarioByID = async (req = request, res = response) => {
    try{
            const {id} = req.query

            const usuarioDB = await Usuario.findById(id)

            if(usuarioDB){
                const usuarioDBfound = await Usuario.findByIdAndDelete(id)
                return res.json({msg: 'El usuario fue eliminado con exito'})
            }
            if(!usuarioDB){
                return res.json({msg: 'No existe ese id'})
            } 
        
         }catch(e) {
            return res.status(500).json({msj: e})
        }
}


const login = async (req, res) => {
    const { email, contrasena } = req.body;
  
    try {
      const usuarioEmail = await Usuario.findOne({ email });
        
      console.log('recibiendo.... '+email+ ' Contraseña: '+contrasena)


      if (!usuarioEmail) {
        return res.status(404).send({
          msg: "Usuario - No existe",
          success: false
        });
      }
  
      if (usuarioEmail.contrasena === contrasena) {
        return res.status(200).send({
            data: usuarioEmail,
            success: true
        });
      }else{
        return res.status(404).send({
            msg: "Email o Contraseña incorrecta",
            success: false
          });
      }

    } catch (error) {
      console.log(error);
      return res.status(404).send({
        msg: "Error de servidor",
        success: false
      });
    }
  };
  


module.exports = { 
    createUsuario,
    getUsuarios,
    getUsuarioPorId,
    updateUsuarioPorId,
    deleteUsuarioByID,
    login
}