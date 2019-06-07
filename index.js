//Variables
var express = require('express');
const port = 8080; //Puerto donde va a funcionar expres.js
var cors = require('cors');
const bodyParser = require('body-parser');
const models=require('./db/index').models;
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
const connectDB = require('./db').connectDB;
connectDB(); //Se realiza la conexión a la base de datos

//Fin de la declaración de las variables

//Asignacion de los modelos
const Productos=models.Productos;
const Equipos=models.Equipos;
const Insumos=models.Insumos;
const Instrumentos=models.Instrumentos;
const Inventarios=models.Inventarios
const InventariosEntrega=models.InventariosEntrega;
const InventariosControl=models.InventariosControl;
//Fin de la asignación de los modelos


//Creación de la API para productos//

app.post('/producto/nuevo', (req, res) => { // Para poder crear un producto
  Inventarios.findOrCreate({
    where: {
      Id: req.body.id,
    },
    defaults: {
      Nombre: req.body.Nombre,
      Descripcion: req.body.descripcion,
      PrecioUnitario: req.body.precio,
      Stock : req.body.stock
    }
  }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
    if (created) {
      res.json({
        'message': 'El Producto fue ingresado de manera correcta',
        'inserted': true
      })
    } else {
      res.json({
        'message': 'El Producto no fue ingresado, ya se encuentra registrado',
        'inserted': false
      })
    }
  }).catch(err => {
    res.json({
      message: 'Error, vuelva a intentarlo.',
      inserted: false
    })
  })
});


app.get('/producto/busca/:id', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
  var idProducto = req.params.id;
  Productos.findOne({
      where: {
        Id: idProducto
      }
    })
    .then(result => {
      res.json({
        'data': result,
        'error': false,
        'message': 'Datos encontrados'
      })
    })
    .catch(() => {
      res.json({
        'message': 'Error al buscar, verifique los datos ingresados',
        'error': true,
        'data': []
      });
    })
});


app.get('/producto/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
  Productos.findAndCountAll()
    .then(result => {
      res.json({
        'length': result.count,
        'data': result.rows,
        'error': false
      })
    })
    .catch((err) => {
      res.json({
        'length': 0,
        'error': true,
        'data': []
      });
    })
});


app.delete('/producto/delete/:idProducto', (req, res) => { //Borrar un inventario
  var idProducto = req.params.id;
  Productos.update({
    Activo: false
    },{
      where: {
        Id: idProducto
      }
    })
    .then(result => {
      res.json({
        'error': false,
        'message': 'Producto Eliminado'
      })
    })
    .catch(() => {
      res.json({
        'message': '500 Internal Server Error, vuelva a intentarlo',
        'error': true
      });
    })
})
//Fin de la API para productos//


//Api para Equipos//



//Fin Api para equipos//



app.get("/", (req, res) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
})


app.listen(port, () => {
  console.log('Escuchando en el puerto' + port)
});