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

    router.post('/invetrario_entrega', (req,res)=>{
        
    })

    return router;
}

module.exports.initInventarios = initInventarios;
