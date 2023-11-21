const { Router } = require('express');

const  { 
    createUsuario,
    getUsuarios,
    getUsuarioPorId,
    updateUsuarioPorId,
    deleteUsuarioByID
} = require('../controllers/usuario');

const router = Router();

/**
 * Obtiene todos
 */
router.get('/', getUsuarios);

/**
 * Obtiene  por id
 */
 router.get('/:id', getUsuarioPorId);

/**
 * Crear 
 */
router.post('/', createUsuario);

/**
 * Actualiza por id
 */
router.put('/:id', updateUsuarioPorId);

router.delete('/:id', deleteUsuarioByID);

/**
 * Actualiza una parte del tipos de equipos
 */
/*router.patch('/:id', (req, res) => {
    res.json({});
});*/

/**
 * Borra un tipos de equipos por id
 */
 //router.delete('/:id', deleteTipoEquipoByID);

module.exports = router;