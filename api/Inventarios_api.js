var express = require('express');
var router = express.Router();

function initInventarios(instanciaBD) {
    var conexion = instanciaBD.conexionBD;


    router.post('/control/new', (req, res) => {
    /*
        Para el control de los inventarios(Invetario_Control)
        {
            nombre: 'nombre en String',
            descripcion: 'descripcion en String'
            observacion: "Observacion de prueba"
        }
    */
        try {
            return conexion.query("SELECT control_inventario('" + req.body.nombre + "','" + req.body.descripcion + "','"+req.body.observacion+"')")
                .then(([results, metadata]) => {
                    if (results[0].control_inventario){
                        res.json({
                            'message': 'El inventario se ha creado con éxito.',
                            'error': false
                        }).status(200);
                    } else {
                        res.json({
                            'message': 'El inventario se ha creado con éxito.',
                            'error': true
                        }).status(200);
                    }
                })
                .catch(err => {
                    res.json({
                        'message': 'El inventario no se ha creado con éxito.',
                        'error': true
                    }).status(500);
                })
        } catch (error) {
            res.json({
                'message': 'El inventario no se ha creado con éxito.',
                'error': true
            }).status(500);

        }
    })

    router.get('/control/all', (req, res) => {
        try {
            return conexion.query("SELECT id,nombre,descripcion,observacion,fecha_creacion,persona_realiza FROM inventarios JOIN inventario_controles ON inventarios.id = inventario_controles.id_inventario;")
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
            return conexion.query("SELECT prod.id,prod.nombre,prod.descripcion,prod.categoria,prod.precio_unitario,inv.cantidad FROM productos as prod JOIN inventario_productos as inv ON inv.id_producto = prod.id WHERE inv.id_inventario =" + req.params.id)
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
                    }).status(200);
                })
        } catch (error) {
            res.json({
                error: true,
                data: []
            }).status(500);

        }

    });

    router.post('/entrega/new', (req, res) => {
        /* Como se debe de enviar el JSON con la información cuando se entregen
            {
                "nombre": "Nombre del inventario",
                "observacion": "Observacion del inventario",
                "descripcion": "Descripcion del inventario",
                "persona_entrega": "Cedula de la persona que entrega",
                "productos": [{
                        "cantidad": 14,
                        "id_producto": 15
                    },
                    {
                        "cantidad": 14,
                        "id_producto": 15
                    }
                ]
            }
        */
        try {
            return conexion.query("SELECT entrega_inventario('" + req.body.nombre + "','" + req.body.descripcion + "','" + req.body.observacion + "','" + JSON.stringify(req.body.productos) + "','" + req.body.persona_entrega + "')")
                .then(([results, metadata]) => {
                    if (results[0].entrega_inventario){
                        res.json({
                            'message': 'El inventario de entrega se ha creado con éxito con todos los productos ingresados.',
                            'error': false
                        }).status(200);
                    }else {
                        res.json({
                            'message': 'El inventario de entrega se ha creado con éxito con todos los productos ingresados.',
                            'error': true
                        }).status(200);
                    }
                })
                .catch(err => {
                    res.json({
                        'message': 'El inventario de entrega no se ha creado con éxito con todos los productos ingresados.',
                        'error': true
                    }).status(200);
                })
        } catch (error) {
            res.json({
                'message': 'El inventario de entrega no se ha creado con éxito con todos los productos ingresados.',
                'error': true
            }).status(500);

        }
    });
    //SELECT DISTINCT id_inventario,nombre,descripcion,observacion from inventario_entregas JOIN inventarios ON inventarios.id = inventario_entregas.id_inventario; 
    router.get('/entrega/all', (req, res) => {
        try {
            return conexion.query("SELECT DISTINCT id_inventario,nombre,descripcion,observacion from inventario_entregas JOIN inventarios ON inventarios.id = inventario_entregas.id_inventario;")
                .then(([results, metadata]) => {
                    res.json({
                        error: false,
                        data: results
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        error: false,
                        data: []
                    }).status(200);
                })
        } catch (error) {
            res.json({
                error: false,
                data: []
            }).status(500);
        }
    });

    router.get('/entrega/productos/all', (req, res) => {
        try {
            return conexion.query("select id_inventario,id_producto,inventarios.nombre as nombre_inventario,prod.nombre as nombre_producto,prod.descripcion as descripcion_producto,precio_unitario,fecha, persona_entrega, persona_recibe,cantidad as cantidad_producto from inventario_entregas as inv JOIN productos as prod ON prod.id=inv.id_producto JOIN inventarios ON inventarios.id = inv.id_inventario ORDER BY id_inventario;")
                .then(([results, metadata]) => {
                    res.json({
                        error: false,
                        data: results
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        error: false,
                        data: []
                    }).status(200);
                })
        } catch (error) {
            res.json({
                error: false,
                data: []
            }).status(500);
        }
    });


    router.get('/entrega/produtos/nombre/:nombre', (req, res) => {
        try {
            return conexion.query("select id_inventario,id_producto,prod.nombre as nombre_producto,prod.descripcion as descripcion_producto,precio_unitario,fecha, persona_entrega, persona_recibe,cantidad as cantidad_producto from inventario_entregas as inv JOIN productos as prod ON prod.id=inv.id_producto JOIN inventarios ON inventarios.id = inv.id_inventario WHERE inventarios.nombre='" + req.params.nombre + "' ORDER BY id_inventario;")
                .then(([results, metadata]) => {
                    res.json({
                        error: false,
                        data: results
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        error: false,
                        data: []
                    }).status(200);
                })
        } catch (error) {
            res.json({
                error: false,
                data: []
            }).status(500);
        }
    });

    router.get('/entrega/produtos/id/:id', (req, res) => {
        try {
            return conexion.query("select inventarios.nombre as nombre_inventario,id_producto,prod.nombre as nombre_producto,prod.descripcion as descripcion_producto,precio_unitario,fecha, persona_entrega, persona_recibe,cantidad as cantidad_producto from inventario_entregas as inv JOIN productos as prod ON prod.id=inv.id_producto JOIN inventarios ON inventarios.id = inv.id_inventario WHERE inventarios.id=" + req.params.id + " ORDER BY id_inventario ;")
                .then(([results, metadata]) => {
                    res.json({
                        error: false,
                        data: results
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        error: false,
                        data: []
                    }).status(200);
                })
        } catch (error) {
            res.json({
                error: false,
                data: []
            }).status(500);
        }
    });


    return router;
}

module.exports.initInventarios = initInventarios;