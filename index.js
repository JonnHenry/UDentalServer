const app = require('./app').app;
var apiUse = require('./api/index').initRouter;
const conexion = require('./db/index').conexion
conexion('postgres://udentalserver@udentalserver:Udental_server@udentalserver.postgres.database.azure.com:5432/postgres').then(result => {
  apiUse(result, app).then(conect => {
    if (conect) {
      console.log('La conexión es correcta');
    } else {
      console.log('La conexión no es correcta');
    }
  })
  .catch((error)=>{
    console.log(error);
  })
});
// conexionBD Me trae la conexión y los modelos de la base de datos

