

var express = require('express');
var router = express.Router();
/*
    Entra un objeto JSON con productos e instrumentos
*/

//Ruta del enrutador actual /instrumentos
function initInstrumentos(instanciaBD) {
    var Productos = instanciaBD.Productos;
    var Instrumentos = instanciaBD.Instrumentos;
    var conexion = instanciaBD.conexionBD;

    //  Obtener todos los instrumentos

    router.get('/all', (req, res) => {
        return conexion.query("SELECT id, nombre, descripcion, precio_unitario, categoria,fecha_creacion, fecha_actualizacion, observacion, estado, stock  FROM instrumentos JOIN productos ON productos.id = instrumentos.id_producto WHERE productos.activo=true")
            .then(([results, metadata]) => {
                res.json({
                    "error": false,
                    "data": results
                }).status(200);
            })
            .catch(err => {
                res.status(500);
                return ({
                    message: 'Error, vuelva a intentarlo.',
                    inserted: false
                })
            })

    });

    /*
        El objeto a enviar debe de ser de esta manera
        {
            colAndValueSearch: ['col=value'],---> tipo string
        }
    */

    //Obtener los instrumentos con varios parametros
    router.get('/find', (req, res) => {
        createQuery(req.body).then(query => {
            return conexion.transaction(t => {
                    return conexion.query(query)
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
                })
                .catch(result => {
                    res.json(result)
                })
        })
    });

    /*
        Formato del objeto JSON a enviar
        {
            "dataUpdate": {
                "nombre": "Equipo de prueba 1", cualquier otro campo que tenga instrumentos
            }
        }
    */

    router.post('/update/:id', (req, res) => {
        try {
            return conexion.transaction(transaction => {
                    return Instrumentos.update(req.body.dataUpdate, {
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
                                'message': 'El Instrumento fue actualizado, de manera correcta',
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
                'message': 'El Instrumento no fue actualizado, vuelva a intentarlo',
                'updated': false
            })
        }
    });
    return router
}


function createQuery(parametros) {
    var query = 'SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = instrumentos.id_producto WHERE productos.activo=true ';
    var cont = 0;
    const cantArg = parametros.length;
    return new Promise((resolve, reject) => {
        if (cantArg != 0) {
            var enteros = ['stock', 'id', 'precio_unitario'];
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

module.exports.initInstrumentos = initInstrumentos;