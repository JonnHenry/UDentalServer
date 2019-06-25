var equiposApi = require('./Equipos_api').initEquipos;

/*
     conexionBD: conexionBD,
                    models: models,
*/

function inicialiceRouter(instanciaBD, app) {
    return new Promise((resolve, reject) => {
        try {
            app.use('equipos', equiposApi({
                conexionBD: instanciaBD.conexionBD,
                Productos: instanciaBD.models.Productos,
                Equipos: instanciaBD.models.Equipos
            }));
            resolve(true);
        } catch (error) {
            reject(error)
        }
    });
}

module.exports.initRouter = inicialiceRouter;