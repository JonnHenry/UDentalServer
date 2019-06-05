var Sequelize = require('sequelize');


const conexion = new Sequelize('UCuencaDental', 'admin', '123456789', {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        encrypt: true
    }
});


var models=require('../models')(conexion);


conexion.sync({force: true}).then(() => {
    console.log('Tablas Creadas exitosamente!')
});


module.exports.models=models;
module.exports.conexion=conexion;
