const app = require('./app').app;
var apiUse = require('./api/index').initRouter;
const conexion = require('./db/index').conexion
conexion('UCuencaDental', 'admin', '123456789', 'localhost').then(result => {
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

app.get("/", (req, res) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
})