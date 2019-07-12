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
        return conexion.query("SELECT id, nombre, descripcion, precio_unitario, stock, fecha_creacion, fecha_actualizacion FROM insumos JOIN productos ON productos.id = insumos.id_producto WHERE productos.activo=true")
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
    router.post('/find', (req, res) => {
        createQuery(req.body.colAndValueSearch).then(query => {
            return conexion.transaction(t => {
                    return conexion.query(query)
                        .then(([results, metadata]) => {
                            res.status(200);
                            return ({
                                "error": false,
                                "message": "Se econtraron valores para los criterios de busqueda",
                                "data": results
                            });
                        })
                        .catch(err => {
                            res.status(500);
                            return ({
                                "message": 'Error, vuelva a intentarlo y revise los campos ingresados.',
                                "error": true,
                                "data": []
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
                "id": 3,
                "nombre": "Instrumento",
                "descripcion": "No existe descripción",
                "precio_unitario": 9999.99,
                "stock": 1,
	            "fecha_caducidad": "2019-05-22"
            }
        }
    */

    router.post('/update/:id', (req, res) => {
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
    var query = "SELECT id, nombre, descripcion, precio_unitario, stock, fecha_creacion, fecha_actualizacion FROM insumos JOIN productos ON productos.id = insumos.id_producto WHERE productos.activo=true";
    var cont = 0;
    const cantArg = parametros.length;
    return new Promise((resolve, reject) => {
        if (cantArg != 0) {
            var enteros = ['stock', 'id', 'precio_unitario'];
            parametros.forEach(element => {
                var parametros = element.split('=');
                if (!enteros.includes(parametros[0])) {
                    query = query +" AND " +parametros[0] + "='" + parametros[1] +"'";
                    cont++;
                } else {
                    query = query + ' AND '+element;
                    cont++;
                }
            });
        }
        resolve(query);
        reject(query)
    })
}



module.exports.initInsumos = initInsumos;