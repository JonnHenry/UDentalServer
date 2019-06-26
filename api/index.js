var equiposApi = require('./Equipos_api').initEquipos;
var insumosApi = require('./Insumos_api').initInsumos;
var instrumentosApi = require('./Instrumentos_api').initInstrumentos;

/*
     conexionBD: conexionBD,
                    models: models,
*/

function inicialiceRouter(instanciaBD, app) {
    return new Promise((resolve, reject) => {
        try {
            app.use('/equipos', equiposApi({
                conexionBD: instanciaBD.conexionBD,
                Productos: instanciaBD.models.Productos,
                Equipos: instanciaBD.models.Equipos
            }));
            app.use('/insumos', insumosApi({
                conexionBD: instanciaBD.conexionBD,
                Productos: instanciaBD.models.Productos,
                Insumos: instanciaBD.models.Insumos
            }));
            app.use('/instrumentos', instrumentosApi({
                conexionBD: instanciaBD.conexionBD,
                Productos: instanciaBD.models.Productos,
                Instrumentos: instanciaBD.models.Instrumentos
            }))
            resolve(true);
        } catch (error) {
            reject(error)
        }
    });
}

module.exports.initRouter = inicialiceRouter;