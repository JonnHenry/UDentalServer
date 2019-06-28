/*TODO: Se crea los inventarios
-Dede crear todo tipo de invetarios(Entrega y control)
-Debe obtener los invetarios(Entrega y control)
-Debe obtener los productos de los invetarios(Entrega y control)
*/

var express = require('express');
var router = express.Router();

function initInventarios(instanciaBD){
    var Inventarios = instanciaBD.Inventarios;
    var InventariosControl = instanciaBD.InventariosControl;
    var InventariosEntrega = instanciaBD.InventariosEntrega;
    var conexionBD = instanciaBD.conexionBD;

    /*
    Para el control de los inventarios(Invetario_Control)
        {
            nombre: 'nombre en String',
            descripcion: 'descripcion en String',
            persona_realiza:'persona_realiza en string'
        }
    */
        /*TODO: Hacer para ingresar los datos del usuario y con result del ingreso se puede recuperar el inventario creado*/ 
    router.post('/invetrario_control', (req,res)=>{
        
    })

    return router;
}

module.exports.initInventarios = initInventarios;
