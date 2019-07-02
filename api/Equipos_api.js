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
        return conexion.query("SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, categoria,fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = equipos.id_producto;")
            .then(([results, metadata]) => {

                res.json({
                    "error": false,
                    "data": results
                }).status(200);
            })
            .catch(err => {
                res.json(err)
                res.json({
                    message: 'Error, vuelva a intentarlo.',
                    inserted: false
                }).status(500);
            })
    });

    /*
        El objeto a enviar debe de ser de esta manera
        {
            colAndValueSearch: ['col=value'],---> tipo string
        }
    */

    //Obtener los equipos con 
    router.get('/find', (req, res) => {
        createQuery(req.body.colAndValueSearch).then(querySearch => {
            return conexion.query(querySearch)
                .then(([results, metadata]) => {
                    res.json ({
                        "error": false,
                        "message": "Se econtraron valores para los criterios de busqueda",
                        "data": results
                    }).status(200);
                })
                .catch(err => {                  
                    res.json ({
                        "message": 'Error, vuelva a intentarlo y revise ingresados.',
                        "error": true,
                        "data": []
                    }).status(500)
                })
        })
});

router.put('/update/:id', (req, res) => {
    try {
        return conexion.transaction(t => {
            return Equipos.update(req.body.dataUpdate, {
                where: {
                    id_producto: req.params.id
                },
                transaction: t,
                limit: 1,
                lock: true
            }).then(() => {
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
                        'message': 'El Equipo fue actualizado, de manera correcta',
                        'updated': true
                    })
                })
            })
        });
    } catch (error) {
        return ({
            'message': 'El Equipo no fue actualizado revise los valores ingresados, vuelva a intentarlo',
            'updated': false
        })
    }
});



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
    var query = 'SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = equipos.id_producto';
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

module.exports.initEquipos = initEquipos;