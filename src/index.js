const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const apijs = require('./Api.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');


const port = process.env.PORT || 3000;

apijs.listen(port, () => {
    console.log("El servidor está inicializado en el puerto " + port);
}); 

apijs.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));