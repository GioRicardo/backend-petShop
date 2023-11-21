const { Router } = require('express')
const { createAdmin, getAdmins, updateAdmin, deleteAdmin} = require('../controllers/admin')


const router = Router()


// crear
router.post('/', createAdmin)

// editar admin
router.put('/', updateAdmin)

// listar
router.get('/', getAdmins)

//Eliminar admin
router.delete('/', deleteAdmin)

module.exports = router
