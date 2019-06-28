var Sequelize = require('sequelize');

//const conexion = new Sequelize('postgres://ebyivwns:DcVXBBQD5JT5gT9ZAIcc3wCzMYgxjjis@raja.db.elephantsql.com:5432/ebyivwns');

function prueba(...parametros) {
    return new Promise((resolve, reject) => {
        var conexionBD = null;
        if (parametros.length == 1) {
            conexionBD = new Sequelize(parametros[0]);
        } else {
            conexionBD = new Sequelize(parametros[0], parametros[1], parametros[2], {
                host: parametros[3],
                dialect: 'postgres',
                dialectOptions: {
                    encrypt: true
                },
                pool: {
                    max: 20,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                logging: false
            });
        }
        resolve(conexionBD);
        if (conexionBD = null) reject('Error al conectar a la base de datos')
    });
}

var conexion = function (...parametros) {
    return new Promise((resolve, reject) => {
        var conexionBD = null
        prueba(...parametros).then(conexionBD => {
            var models = require('../models')(conexionBD);
            conexionBD.sync({
               //force: true
            }).then(() => {
                    console.log('Base de datos iniciada correctamente!')
                },
                (err) => {
                    //Sequelize error
                    console.log('Error al iniciar sesion: ' + err)
                });
            setTimeout(() => {
                resolve({
                    conexionBD: conexionBD,
                    models: models,
                    error: false
                });
            }, 300);

        }, (error) => {
            console.log(error)
            reject({
                conexionBD: conexionBD,
                models: models,
                error: true
            })
        });

    })

}

module.exports.conexion = conexion;