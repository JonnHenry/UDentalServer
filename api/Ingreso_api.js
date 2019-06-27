var express = require('express');
var router = express.Router();

function initIngreso(instanciaBD) {
    var Productos = instanciaBD.models.Productos;
    var Insumos = instanciaBD.models.Insumos;
    var Equipos = instanciaBD.models.Equipos;
    var Instrumentos = instanciaBD.models.Instrumentos;

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
                {
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

    router.post('/new', (req, res) => {
        var newArray = req.body.data;
        var errorArray = [];
        var idFails = [];
        var categorias = ['Equipo', 'Insumo', 'Instrumento'];
        try {
            return new Promise((resolve, reject) => {
                    newArray.forEach(element => {
                        return conexion.transaction(t => {
                                return Productos.findOrCreate({
                                        where: {
                                            id: element.id
                                        },
                                        defaults: {
                                            nombre: element.marca,
                                            descripcion: element.observacion,
                                            precio_unitario: element.estado,
                                            categoria: categorias[element.categoria - 1]
                                        }
                                    }, {
                                        transaction: t
                                    }).then(([result, created]) => {
                                        if (created) {
                                            if (element.categoria = 1) {
                                                return insertEquipos(element, Equipos, t).then(result => {
                                                        res.status(200);
                                                    })
                                                    .catch(() => {
                                                        res.status(200);
                                                        errorArray.push({
                                                            'message': 'Los valores ingresados en el equipo con la clave ' + element.id + ' no se encuentran ingresados de una manera correcta, reviselos',
                                                            'inserted': false
                                                        })
                                                        idFails.push(element.id)
                                                    });
                                            } else if (element.categoria = 2) {
                                                return insertInsumos(element, Insumos, t).then(result => {
                                                        res.status(200);
                                                    })
                                                    .catch(() => {
                                                        res.status(500);
                                                        errorArray.push({
                                                            'message': 'Los valores ingresados en el insumo con la clave ' + element.id + ' no se encuentran ingresados de una manera correcta, reviselos',
                                                            'inserted': false
                                                        })
                                                        idFails.push(element.id)
                                                    });
                                            } else if (element.categoria = 3) {
                                                return insertInstrumentos(element, Instrumentos, t).then(result => {
                                                        res.status(200);
                                                    })
                                                    .catch(() => {
                                                        res.status(500);
                                                        errorArray.push({
                                                            'message': 'Los valores ingresados en el instrumento con la clave ' + element.id + ' no se encuentran ingresados de una manera correcta, reviselos',
                                                            'inserted': false
                                                        })
                                                        idFails.push(element.id)
                                                    });
                                            }
                                        } else {
                                            res.status(200);
                                            errorArray.push({
                                                'message': 'El producto ingresado con el código ' + element.id + ' ya se encuentra registrado',
                                                'inserted': false
                                            })
                                            idFails.push(element.id)
                                        }
                                    })
                                    .catch(() => {
                                        res.status(200);
                                        errorArray.push({
                                            'message': 'Error verifique los datos y el valor de los campos en el producto ' + element.id,
                                            'inserted': false
                                        })
                                        idFails.push(element.id)
                                    });
                            })
                            .then(() => {
                                console.log('Transacción realizada de manera correcta');
                            })
                    });
                    resolve(true);
                    reject(false)
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
                })

        } catch (error) {
            res.status(500);
            res.json({
                'message': 'Error, verifique el tipo de solicitud y los valores de la misma',
                'inserted': false
            })
        }
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
   //TODO: Ver como borrar una propieda para ponerla en un objeto JSON y enviarlo

    router.put('/update', (req, res) => {
        var errorArray = [];
        var idFails = [];
        new Promise((resolve, reject) => {
                req.body.data.forEach(element => {
                    return conexion.transaction(t => {
                        if (element.categoria = 1){
                            element.categoria = 'Equipo';
                            

                        }else if (element.categoria = 2){
                            element.categoria = 'Insumo';

                        }else if (element.categoria = 3){
                            element.categoria = 'Instrumento';

                        }
                        
                    });
                });
                resolve(false);
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

module.exports.initIngreso = initIngreso();

function insertEquipos(parametros, Equipo, t) {
    return new Promise((resolve, reject) => {
        var val = Equipo.create({
            id_producto: parametros.id,
            marca: parametros.marca,
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
    });
}


function insertInsumos(parametros, Insumos, t) {
    return new Promise((resolve, reject) => {
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
    });
}

function insertInstrumentos(parametros, Instrumentos, t) {
    return new Promise((resolve, reject) => {
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
    });
}