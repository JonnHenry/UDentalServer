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
            ]
        }
    */

    router.post('/new', (req, res) => {
        var arrayError = [];
        var arrayMessage = [];
        var promises = [];
        req.body.forEach(parametros => {
            if (parametros.categoria == 1) {
                var promiseEquipo = conexion.query("SELECT create_or_update_equipo(" + parametros.id + ",'" + parametros.nombre + "','" + parametros.descripcion + "'," + parametros.precio_unitario + ", '" + parametros.marca + "','" + parametros.observacion + "','" + parametros.estado + "'," + parametros.stock + ");");
                promiseEquipo.then(([results, metadata]) => {
                        if (!results[0].create_or_update_equipo) {
                            arrayError.push(parametros.id)
                            arrayMessage.push('Equipo ' + parametros.id + ' ya esta ingresado.')
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
                            arrayMessage.push('Equipo ' + parametros.id + ' ya ingresado.')
                        }
                    })
                    .catch(() => {
                        arrayError.push(parametros.id)
                        arrayMessage.push('Equipo ' + parametros.id + ' no ingresado.')
                    })
                promises.push(promiseInsumo)
            } else if (parametros.categoria == 3) {
                var promiseInstrumento = conexion.query("SELECT create_or_update_instrumento(" + parametros.id + ",'" + parametros.nombre + "','" + parametros.descripcion + "'," + parametros.precio_unitario + ",'" + parametros.observacion + "','" + parametros.estado + "'," + parametros.stock + ");")
                promiseInstrumento.then(([results, metadata]) => {
                        if (!results[0].create_or_update_instrumento) {
                            arrayError.push(parametros.id)
                            arrayMessage.push('Equipo ' + parametros.id + ' ya ingresado.')
                        }
                    })
                    .catch(() => {
                        arrayError.push(parametros.id)
                        arrayMessage.push('Equipo ' + parametros.id + ' no ingresado.')
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
        delete miObjeto.propiedad2;
        delete miObjeto['propiedad2'];
        // ó,
        var prop = "propiedad2";
        delete miObjeto[prop];
    */

    router.put('/update', (req, res) => {
        var errorArray = [];
        var idFails = [];
        new Promise((resolve, reject) => {
                req.body.data.forEach(element => {
                    return conexion.transaction(t => {
                            updateProducto(element, Productos, t).then(result => {
                                    if (result) {
                                        if (element.categoria = 1) {
                                            var id = element.id;
                                            delete element.id
                                            return Equipos.update(element, {
                                                    where: {
                                                        id_producto: id
                                                    },
                                                    transaction: t,
                                                    limit: 1,
                                                    lock: true
                                                }).then(() => {
                                                    res.status(200);
                                                })
                                                .catch(() => {
                                                    res.status(200);
                                                    errorArray.push({
                                                        'message': 'El Equipo con el código ' + id + ' no fue actualizado, revise si la información ingresada es correcta',
                                                        'updated': false
                                                    })
                                                    idFails.push(id);
                                                });
                                        } else if (element.categoria = 2) {
                                            var id = element.id;
                                            delete element.id
                                            return Insumos.update(element, {
                                                    where: {
                                                        id_producto: id
                                                    },
                                                    transaction: t,
                                                    limit: 1,
                                                    lock: true
                                                }).then(() => {
                                                    res.status(200);
                                                })
                                                .catch(() => {
                                                    res.status(500);
                                                    errorArray.push({
                                                        'message': 'El Instrumento con el código ' + id + ' no fue actualizado, revise si la información ingresada es correcta',
                                                        'updated': false
                                                    })
                                                    idFails.push(id);
                                                });
                                        } else if (element.categoria = 3) {
                                            var id = element.id;
                                            delete element.id
                                            return Instrumentos.update(req.body.dataUpdate, {
                                                    where: {
                                                        id_producto: id
                                                    },
                                                    transaction: t,
                                                    limit: 1,
                                                    lock: true
                                                }).then(() => {
                                                    res.status(200);
                                                })
                                                .catch(() => {
                                                    res.status(200);
                                                    errorArray.push({
                                                        'message': 'El Insumo con el código ' + id + ' no fue actualizado, revise si la información ingresada es correcta',
                                                        'updated': false
                                                    })
                                                    idFails.push(id);
                                                });
                                        }
                                    } else {
                                        errorArray.push({
                                            'message': 'El producto con el código ' + element.id + ' no fue actualizado, revise si la información ingresada es correcta',
                                            'updated': false
                                        });
                                        idFails.push(element.id)
                                    }
                                })
                                .catch(() => {
                                    errorArray.push({
                                        'message': 'El producto con el código ' + element.id + ' no fue actualizado, revise si la información ingresada es correcta',
                                        'updated': false
                                    });
                                })
                        })
                        .then(() => {
                            console.log('Transacción realizada');
                        })
                        .catch(() => {
                            errorArray.push({
                                'message': 'El producto con el código ' + element.id + ' no fue actualizado, revise si la información ingresada es correcta',
                                'updated': false
                            });
                            idFails.push(element.id);
                        })
                });
                resolve(true);
                reject(false);
            })
            .then((resultOp) => {
                if (resultOp) {
                    res.json({
                        'message': 'Todos los productos se han ingresado con exito',
                        'insertedAll': true,
                        'idFails': []
                    });
                } else {
                    res.json({
                        'message': errorArray,
                        'insertedAll': false,
                        'idFails': idFails
                    });
                }
            })
            .catch(() => {
                res.json({
                    'message': errorArray,
                    'insertedAll': false,
                    'idFails': idFails
                });
            });
    });
    return router;
}

module.exports.initIngreso = initIngreso

/*
return Productos.findOrCreate({
        where: {
            id: element.id
        },
        defaults: {
            nombre: parametros.marca,
            descripcion: parametros.descripcion,
            precio_unitario: parametros.estado,
            categoria: 'Equipo'
        },
        transaction: transaction
    }).then(
        Equipo.findOrCreate({
            where: {
                id_producto: parametros.id
            },
            defaults: {
                marca: parametros.marca,
                observacion: parametros.observacion,
                estado: parametros.estado,
                stock: parametros.stock
            },
            transaction: transaction
        })
    )
*/

function insertEquipos(parametros, Equipos, Productos, transaction) {
    return Equipos.findOne({
        where: {
            id_producto: parametros.id
        }
    }, {
        transaction: transaction
    }).then(result => {
        if (result) {
            parametros.stock = result.stock + parametros.stock;
            return result.update(parametros, {
                transaction: transaction,
                limit: 1,
                lock: true
            }).then(result => {
                return Productos.update(parametros, {
                    where: {
                        id: parametros.id
                    },
                    transaction: transaction,
                    limit: 1,
                    lock: true
                });
            });
        } else {
            return Productos.create(parametros, {
                transaction: transaction
            }).then(() => {
                return Equipos.create({
                    id_producto: parametros.id,
                    marca: parametros.marca,
                    observacion: parametros.observacion,
                    estado: parametros.estado,
                    stock: parametros.stock
                }, {
                    transaction: transaction
                })
            })
        }
    })

}

function insertInsumos(parametros, Insumos, t) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            var val = Insumos.create({
                id_producto: parametros.id,
                fecha_caducidad: parametros.fecha_caducidad
            }, {
                transaction: t
            }).then(
                resolve(val)
            ).catch((error) => {
                reject(val);
            })
        }, 250);
    });
}

function insertInstrumentos(parametros, Instrumentos, t) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            var val = Instrumentos.create({
                id_producto: parametros.id,
                observacion: parametros.observacion,
                estado: parametros.estado,
                stock: parametros.stock
            }, {
                transaction: t
            }).then(
                resolve(val)
            ).catch((error) => {
                reject(val);
            })
        }, 250);
    });
}

function updateProducto(updateData, Productos, transaction) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            var categorias = ['Equipo', 'Insumo', 'Instrumento'];
            updateData.categoria = categorias[updateData.categoria - 1];
            Productos.update(updateData, {
                    where: {
                        id: req.params.id
                    },
                    transaction: transaction,
                    limit: 1,
                    lock: true
                }).then(() => {
                    resolve(true);
                })
                .catch(() => {
                    reject(false);
                })
        }, 250);

    })
}