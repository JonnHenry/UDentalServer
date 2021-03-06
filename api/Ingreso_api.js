var express = require('express');
var router = express.Router();

function initIngreso(instanciaBD) {
    var Productos = instanciaBD.Productos;
    var Insumos = instanciaBD.Insumos;
    var Equipos = instanciaBD.Equipos;
    var Instrumentos = instanciaBD.Instrumentos;
    var conexion = instanciaBD.conexionBD;
    /*
        Como llegan el body con req.body
        {
            Para cada categoria debe ser asi:
                1=Equipo,
                2=Insumo,
                3=Instrumento
            data: [
                {
                    categoria: 1,
                    id: id(Int),
                    nombre: 'Cadena',
                    descripcion: 'Descripcion',
                    precio_unitario: 25.56895,
                    marca: 'Marca',
                    observacion: 'Observacion XD',
                    estado: 'Dañado'||'Buen Estado'||'Reparación' ,
                    stock: Entero
                },
                { //Para Insumos
                    categoria: 2
                    id: id(Int),
                    nombre: 'cadena(String)',
                    descripcion: 'Descripción XD',
                    precio_unitario: 15.36,
                    stock: Entero
                    fecha_caducidad: "17-02-2020"
                },
                {
                    categoria: 3,
                    id: id(Integer),
                    nombre: "Nombre",
                    descripcion: "",
                    precio_unitario: 85.69,
                    observacion: "Observacion XD",
                    estado: 'Dañado'||'Buen Estado'||'Reparación',
                    stock: Entero
                }
            
        }
    */

    router.post('/new', (req, res) => {
        var arrayError = [];
        var arrayMessage = [];
        var promises = [];
        req.body.data.forEach(parametros => {
            if (parametros.categoria == 1) {
                var promiseEquipo = conexion.query("SELECT create_or_update_equipo(" + parametros.id + ",'" + parametros.nombre + "','" + parametros.descripcion + "'," + parametros.precio_unitario + ", '" + parametros.marca + "','" + parametros.observacion + "','" + parametros.estado + "'," + parametros.stock + ");");
                promiseEquipo.then(([results, metadata]) => {
                        if (!results[0].create_or_update_equipo) {
                            arrayError.push(parametros.id)
                            arrayMessage.push('Equipo ' + parametros.id + ' ya ingresado.')
                        }
                    })
                    .catch(() => {
                        arrayError.push(parametros.id)
                        arrayMessage.push('Equipo ' + parametros.id + ' no ingresado.')
                    })
                promises.push(promiseEquipo);
            } else if (parametros.categoria == 2) {
                var promiseInsumo = conexion.query("SELECT create_or_update_insumo(" + parametros.id + ",'" + parametros.nombre + "','" + parametros.descripcion + "'," + parametros.precio_unitario + ",'" + parametros.fecha_caducidad + "'," + parametros.stock + ");")
                promiseInsumo.then(([results, metadata]) => {
                        if (!results[0].create_or_update_insumo) {
                            arrayError.push(parametros.id)
                            arrayMessage.push('Insumo ' + parametros.id + ' ya ingresado.')
                        }
                    })
                    .catch(() => {
                        arrayError.push(parametros.id)
                        arrayMessage.push('Insumo ' + parametros.id + ' no ingresado.')
                    })
                promises.push(promiseInsumo)
            } else if (parametros.categoria == 3) {
                var promiseInstrumento = conexion.query("SELECT create_or_update_instrumento(" + parametros.id + ",'" + parametros.nombre + "','" + parametros.descripcion + "'," + parametros.precio_unitario + ",'" + parametros.observacion + "','" + parametros.estado + "'," + parametros.stock + ");")
                promiseInstrumento.then(([results, metadata]) => {
                        if (!results[0].create_or_update_instrumento) {
                            arrayError.push(parametros.id)
                            arrayMessage.push('Instrumento ' + parametros.id + ' ya ingresado.')
                        }
                    })
                    .catch(() => {
                        arrayError.push(parametros.id)
                        arrayMessage.push('Instrumento ' + parametros.id + ' no ingresado.')
                    })
            }
            promises.push(promiseInstrumento)
        })

        Promise.all(promises).then(() => {
                if (arrayError.length == 0) {
                    res.json({
                        'message': 'Todos los productos se han ingresado o se han actualizado con exito',
                        'insertedAll': true,
                        'idFails': arrayError
                    }).status(200);
                } else {
                    res.json({
                        'message': arrayMessage,
                        'insertedAll': false,
                        'idFails': arrayError
                    }).status(200)
                }
            })
            .catch((error) => {
                setTimeout(() => {
                    res.json({
                        'message': "Error al enviar la cantidad de datos",
                        'insertedAll': false,
                        'idFails': arrayError
                    }).status(200)
                }, 100)
            })
    });





    /*
        JSON a enviar 
        {
            data: [
                { //Equipos
                    categoria: 1,
                    id: id,
                    nombre: req.body.marca,
                    descripcion: req.body.observacion,
                    precio_unitario: req.body.estado,
                    marca: parametros.marca,
                    observacion: parametros.observacion,
                    estado: parametros.estado,
                    stock: parametros.stock
                },
                { //Para Insumos
                    categoria: 2
                    id: id,
                    nombre: req.body.marca,
                    descripcion: req.body.observacion,
                    precio_unitario: req.body.estado,
                    fecha_caducidad: fecha_caducidad
                },
                { //Instrumentos
                    categoria: 3,
                    id: id,
                    nombre: req.body.marca,
                    descripcion: req.body.observacion,
                    precio_unitario: req.body.estado,
                    observacion: parametros.observacion,
                    estado: parametros.estado,
                    stock: parametros.stock
                }
            ]
        }
    */

    /*
        Ejemplo de como enviar los datos
        {
        "data": [{
                "categoria": 1,
                "id": 1,
                "nombre": "Equipo de prueba",
                "descripcion": "No existe descripción",
                "precio_unitario": 9.99,
                "marca": "Honda",
                "observacion": "No existe observación",
                "estado": "Buen estado",
                "stock": 10
            },
            {
                "categoria": 1,
                "id": 2,
                "nombre": "Equipo de prueba",
                "descripcion": "No existe descripción",
                "precio_unitario": 99.99,
                "observacion": "No existe observación",
                "estado": "Buen estado",
                "stock": 10
            },
            {
                "categoria": 2,
                "id": 3,
                "nombre": "Instrumento",
                "descripcion": "No existe descripción",
                "precio_unitario": 99.99,
                "stock": 10,
                "fecha_caducidad": "2019-05-22"
            },
            {
                "categoria": 2,
                "id": 4,
                "nombre": "Instrumento",
                "descripcion": "No existe descripción",
                "precio_unitario": 99.99,
                "stock": 10,
                "fecha_caducidad": "2019-05-22"
            },
            {
                "categoria": 3,
                "id": 5,
                "nombre": "Insumo de prueba",
                "descripcion": "No existe descripción",
                "precio_unitario": 85.69,
                "observacion": "No existe observación",
                "estado": "Buen estado",
                "stock": 10
            },
            {
                "categoria": 3,
                "id": 6,
                "nombre": "Insumo de prueba",
                "descripcion": "No existe descripción",
                "precio_unitario": 85.69,
                "observacion": "No existe observación",
                "estado": "Buen estado",
                "stock": 10
            }
        ]
    }
    */

    router.post('/update', (req, res) => {
        var errorArray = [];
        var idFails = [];
        var promises = [];
        var updateAll = true;
        var promiseProducto = null;
        var promiseEquipo = null;
        var promiseInsumo = null;

        req.body.data.forEach(element => {
            try {
                return conexion.transaction(t => {
                    promiseProducto = updateProducto(element, Productos, t)
                    promiseProducto.then(result => {
                            if (result) {
                                if (element.categoria = 1) {
                                    var id = element.id;
                                    delete element.id
                                    promiseEquipo = Equipos.update(element, {
                                        where: {
                                            id_producto: id
                                        },
                                        transaction: t,
                                        limit: 1,
                                        lock: true
                                    });

                                    promiseEquipo.catch(() => {
                                        res.status(200);
                                        errorArray.push('El Equipo con el código ' + id + ' no fue actualizado, revise si la información ingresada es correcta')
                                        idFails.push(id);
                                        updateAll = false;
                                    });
                                    promises.push(promiseEquipo);
                                    return promiseEquipo;
                                } else if (element.categoria = 2) {
                                    var id = element.id;
                                    delete element.id
                                    promiseInsumo = Insumos.update(element, {
                                        where: {
                                            id_producto: id
                                        },
                                        transaction: t,
                                        limit: 1,
                                        lock: true
                                    })

                                    promiseInsumo.catch(() => {
                                        res.status(500);
                                        errorArray.push('El Insumo con el código ' + id + ' no fue actualizado, revise si la información ingresada es correcta')
                                        idFails.push(id);
                                        updateAll = false;
                                    });
                                    promises.push(promiseInsumo);
                                    return promiseInsumo;
                                } else if (element.categoria = 3) {
                                    var id = element.id;
                                    delete element.id
                                    promiseInstrumento = Instrumentos.update(element, {
                                        where: {
                                            id_producto: id
                                        },
                                        transaction: t,
                                        limit: 1,
                                        lock: true
                                    })
                                    promiseInstrumento
                                        .catch(() => {
                                            res.status(200);
                                            errorArray.push('El Instrumento con el código ' + id + ' no fue actualizado, revise si la información ingresada es correcta')
                                            idFails.push(id);
                                            updateAll = false;
                                        });
                                    promises.push(promiseInstrumento)
                                    return promiseInstrumento
                                }
                            } else {
                                errorArray.push('El producto con el código ' + element.id + ' no fue actualizado, revise si la información ingresada es correcta');
                                idFails.push(element.id)
                                updateAll = false;
                            }
                        })
                        .catch(() => {
                            errorArray.push(
                                'El producto con el código ' + element.id + ' no fue actualizado, revise si la información ingresada es correcta'
                            );
                            updateAll = false;
                        })
                    promises.push(promiseProducto);
                    return promiseProducto
                })
            } catch (error) {
                errorArray.push(
                    'El producto con el código ' + element.id + ' no fue actualizado, revise si la información ingresada es correcta'
                );
                idFails.push(element.id);
            }
        });


        Promise.all(promises).then(() => {
                if (updateAll) {
                    res.json({
                        'message': 'Todos los productos se han ingresado o se han actualizado con exito',
                        'updateAll': true,
                        'idFails': idFails
                    }).status(200);
                } else {
                    res.json({
                        'message': arrayMessage,
                        'updateAll': false,
                        'idFails': idFails
                    }).status(200)
                }
            })
            .catch(() => {
                setTimeout(() => {
                    res.json({
                        'message': "Error al enviar la cantidad de datos",
                        'updateAll': false,
                        'idFails': arrayError
                    }).status(200)
                }, 10)
            })
    });

    router.delete('/producto/delete/:idproducto', (req, res) => {
        try {
            return conexion.transaction(t => {
                    return Productos.update({
                        activo: false
                    }, {
                        where: {
                            id: req.params.idproducto
                        },
                        transaction: t,
                        limit: 1,
                        lock: true
                    }).then(() => {
                        return ({
                            'message': 'El producto fue borrado de manera correcta',
                            'deleted': true
                        })
                    })
                })
                .then(valor => {
                    res.json(valor)
                });
        } catch (error) {
            res.json({
                'message': 'El producto no fue borrado, vuelva a intentarlo y revise los datos enviados',
                'deleted': false
            })
        }
    })


    router.delete('/producto/restore/:idproducto', (req, res) => {
        try {
            return conexion.transaction(t => {
                    return Productos.update({
                        activo: true
                    }, {
                        where: {
                            id: req.params.idproducto
                        },
                        transaction: t,
                        limit: 1,
                        lock: true
                    }).then(() => {
                        return ({
                            'message': 'El producto fue borrado de manera correcta',
                            'restored': true
                        })
                    })
                })
                .then(valor => {
                    res.json(valor)
                });
        } catch (error) {
            res.json({
                'message': 'El producto no fue borrado, vuelva a intentarlo y revise los datos enviados',
                'restored': false
            })
        }
    })
    return router;
}

module.exports.initIngreso = initIngreso


function updateProducto(updateData, Productos, transaction) {
    try {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                var categorias = ['Equipo', 'Insumo', 'Instrumento'];
                updateData.categoria = categorias[updateData.categoria - 1];
                Productos.update(updateData, {
                    where: {
                        id: updateData.id
                    },
                    transaction: transaction,
                    limit: 1,
                    lock: true
                }).then(() => {
                    resolve(true);
                })
            }, 80);
        })
    } catch (error) {
        reject(false);
    }
}