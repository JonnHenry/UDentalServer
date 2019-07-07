var express = require('express');
var app = express();
const port = 8080; //Puerto donde va a funcionar express.js
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => {
  console.log('Escuchando en el puerto: ' + port)
});

module.exports.app = app;