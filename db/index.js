var Sequelize = require('sequelize');

const conexion = new Sequelize('UCuencaDental', 'admin', '123456789', {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        encrypt: true
    }
});

var models=require('../models')(conexion);

const connectDB = ()=>{
    conexion.sync().then(() => {
        console.log('Tablas Creadas exitosamente!')
    },
    (err) => 
        {
            //Sequelize error
            console.log("Error connecting DB, retrying...")
            setTimeout(connectDB, 5000);
        });
}

module.exports.models=models;
module.exports.conexion=conexion;
module.exports.connectDB=connectDB;
