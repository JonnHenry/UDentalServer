/*
    TODO: -Eliminar un producto ver como hacer si con el campo o agregar otro
*/

var express = require('express');
var router = express.Router();
/*
    Entra un objeto JSON con productos y equipos
*/

//Ruta del enrutador actual /equipo
function initEquipos(instanciaBD) {
    var Productos = instanciaBD.Productos;
    var Equipos = instanciaBD.Equipos;
    var conexion = instanciaBD.conexionBD;

    //  Obtener todos los equipos

    router.get('/all', (req, res) => {
        return conexion.transaction(t => {
                return conexion.query("SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = equipos.id_producto;", {
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

    //Obtener los equipos con 
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


    //Crear un nuevo equipo
    

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
    

    router.put('/update/all/:id', (req, res) => {
        return conexion.transaction(t => {
            return Equipos.update({
                    marca: req.body.marca,
                    observacion: req.body.observacion,
                    estado: req.body.estado,
                    stock: req.body.stock
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
                                'message': 'El Equipo fue actualizado, de manera correcta',
                                'updated': true
                            })
                        })
                        .catch(() => {
                            res.status(500);
                            return ({
                                'message': 'El Equipo no fue actualizado, vuelva a intentarlo',
                                'updated': false
                            })
                        });
                })
                .catch(() => {
                    res.status(500);
                    return ({
                        'message': 'El Equipo no fue actualizado, vuelva a intentarlo',
                        'updated': false
                    })
                });

        }).then(result => {
            res.json(result)
        });
    })

    return router
}



function createQuery(parametros) {
    return new Promise((resolve, reject) => {
        if (parametros.length != 0) {
            query = 'SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = equipos.id_producto WHERE '
            parametros.forEach(element => {
                query = query + element + ' AND '
            });
            console.log(query);
        }
        resolve(query);
        reject(query);
    })
}


module.exports.initEquipos = initEquipos;