var Sequelize = require('sequelize');

/*const conexion = new Sequelize('UCuencaDental', 'admin', '123456789', {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        encrypt: true
    }
});*/

const conexion = new Sequelize('postgres://ebyivwns:DcVXBBQD5JT5gT9ZAIcc3wCzMYgxjjis@raja.db.elephantsql.com:5432/ebyivwns');

var models=require('../models')(conexion);

const connectDB = ()=>{
    conexion.sync({force: true}).then(() => {
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
