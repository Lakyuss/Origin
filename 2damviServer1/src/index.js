const express = require("express");
const bodyParser = require ("body-parser");
const app = express();

app.use(bodyParser.urlencoded( {extended: false }));
app.use(bodyParser.json());

let jugador = {
    nombre:'',
    apellido:'',
    score:''
};

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/', function (req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});

app.get('/hola', function (req, res) {
    res.send('[GET]Saludos desde express');
});
app.get('/jugador', function(req,res){
    res.send("Manolo");
});
app.post('/jugadorr', function (req, res){
    if(0 == 0){
        res.send("ostia");
    }
});
app.post('/jugador', function (req, res){
    if(req.body.nombre == "" || req.body.apellido == "" || req.body.score == "")
    {
        respuesta = {
            error: true,
            codigo: 200,
            mensaje: "Los campos de nombre, apellido y score son requeridos."
        };
    }
    else
    {
        if(jugador.nombre != "" || jugador.apellido != "" || jugador.score != "")
        {
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "El jugador ya fue creado previamente"
            };
        }
        else
        {
            jugador = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                score: req.body.score              
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "El jugador ha sido creado correctamente",
                jugador: jugador
            };
        }

    }
    res.send(respuesta);
});

app.listen(3000, () =>{
console.log("El servidor está inicializado en el puerto 3000");
});