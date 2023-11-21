const { Router } = require('express');

const  { 
    createVenta,
    getVentas,
    getVentaPorId,
    updateVentaPorId,
    deleteVentaByID
} = require('../controllers/venta');

const router = Router();

/**
 * Obtiene todos
 */
router.get('/', getVentas);

/**
 * Obtiene  por id
 */
 router.get('/:id', getVentaPorId);

/**
 * Crear 
 */
router.post('/', createVenta);

/**
 * Actualiza por id
 */
router.put('/:id', updateVentaPorId);

router.delete('/:id', deleteVentaByID);

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