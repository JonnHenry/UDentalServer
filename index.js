//Variables
var express = require('express');
const port = 8080; //Puerto donde va a funcionar expres.js
var cors = require('cors');
const bodyParser = require('body-parser');
const models=require('./db/index');
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());

//Fin de la declaración de las variables

//Asignacion de los modelos
const Equipos=models.Equipos;
const Insumos=models.Insumos;
const Instrumentos=models.Instrumentos;
const InventariosEntrega=models.InventariosEntrega;
const InventariosControl=models.InventariosControl;
//Fin de la asignación de los modelos


//Fin de la asignacion de los modelos

