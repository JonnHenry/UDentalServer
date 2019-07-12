var express = require('express');
var router = express.Router();

//Ruta del enrutador actual /equipo
function initEquipos(instanciaBD) {
    var Productos = instanciaBD.Productos;
    var Equipos = instanciaBD.Equipos;
    var conexion = instanciaBD.conexionBD;

    //  Obtener todos los equipos

    router.get('/all', (req, res) => {
        return conexion.query("SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, categoria,fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = equipos.id_producto WHERE productos.activo=true")
            .then(([results, metadata]) => {

                res.json({
                    "error": false,
                    "data": results
                }).status(200);
            })
            .catch(err => {
                res.json({
                    message: 'Error, vuelva a intentarlo.',
                    inserted: false
                }).status(500);
            })
    });


    /*
        El objeto a enviar debe de ser de esta manera
        {
            colAndValueSearch: ['col=value']---> tipo string
        }
    */
    router.post('/find', (req, res) => {
        createQuery(req.body.colAndValueSearch).then(querySearch => {
            return conexion.query(querySearch)
                .then(([results, metadata]) => {
                    res.json({
                        "error": false,
                        "message": "Se econtraron valores para los criterios de busqueda",
                        "data": results
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        "message": 'Error, vuelva a intentarlo y revise los campos ingresados.',
                        "error": true,
                        "data": []
                    }).status(500)
                })
        })
    });


    /*
        Formato del objeto JSON a enviar
        {
            "dataUpdate": {
                "nombre": "Equipo de prueba 1"
            }
        }
    */
    router.post('/update/:id', (req, res) => {
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
                })
                .then(valor => {
                    res.json(valor)
                });
        } catch (error) {
            res.json({
                'message': 'El Equipo no fue actualizado revise los valores ingresados, vuelva a intentarlo',
                'updated': false
            })
        }
    });
    return router
}

function createQuery(parametros) {
    var query = 'SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, fecha_creacion, fecha_actualizacion FROM equipos JOIN productos ON productos.id = equipos.id_producto WHERE productos.activo=true ';
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

module.exports.initEquipos = initEquipos;