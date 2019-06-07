//Variables

const connectDB = require('./db').connectDB;
connectDB(); //Se realiza la conexión a la base de datos
var express = require('express');
const port = 3030; //Puerto donde va a funcionar expres.js
var cors = require('cors');
const bodyParser = require('body-parser');
const models=require('./db/index').models;
const conexion = require('./db/index').conexion;
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());


//Fin de la declaración de las variables

//Asignacion de los modelos
const Productos=models.Productos;
const Equipos=models.Equipos;
const Insumos=models.Insumos;
const Instrumentos=models.Instrumentos;
const Inventarios=models.Inventarios;
const Tratamientos = models.Tratamientos;
const InventariosEntrega=models.InventariosEntrega;
const InventariosControl=models.InventariosControl;
//Fin de la asignación de los modelos


//Creación de la API para productos//

app.post('/producto/nuevo', (req, res) => { // Para poder crear un producto
  Productos.findOrCreate({
    where: {
      Id: req.body.id,
    },
    defaults: {
      Nombre: req.body.nombre,
      Descripcion: req.body.descripcion,
      PrecioUnitario: req.body.precioUnitario,
      Stock : req.body.stock,
      Activo: req.body.activo
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


app.delete('/producto/delete/:idProducto', (req, res) => { //Borrar un producto
  var idProducto = req.params.idProducto;
  Productos.update({
    Activo: false
    },{
      where: {
        Id: idProducto
      },
      returning: true,
      plain: true
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
app.post('/equipo/nuevo', (req, res) => { // Para poder crear un producto
  Equipos.findOrCreate({
    where: {
      IdProducto: req.body.idProducto,
    },
    defaults: {
      Marca: req.body.marca,
      Observacion: req.body.observacion,
      Estado: req.body.estado
    }
  }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
    if (created) {
      res.json({
        'message': 'El Equipo fue ingresado de manera correcta',
        'inserted': true
      })
    } else {
      res.json({
        'message': 'El Equipo no fue ingresado, ya se encuentra registrado',
        'inserted': false
      })
    }
  }).catch(err => {
    res.json({
      message: 'Error 500 Internal Server Error, vuelva a intentarlo.',
      inserted: false
    })
  })
});


app.get('/equipo/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
  Equipos.findAndCountAll()
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


//Fin Api para equipos//


app.post('/instrumento/nuevo', (req, res) => { // Para poder crear un producto
  Instrumentos.findOrCreate({
    where: {
      IdProducto: req.body.idProducto,
    },
    defaults: {
      Observacion: req.body.observacion,
      Estado: req.body.estado
    }
  }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
    if (created) {
      res.json({
        'message': 'El Instrumento fue ingresado de manera correcta',
        'inserted': true
      })
    } else {
      res.json({
        'message': 'El Instrumento no fue ingresado, ya se encuentra registrado',
        'inserted': false
      })
    }
  }).catch(err => {
    res.json({
      message: 'Error 500 Internal Server Error, vuelva a intentarlo.',
      inserted: false
    })
  })
});


app.get('/instrumento/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
  Instrumentos.findAndCountAll()
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

app.post('/insumo/nuevo', (req, res) => { // Para poder crear un producto
  Insumos.findOrCreate({
    where: {
      IdProducto: req.body.idProducto,
    },
    defaults: {
      FechaCaducidad: req.body.fechaCaducidad,
    }
  }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
    if (created) {
      res.json({
        'message': 'El Instrumento fue ingresado de manera correcta',
        'inserted': true
      })
    } else {
      res.json({
        'message': 'El Instrumento no fue ingresado, ya se encuentra registrado',
        'inserted': false
      })
    }
  }).catch(err => {
    res.json({
      message: 'Error 500 Internal Server Error, vuelva a intentarlo.',
      inserted: false
    })
  })
});

app.get('/insumos/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
  Insumos.findAndCountAll()
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

app.post('/inventario/nuevo', (req, res) => { // Para poder crear un producto
  Inventarios.findOrCreate({
    where: {
      Id: req.body.id,
    },
    defaults: {
      Nombre: req.body.nombre,
      Descripcion: req.body.descripcion,
      Fecha: req.body.fecha
    }
  }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
    if (created) {
      res.json({
        'message': 'El Inventario fue ingresado de manera correcta',
        'inserted': true
      })
    } else {
      res.json({
        'message': 'El Inventario no fue ingresado, ya se encuentra registrado',
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


app.get('/inventario/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
  Inventarios.findAndCountAll()
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


app.post('/tratamiento/nuevo', (req, res) => { // Para poder crear un producto
  Inventarios.findOrCreate({
    where: {
      Id: req.body.id,
    },
    defaults: {
      Nombre: req.body.nombre,
      Duracion: req.body.descripcion,
      Precion: req.body.fecha,
      Descripcion: req.body.descripcion
    }
  }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
    if (created) {
      res.json({
        'message': 'El Tratamiento fue ingresado de manera correcta',
        'inserted': true
      })
    } else {
      res.json({
        'message': 'El Tratamiento no fue ingresado, ya se encuentra registrado',
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


app.get('/tratamiento/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
  Tratamientos.findAndCountAll()
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






app.get("/", (req, res) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
})

app.listen(port, () => {
  console.log('Escuchando en el puerto' + port)
});