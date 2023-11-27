const Categoria = require('../models/categoria')
const {request, response} = require('express')


//Creación

const createCategoria = async (req = request,
    res = response) => {
    try{

        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const categoriaBD = await Categoria.findOne({nombre})
        if(categoriaBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const categoria = new Categoria(data)
        await categoria.save()
        return res.status(201).json(categoria)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de categoria

const updateCategoria = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body

        const categoriasDB = await Categoria.findByIdAndUpdate(id,data, {new: true})

        if(!categoriasDB) return res.json({msg: 'No hay datos'})
        
        return res.json({categoriasDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getCategorias = async (req = request,
    res = response,next) => {
    try{
        if(req.query.estado) return next();

        const categoriasDB = await Categoria.find({})
        if(categoriasDB.length == 0 )
        return res.json({msg: 'No hay datos'})
        return res.json(categoriasDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


const deleteCategoria = async ( req = request, res = response) => {
    try{
        const { id } = req.query

        const categoriasDB = await Categoria.findById(id)

        if(categoriasDB){
            const categoriasDBfound = await Categoria.findByIdAndDelete(id)
            return res.json({msg: 'La categoria fue eliminada con exito'})
        }
        if(!categoriasDB){
            return res.json({msg: 'No existe ese id'})
        } 
        

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

module.exports = {createCategoria, getCategorias, updateCategoria, deleteCategoria}