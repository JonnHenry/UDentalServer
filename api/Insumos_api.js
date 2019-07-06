/*TODO: Pendiente como eliminar un insumo
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
        return conexion.query("SELECT id, nombre, descripcion, precio_unitario, fecha_creacion, categoria, fecha_actualizacion, fecha_caducidad FROM insumos JOIN productos ON productos.id = insumos.id_producto")
            .then(([results, metadata]) => {
                res.json({
                    "error": false,
                    "data": results
                }).status(200)
            })
            .catch(err => {

                res.json({
                    message: 'Error, vuelva a intentarlo.',
                    inserted: false
                }).status(200)
            })

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


    /*
        Formato del objeto JSON a enviar
        {
            "dataUpdate": {
                "nombre": "Instrumento de prueba 1", cualquier otro campo que tenga instrumentos
            }
        }
    */

    router.put('/update/:id', (req, res) => {
        try {
            return conexion.transaction(transaction => {
                    return Insumos.update(req.body.dataUpdate, {
                        where: {
                            id_producto: req.params.id
                        },
                        transaction: transaction,
                        limit: 1,
                        lock: true
                    }).then(() => {
                        return Productos.update(req.body.dataUpdate, {
                            where: {
                                id: req.params.id
                            },
                            transaction: transaction,
                            limit: 1,
                            lock: true
                        }).then(() => {
                            res.status(200);
                            return ({
                                'message': 'El Insumo fue actualizado, de manera correcta',
                                'updated': true
                            })
                        })
                    })
                })
                .then(result => {
                    res.json(result)
                })
        } catch (error) {
            res.json({
                'message': 'El Insumo no fue actualizado, vuelva a intentarlo',
                'updated': false
            })
        }
    });

    return router
}



function createQuery(parametros) {
    var query = 'SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = insumos.id_producto';
    var cont = 0;
    const cantArg = parametros.length;
    return new Promise((resolve, reject) => {
        if (cantArg != 0) {
            var enteros = ['stock', 'id', 'precio_unitario'];
            query = query + ' WHERE '
            parametros.forEach(element => {
                var parametros = element.split('=');
                if (cantArg - 1 > cont) {
                    var parametros = element.split('=');
                    if (!enteros.includes(parametros[0])) {
                        query = query + parametros[0] + "='" + parametros[1] + "' AND ";
                        cont++;
                    } else {
                        query = query + element + ' AND ';
                        cont++;
                    }
                } else {
                    var parametros = element.split('=');
                    if (!enteros.includes(parametros[0])) {
                        query = query + parametros[0] + "='" + parametros[1] + "'";
                    } else {
                        query = query + element + ' ';
                    }
                }
            });
        }
        resolve(query);
        reject(query)
    })
}


function createQuery(parametros) {
    var query = 'SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = instrumentos.id_producto';
    var cont = 0;
    const cantArg = parametros.length;
    return new Promise((resolve, reject) => {
        if (cantArg != 0) {
            var enteros = ['stock', 'id', 'precio_unitario'];
            query = query + ' WHERE '
            parametros.forEach(element => {
                var parametros = element.split('=');
                if (cantArg - 1 > cont) {
                    var parametros = element.split('=');
                    if (!enteros.includes(parametros[0])) {
                        query = query + parametros[0] + "='" + parametros[1] + "' AND ";
                        cont++;
                    } else {
                        query = query + element + ' AND ';
                        cont++;
                    }
                } else {
                    var parametros = element.split('=');
                    if (!enteros.includes(parametros[0])) {
                        query = query + parametros[0] + "='" + parametros[1] + "'";
                    } else {
                        query = query + element + ' ';
                    }
                }
            });
        }
        resolve(query);
        reject(query)
    })
}



module.exports.initInsumos = initInsumos;