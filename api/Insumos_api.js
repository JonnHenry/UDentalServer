/*TODO: Pendiente como eliminar un insumo
 */

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
        return conexion.query("SELECT id, nombre, descripcion, precio_unitario, fecha_creacion, categoria, fecha_actualizacion, fecha_caducidad FROM insumos JOIN productos ON productos.id = insumos.id_producto")
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



module.exports.initInsumos = initInsumos;