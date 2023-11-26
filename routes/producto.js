const { Router } = require('express');

const  { 
    createProducto,
    getProductos,
    getProductoPorId,
    updateProductoPorId,
    deleteProductoByID
} = require('../controllers/producto');

const router = Router();

/**
 * Obtiene todos
 */
router.get('/', getProductos);

/**
 * Obtiene  por id
 */
 router.get('/:id', getProductoPorId);

/**
 * Crear 
 */
router.post('/', createProducto);

/**
 * Actualiza por id
 */
router.put('/', updateProductoPorId);

router.delete('/', deleteProductoByID);

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