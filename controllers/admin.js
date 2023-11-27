const Admin = require('../models/admin')
const {request, response} = require('express')


//Creación

const createAdmin = async (req = request,
    res = response) => {
    try{

        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const adminBD = await Admin.findOne({nombre})
        if(adminBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const contrasena = req.body.contrasena
        ? req.body.contrasena.toUpperCase()
        : ''
        const data = {
            nombre,
            contrasena
        }
        const admin = new Admin(data)
        //console.log(admin)
        await admin.save()
        return res.status(201).json(admin)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de tipo de usuario

const updateAdmin = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body

        const adminsDB = await Admin.findByIdAndUpdate(id,data, {new: true})

        if(!adminsDB) return res.json({msg: 'No hay datos'})
        
        return res.json({adminsDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getAdmins = async (req = request,
    res = response,next) => {
    try{
        //if(req.query.estado) return next();

        const adminsDB = await Admin.find({})
        if(adminsDB.length == 0 )
        return res.json({msg: 'No hay datos'})
        return res.json({adminsDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}

// Eliminar usuario administrador
const deleteAdmin = async ( req = request, res = response) => {
    try{
        const { id } = req.query

        const adminsDB = await Admin.findById(id)

        if(adminsDB){
            const adminsDBfound = await Admin.findByIdAndDelete(id)
            return res.json({msg: 'El admin fue eliminado con exito'})
        }
        if(!adminsDB){
            return res.json({msg: 'No existe ese id'})
        } 
        

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

module.exports = {createAdmin, getAdmins, updateAdmin, deleteAdmin}