const { Router } = require('express')
const { createCategoria, getCategorias, updateCategoria, deleteCategoria} = require('../controllers/categoria')


const router = Router()


// crear
router.post('/', createCategoria)

// editar categoria
router.put('/', updateCategoria)

// listar
router.get('/', getCategorias)

//Eliminar categoria

router.delete('/', deleteCategoria)

module.exports = router
