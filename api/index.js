function inicialiceRouter(instanciaBD, app) {
    return new Promise((resolve, reject) => {
        try {
            
            resolve(true);
        } catch (error) {
            reject(error)
        }
    });
}

module.exports.initRouter = inicialiceRouter;