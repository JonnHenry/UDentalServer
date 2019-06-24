const app = require('./app').app;
const conexion = require('./db/index').conexion
var conexionBD = conexion('UCuencaDental', 'admin', '123456789', 'localhost').then(result => {
  console.log(result);
});
// conexionBD Me trae la conexión y los modelos de la base de datos



app.get("/", (req, res) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
})