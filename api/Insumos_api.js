/*TODO: Todo lo referente a insumos
-Ingresar los insumos
-Extraer los insumos
-Obtener los insumos por nombre y por fecha de creación
*/

var express = require('express');
var router = express.Router();
/*
    Entra un objeto JSON con productos y insumo
*/

//Ruta del enrutador actual /insumos
function initInsumos(instanciaBD) {
    var Productos = instanciaBD.Productos;
    var Insumos = instanciaBD.Insumos;
    var conexion = instanciaBD.conexionBD;

    //  Obtener todos los insumos

    router.get('/all', (req, res) => {
        return conexion.transaction(t => {
                return conexion.query("SELECT id, nombre, descripcion, precio_unitario, fecha_creacion, fecha_actualizacion, fecha_caducidad FROM insumos JOIN productos ON productos.id = insumos.id_producto;", {
                        transaction: t,
                        limit: 1,
                        lock: true,
                        raw: true
                    })
                    .then(([results, metadata]) => {
                        res.status(200);
                        return ({
                            "error": false,
                            "data": results
                        });
                    })
                    .catch(err => {
                        res.status(500);
                        return ({
                            message: 'Error, vuelva a intentarlo.',
                            inserted: false
                        })
                    })
            })
            .then(result => {
                res.json(result)
            });
    });

    /*
        El objeto a enviar debe de ser de esta manera
        {
            colAndValueSearch: ['col=value'],---> tipo string
        }
    */

    //Obtener los insumos con varios parametros
    router.get('/find', (req, res) => {
        createQuery(req.body).then(query => {
            return conexion.transaction(t => {
                    return conexion.query(query, {
                            transaction: t,
                            limit: 1,
                            lock: true,
                            raw: true
                        })
                        .then(([results, metadata]) => {
                            res.status(200);
                            return ({
                                "error": false,
                                "data": results
                            });
                        })
                        .catch(err => {
                            res.status(500);
                            return ({
                                message: 'Error, vuelva a intentarlo.',
                                inserted: false
                            })
                        })
                })
                .then(result => {
                    res.json(result)
                });
        })
    });


    //Crear un nuevo Insumo
    router.post('/new', (req, res) => {
        var parametros = req.body;
        return conexion.transaction(t => {
                return Productos.findOrCreate({
                    where: {
                        id: parametros.id
                    },
                    defaults: {
                        fecha_caducidad: parametros.fecha_caducidad
                    }
                }, {
                    transaction: t,
                    limit: 1,
                    lock: true
                }).then(([result, created]) => {
                    if (created) {
                        insertInsumos(parametros, Insumos).then(result => {
                            if (result) {
                                res.status(200);
                                return ({
                                    'message': 'El Insumo fue ingresado, de manera correcta',
                                    'inserted': true
                                })
                            } else {
                                res.status(200);
                                res.json({
                                    'message': 'El Insumo no fue ingresado',
                                    'inserted': false
                                })

                            }
                        })
                    } else {
                        res.status(200);
                        return ({
                            'message': 'El Insumo no fue ingresado, ya se encuentra registrado',
                            'inserted': false
                        })
                    }
                })
            })
            .then(result => {
                res.json(result);
            });
    });


    /*
        Actualizar un Insumo solo un valor
        Para modificar un valor se debe de enviar de la siguiente manera
        {
            colUpdate: 'nameCol', // El valor de la columna a actualizar
            dataUpdate: {
                colUpdate: 'valueUpdate'
            }
        } 
    */
    router.put('/update/:id', (req, res) => {
        var insumos = ['fecha_caducidad'];
        return conexion.transaction(t => {
                if (req.body.colUpdate in insumos) {
                    return Insumos.update(req.body.dataUpdate, {
                            where: {
                                id_producto: req.params.id
                            },
                            transaction: t,
                            limit: 1,
                            lock: true
                        }).then(() => {
                            res.status(200);
                            return ({
                                'message': 'El Insumo fue actualizado, de manera correcta',
                                'updated': true
                            })
                        })
                        .catch(() => {
                            res.status(500);
                            return ({
                                'message': 'El Insumo no fue actualizado, vuelva a intentarlo',
                                'updated': false
                            })
                        });
                } else {
                    return Productos.update(req.body.dataUpdate, {
                            where: {
                                id: req.params.id
                            },
                            transaction: t,
                            limit: 1,
                            lock: true
                        }).then(() => {
                            res.status(200);
                            return ({
                                'message': 'El Insumo fue actualizado, de manera correcta',
                                'updated': true
                            })
                        })
                        .catch(() => {
                            res.status(500);
                            return ({
                                'message': 'El Insumo no fue actualizado, vuelva a intentarlo',
                                'updated': false
                            })
                        });
                }
            })
            .then(result => {
                res.json(result)
            });
    });

    //Actualiza todos los datos de un insumo
    router.put('/update/all/:id', (req, res) => {
        return conexion.transaction(t => {
            return Insumos.update({
                fecha_caducidad: fecha_caducidad
                }, {
                    where: {
                        id_producto: req.params.id
                    },
                    transaction: t,
                    limit: 1,
                    lock: true
                }).then(() => {
                    return Productos.update({
                            nombre: req.body.nombre,
                            descripcion: req.body.descripcion,
                            precio_unitario: req.body.precio_unitario
                        }, {
                            where: {
                                id: req.params.id
                            },
                            transaction: t,
                            limit: 1,
                            lock: true
                        }).then(() => {
                            res.status(200);
                            return ({
                                'message': 'El Insumo fue actualizado, de manera correcta',
                                'updated': true
                            })
                        })
                        .catch(() => {
                            res.status(500);
                            return ({
                                'message': 'El Insumo no fue actualizado, vuelva a intentarlo',
                                'updated': false
                            })
                        });
                })
                .catch(() => {
                    res.status(500);
                    return ({
                        'message': 'El Insumo no fue actualizado, vuelva a intentarlo',
                        'updated': false
                    })
                });

        }).then(result => {
            res.json(result)
        });
    })

    return router
}

function insertInsumos(parametros, Insumos) {
    return new Promise((resolve, reject) => {
        Insumos.create({
            id_producto: parametros.id,
            fecha_caducidad: parametros.fecha_caducidad
        }).then(
            resolve(true)
        ).catch((error) => {
            reject(false);
        })
    });
}

function createQuery(parametros) {
    return new Promise((resolve, reject) => {
        if (parametros.length != 0) {
            query = 'SELECT id, nombre, descripcion, precio_unitario, fecha_creacion, fecha_actualizacion, fecha_caducidad FROM insumos JOIN productos ON productos.id = insumos.id_producto WHERE '
            parametros.forEach(element => {
                query = query + element + ' AND '
            });
            console.log(query);
        }
        resolve(query);
        reject('SELECT id, nombre, descripcion, precio_unitario, fecha_creacion, fecha_actualizacion, fecha_caducidad FROM insumos JOIN productos ON productos.id = insumos.id_producto');
    })
}


module.exports.initInsumos = initInsumos;