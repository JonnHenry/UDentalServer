const app = require('./app').app;
var apiUse = require('./api/index');
const conexion = require('./db/index').conexion
conexion('UCuencaDental', 'admin', '123456789', 'localhost').then(result => {
  apiUse.initRouter(result, app).then(conect => {
    if (conect) {
      console.log('La conexión es correcta');
    } else {
      console.log('Error');
    }
  })
});
// conexionBD Me trae la conexión y los modelos de la base de datos



app.get("/", (req, res) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
})