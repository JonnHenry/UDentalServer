/*TODO: Pendiente como eliminar un instrumento
 */

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
        return conexion.query("SELECT id, nombre, descripcion, precio_unitario, categoria,fecha_creacion, fecha_actualizacion, observacion, estado, stock  FROM instrumentos JOIN productos ON productos.id = instrumentos.id_producto;")
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
        Actualizar un Insumo solo un valor
        Para modificar un valor se debe de enviar de la siguiente manera
        {
            colUpdate: 'nameCol', // El valor de la columna a actualizar
            dataUpdate: {
                colUpdate: 'valueUpdate'
            }
        } 
    */


    return router
}



function createQuery(parametros) {
    return new Promise((resolve, reject) => {
        if (parametros.length != 0) {
            query = 'SELECT id, nombre, descripcion, precio_unitario, fecha_creacion, fecha_actualizacion, fecha_caducidad FROM instrumentos JOIN productos ON productos.id = instrumentos.id_producto WHERE '
            parametros.forEach(element => {
                query = query + element + ' AND '
            });
            console.log(query);
        }
        resolve(query);
        reject(query);
    })
}

module.exports.initInstrumentos = initInstrumentos;