const TipoUsuario = require('../models/tipoUsuario')
const {request, response} = require('express')


//Creación

const createTipoUsuario = async (req = request,
    res = response) => {
    try{

        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const tipoUsuarioBD = await TipoUsuario.findOne({nombre})
        if(tipoUsuarioBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const tipoUsuario = new TipoUsuario(data)
        //console.log(tipoUsuario)
        await tipoUsuario.save()
        return res.status(201).json(tipoUsuario)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de tipo de usuario

const updateTipoUsuario = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        data.fechaActualizacion = new Date()

        const tipoUsuariosDB = await TipoUsuario.findByIdAndUpdate(id,data, {new: true})

        if(!tipoUsuariosDB) return res.json({msg: 'No hay datos'})
        
        return res.json({tipoUsuariosDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getTipoUsuarios = async (req = request,
    res = response,next) => {
    try{
        if(req.query.estado) return next();

        const tipoUsuariosDB = await TipoUsuario.find({})
        if(tipoUsuariosDB.length == 0 )
        return res.json({msg: 'No hay datos'})
        //select * from tipoequipo where estado = ?;
        return res.json({tipoUsuariosDB})
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


const deleteTipoUsuario = async ( req = request, res = response) => {
    try{
        const { id } = req.query

        const tipoUsuariosDB = await TipoUsuario.findById(id)

        if(tipoUsuariosDB){
            const tipoUsuariosDBfound = await TipoUsuario.findByIdAndDelete(id)
            return res.json({msg: 'El tipo de equipo fue eliminado con exito'})
        }
        if(!tipoUsuariosDB){
            return res.json({msg: 'No existe ese id'})
        } 
        

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

module.exports = {createTipoUsuario, getTipoUsuarios, updateTipoUsuario, deleteTipoUsuario}