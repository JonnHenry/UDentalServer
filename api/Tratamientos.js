var express = require('express');
var router = express.Router();


//TODO: Me quede aqui no esta hecho ninguno

function initTratamientos(instanciaBD) {
    var Tratamientos = instanciaBD.Tratamientos;
    var TratamientoProductos = instanciaBD.TratamientoProductos;
    var conexion = instanciaBD.conexionBD;
    router.post('/new', (req, res) => {
        /*
        JSON que debe de llegar
            {
                nombre: 'Nombre del tratamiento',
                precio: precio_tratamiento,
                descripcion: 'Descripcion del tratamiento',
                productos:[
                    {
                        id: ID_del_producto(equipo,insumo,instrumento),
                        cantidad: cantidad_que_ocupa
                    },
                    {
                        id: ID_del_producto(equipo,insumo,instrumento),
                        cantidad: cantidad_que_ocupa
                    }
                ]
            }
        */
        try {
            return conexion.query("SELECT ingreso_tratamiento('" + req.body.nombre + "'," + req.body.precio + ",'" + req.body.descripcion + "','" + JSON.stringify(req.body.productos) + "');")
                .then(([results, metadata]) => {
                    res.json({
                        'message': 'El tratamiento se ha ingresado con exito',
                        "error": false
                    }).status(200);
                })
                .catch(() => {
                    res.json({
                        'message': 'El tratamiento no se ha ingresado, verifique la información enviada',
                        "error": true
                    }).status(200);
                })
        } catch (error) {
            res.json({
                'message': 'El tratamiento no se ha ingresado, verifique la información enviada',
                "error": true
            }).status(500);
        }
    });

    router.get('/all', (req, res) => {
        try {
            return conexion.query("SELECT id, nombre, precio, descripcion, fecha_creacion,fecha_actualizacion FROM tratamientos WHERE activo=true")
                .then(([results, metadata]) => {
                    res.json({
                        "error": false,
                        "data": results
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        "error": false,
                        "data": []
                    }).status(200);
                })

        } catch (error) {
            res.json({
                "error": false,
                "data": []
            }).status(500);
        }

    })


    router.get('/productos/:id', (req, res) => {
        try {
            return conexion.query("SELECT productos.id, productos.nombre, productos.descripcion, productos.categoria, cantidad_producto FROM tratamiento_productos JOIN productos ON productos.id = tratamiento_productos.id_producto JOIN tratamientos ON tratamientos.id=tratamiento_productos.id_tratamiento WHERE tratamientos.activo=true AND tratamiento_productos.id_tratamiento=" + req.params.id)
                .then(([results, metadata]) => {
                    res.json({
                        "message": 'El productos tiene los siguientes tratamientos:',
                        "error": false,
                        "data": results
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        'message': 'No se ha encontrado resultados',
                        "error": true,
                        "data": []
                    }).status(200);
                })
        } catch (error) {
            res.json({
                'message': 'No se ha encontrado resultados',
                "error": true,
                "data": []
            }).status(500);
        }
    })

    //Para poner en estado inactivo un tratamiento pero no se borra
    router.delete('/delete/:id', (req, res) => {
        try {
            return conexion.transaction(t => {
                    return Tratamientos.update({
                        activo: false
                    }, {
                        where: {
                            id: req.params.id
                        },
                        transaction: t,
                        limit: 1,
                        lock: true
                    }).then(() => {
                        return ({
                            'message': 'El tratamiento fue borrado de manera correcta',
                            'deleted': true
                        })
                    })
                })
                .then(valor => {
                    res.json(valor)
                });
        } catch (error) {
            res.json({
                'message': 'El tratamiento no fue borrado, vuelva a intentarlo y revise los datos enviados',
                'deleted': false
            })
        }
    })

    //DELETE FROM tratamiento_productos where id_tratamiento=1 AND id_producto=1 ;

    router.delete('/productos/delete/', (req, res) => {
        /*{
            Formato JSON a enviar
            id_tratamiento:1,
            id_producto: 1
        }*/
        try {
            return conexion.query("DELETE FROM tratamiento_productos where id_tratamiento=" + req.body.id_tratamiento + " AND id_producto=" + req.body.id_producto)
                .then(([results, metadata]) => {
                    res.json({
                        'message': 'El productos se ha eliminado del tratamiento con exito',
                        "error": false
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        'message': 'No se ha eliminado el producto del tratamientos',
                        "error": true
                    }).status(200);
                })
        } catch (error) {
            res.json({
                'message': 'Error, revise los paramentros enviados',
                "error": true
            }).status(500);
        }
    });


    router.post('/update', (req, res) => {
        /*{
            Formato JSON a enviar
            id_tratamiento:1,
            id_producto: 1,
            cantidad: 5
        }*/
        try {
            return conexion.transaction(t => {
                    return TratamientoProductos.update({
                        cantidad_producto: req.body.cantidad_producto
                    }, {
                        where: {
                            id_tratamiento: req.body.id_tratamiento,
                            id_producto: req.body.id_producto
                        },
                        transaction: t,
                        limit: 1,
                        lock: true
                    }).then(() => {
                        return ({
                            'message': 'El tratamiento fue actualizado de manera correcta',
                            'deleted': true
                        })
                    })
                })
                .then(valor => {
                    res.json(valor)
                });
        } catch (error) {
            res.json({
                'message': 'El tratamiento no fue actualizado, vuelva a intentarlo y revise los datos enviados',
                'deleted': false
            })
        }
    });

    router.post('/inicia_tratamiento/:id', (req, res) => {
        try {
            return conexion.query("SELECT inicia_tratamiento(" + req.params.id + ")")
                .then(([results, metadata]) => {
                    res.json({
                        "message": 'El tratamiento se ha iniciado.',
                        "error": false
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        'message': 'El tratamiento no se ha iniciado.',
                        "error": true
                    }).status(200);
                })
        } catch (error) {
            res.json({
                'message': 'El tratamiento no se ha iniciado.',
                "error": true
            }).status(500);
        }
    })

    router.post('/termina_tratamiento', (req, res) => {
        /*
            Se debde de enviar el JSON de la siguiente manera
            {
                "id_tratamiento": 1,
                "inservible": [1,2,3,4,5] //Representa los insumo que ya no sirven o fueron desechados de una manera en
                que ya no se pueden usar y son eliminados para siempre
            }
        */
        try {
            console.log(req.body.insumos_desechados);
            return conexion.query("SELECT termina_tratamiento(" + req.body.id_tratamiento +","+ "'{"+req.body.inservible+"}'"+")")
                .then(([results, metadata]) => {
                    res.json({
                        "message": 'El tratamiento se ha terminado de manera correcta.',
                        "error": false
                    }).status(200);
                })
                .catch(err => {
                    res.json({
                        'message': 'El tratamiento no se ha terminado de manera correcta.',
                        "error": true
                    }).status(200);
                })
        } catch (error) {
            res.json({
                'message': 'El tratamiento no se ha terminado de manera correcta.',
                "error": true
            }).status(500);
        }
    })
    return router;

}
module.exports.initTratamientos = initTratamientos;