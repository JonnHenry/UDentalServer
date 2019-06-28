var equiposApi = require('./Equipos_api').initEquipos;
var insumosApi = require('./Insumos_api').initInsumos;
var instrumentosApi = require('./Instrumentos_api').initInstrumentos;
var ingresoDatosApi = require('./Ingreso_api').initIngreso;

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
            app.use('/data', ingresoDatosApi({
                Productos: instanciaBD.models.Productos,
                Insumos: instanciaBD.models.Insumos,
                Equipos: instanciaBD.models.Equipos,
                Instrumentos: instanciaBD.models.Instrumentos,
                conexionBD: instanciaBD.conexionBD
            }))
            resolve(true);
        } catch (error) {
            reject(false)
        }
    });
}

module.exports.initRouter = inicialiceRouter;