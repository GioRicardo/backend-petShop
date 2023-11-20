const { Router } = require('express')
const { createTipoUsuario, getTipoUsuarios, updateTipoUsuario, deleteTipoUsuario} = require('../controllers/tipoUsuario')


const router = Router()


// crear
router.post('/', createTipoUsuario)

// editar tipoUsuario
router.put('/', updateTipoUsuario)

// listar
router.get('/', getTipoUsuarios)

//Eliminar Tipoequipo

router.delete('/', deleteTipoUsuario)

module.exports = router
