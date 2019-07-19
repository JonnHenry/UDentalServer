var express = require('express');
var router = express.Router();

function initProductos(instanciaBD) {
    var conexion = instanciaBD.conexionBD;
    var productos = instanciaBD.Productos;

    router.get('/all', (req, res) => {
        try {
            productos.findAll({ 
                where: { activo: true },
                attributes: ['id', 'nombre',"descripcion", "precio_unitario", "categoria", "stock"] 
            }
            ).then(projects => {
                res.json({
                    data: projects,
                    error: false
                })
            })

        } catch (error) {
            res.json({
                data: [],
                error: true
            })
        }

    })

    return router;
}

module.exports.initProductos = initProductos;