

var express = require('express');
var router = express.Router();

function initInventarios(instanciaBD) {
    var conexion = instanciaBD.conexionBD;

    /*
    Para el control de los inventarios(Invetario_Control)
        {
            nombre: 'nombre en String',
            descripcion: 'descripcion en String'
        }
    */
    router.post('/control/new', (req, res) => {
        try {
            return conexion.query("SELECT control_inventario('" + req.body.nombre + "','" + req.body.descripcion + "')")
                .then(([results, metadata]) => {
                    res.json({
                        'message': 'El inventario se ha creado con éxito.',
                        'createdInventory': true,
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        'message': 'El inventario no se ha creado con éxito.',
                        'createdInventory': false,
                    }).status(500);
                })
        } catch (error) {
            res.json({
                'message': 'El inventario no se ha creado con éxito.',
                'createdInventory': false,
            }).status(500);

        }
    })

    router.get('/control/all', (req, res) => {
        try {
            return conexion.query("SELECT id,nombre,descripcion,fecha_creacion,fecha_actualizacion,persona_realiza FROM inventarios JOIN inventario_controles ON inventarios.id = inventario_controles.id_inventario;")
                .then(([results, metadata]) => {
                    res.json({
                        error: false,
                        data: results
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        error: true,
                        data: []
                    }).status(500);
                })
        } catch (error) {
            res.json({
                error: true,
                data: []
            }).status(500);

        }

    })


    router.get('/control/productos/:id', (req, res) => {
        try {
            return conexion.query("SELECT prod.id,prod.nombre,prod.descripcion,prod.categoria,prod.precio_unitario,inv.cantidad FROM productos as prod JOIN inventario_productos as inv ON inv.id_producto = prod.id WHERE inv.id_inventario ="+req.params.id)
                .then(([results, metadata]) => {
                    res.json({
                        error: false,
                        data: results
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        error: true,
                        data: []
                    }).status(500);
                })
        } catch (error) {
            res.json({
                error: true,
                data: []
            }).status(500);

        }

    })

    return router;
}

module.exports.initInventarios = initInventarios;