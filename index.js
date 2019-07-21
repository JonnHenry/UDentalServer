const app = require('./app').app;
var apiUse = require('./api/index').initRouter;
const conexion = require('./db/index').conexion

app.get("/", (req, res) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
})

//postgres://vemqjijm:0j1siCgvszEiwg6E4LLBjELw-yw3qWPx@raja.db.elephantsql.com:5432/vemqjijm
//'pruebas', 'admin', '123456789','localhost'
conexion('postgres://vemqjijm:0j1siCgvszEiwg6E4LLBjELw-yw3qWPx@raja.db.elephantsql.com:5432/vemqjijm').then(result => {
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


app.post('login',(req,res)=>{
  conexion('prueba', req.body.user,req.body.password,'localhost').then(result => {
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
})


// conexionBD Me trae la conexión y los modelos de la base de datos

