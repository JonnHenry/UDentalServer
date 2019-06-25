/*TODO: Todo lo referente a equipos
-Ingresar los productos
-Extraer los productos
-Obtener los productos por nombre y por fecha de creación
*/
//ruta del enrutador para la api productos
var express = require('express');
var router = express.Router();

/*
    Entra un objeto JSON con productos y equipos
*/

//Ruta del enrutador /equipo
function initEquipos(instanciaBD) {
    var Productos = instanciaBD.Productos;
    var Equipos = instanciaBD.Equipos;
    var conexion = instanciaBD.conexionBD;

    //  Obtener todos los equipos
    router.get('/all', (req, res) => {
        try {
            conexion.query("SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = equipos.id_producto;", {
                raw: true
            }).spread(function (results, metadata) {
                res.json({
                    "error": false,
                    "data": results
                });
            })
        } catch (error) {
            res.json({
                "error": true,
                "data": []
            });
        }
    });

    //Crear un nuevo equipo
    router.post('/new', (req, res) => {
        var parametros = req.body;
        try {
            Productos.findOrCreate({
                where: {
                    id: parametros.id
                },
                defaults: {
                    nombre: req.body.marca,
                    descripcion: req.body.observacion,
                    precio_unitario: req.body.estado
                }
            }).spread((result, created) => {
                if (created) {
                    insertEquipos(parametros, Equipos).then(result => {
                        if (result) {
                            res.status(200);
                            res.json({
                                'message': 'El Equipo fue ingresado, de manera correcta',
                                'inserted': true
                            })
                        } else {
                            res.status(500);
                            res.json({
                                'message': 'El equipo no fue ingresado',
                                'inserted': false
                            })

                        }
                    })
                } else {
                    res.status(200);
                    res.json({
                        'message': 'El Equipo no fue ingresado, ya se encuentra registrado',
                        'inserted': false
                    })
                }
            })
        } catch (error) {
            res.status(500);
            res.json({
                'message': 'El Equipo no fue ingresado, ya se encuentra registrado',
                'inserted': false
            })
        }
    });


    /*
        Actualizar un equipo solo un valor
        Para modificar un valor se debe de enviar de la siguiente manera
        {
            colUpdate: 'nameCol', // El valor de la columna a actualizar
            dataUpdate: {
                colUpdate: 'valueUpdate'
            }
        } 
    */
    router.put('/update/:id', (req, res) => {
        var equipos = ['marca', 'observacion', 'estado', 'stock'];
        if (req.body.colUpdate in equipos) {
            Equipos.update(req.body.dataUpdate, {
                    where: {
                        id_producto: req.params.id
                    }
                }).then(() => {
                    res.status(200);
                    res.json({
                        'message': 'El Equipo fue actualizado, de manera correcta',
                        'updated': true
                    })
                })
                .catch(() => {
                    res.status(500);
                    res.json({
                        'message': 'El Equipo no fue actualizado, vuelva a intentarlo',
                        'updated': false
                    })
                });
        } else {
            Productos.update(req.body.dataUpdate, {
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    res.status(200);
                    res.json({
                        'message': 'El Equipo fue actualizado, de manera correcta',
                        'updated': true
                    })
                })
                .catch(() => {
                    res.status(500);
                    res.json({
                        'message': 'El Equipo no fue actualizado, vuelva a intentarlo',
                        'updated': false
                    })
                });
        }
    });

    router.put('/update/all/:id', (req, res) => {

        Equipos.update({
                marca: req.body.marca,
                observacion: req.body.observacion,
                estado: req.body.estado,
                stock: req.body.stock
            }, {
                where: {
                    id_producto: req.params.id
                }
            }).then(() => {
                Productos.update({
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        precio_unitario: req.body.precio_unitario
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(() => {
                        res.status(200);
                        res.json({
                            'message': 'El Equipo fue actualizado, de manera correcta',
                            'updated': true
                        })
                    })
                    .catch(()=> {
                        res.status(500);
                        res.json({
                            'message': 'El Equipo no fue actualizado, vuelva a intentarlo',
                            'updated': false
                        })
                    });
            })
            .catch(() => {
                res.status(500);
                res.json({
                    'message': 'El Equipo no fue actualizado, vuelva a intentarlo',
                    'updated': false
                })
            });
    });
    return router
}

function insertEquipos(parametros, Equipo) {
    return new Promise((resolve, reject) => {
        Equipo.create({
            id_producto: parametros.id,
            marca: parametros.marca,
            observacion: parametros.observacion,
            estado: parametros.estado,
            stock: parametros.stock
        }).then(
            resolve(true)
        ).catch((error) => {
            reject(false);
        })
    });
}