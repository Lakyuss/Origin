const express = require("express");
const bodyParser = require ("body-parser");
const app = express();

app.use(bodyParser.urlencoded( {extended: false }));
app.use(bodyParser.json());

 
let jugadores = [{
    posicio: "1",
    alies: "jperez",
    nom: "Jose",
    congnom: "Perez",
    score: "1000"
},
{
    posicio: "2",
    alies: "jsanz",
    nom: "Juan",
    congnom: "Sanz",
    score: "950"
},
{
    posicio: "3",
    alies: "mgutierrez",
    nom: "Maria",
    congnom: "Gutierrez",
    score: "850"
},
{
    posicio: "",
    alies: "",
    nom: "",
    congnom: "",
    score: ""
}];
 
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
   };
 
   app.get('/ranking' , function (req,res)
   {
    respuesta={
        nombreJugador:jugador.length,jugadores:jugadores}
        res.send(respuesta);
    });
   
   
    app.get('/jugador/:alies', function(req,res){
        var x = 0;
        for( i = 0; i < jugadores.length; i++)
        {
            if(jugadors[i].alies == req.params.alies){
            res.send(jugadores[i]);
            }else{
                x++;
            }
        }
        if(x == jugadores.length){
            respuesta = {
                "error": true,
                "codi": 504,
                "missatge": "El jugador no existe"
            }
            res.send(respuesta);
        }
    })  
    
 app.post('/jugador/:alies', function (req, res) {
    respuesta = {
        error: true,
        codigo: 503,
        mensaje: 'El jugador ya existe'
    };
    if (req.params.alies== "" || req.body.nom == "" || req.body.cognom == "" ||  req.body.score == "" || parseInt(req.body.score) <0) 
    {
         respuesta = {
             error: true,
             codigo: 502,
             mensaje: 'El campo alias, nombre, apellido y score son requeridos'
         };
    }
    else{
        trobat = jugadores.find(({ alies }) => alies === req.params.alies );
        if (trobat == undefined)
            {
                jugadores[jugadores.length] = {
                    posicio: jugadores.length,
                    alies: req.params.alies,
                    nom: req.body.nom,
                    cognom: req.body.cognom,
                    score: req.body.score
                };
                jugadores.sort((a, b) => b.score - a.score); 
                for(i=0; i<jugadores.length; i++) jugadores[i.posicio = i+1]; 
                respuesta = { jugadores : jugadores};
            }
        }
    res.send(respuesta);
 });
 app.put('/jugador/:alies', function (req, res) {
    respuesta = {
        error: true,
        codigo: 504,
        mensaje: 'El jugador no existe'
    };
    if (req.params.alies== "" || req.body.nom == "" || req.body.cognom == "" ||  req.body.score == "" || parseInt(req.body.score) <0)
    {
         respuesta = {
             error: true,
             codigo: 502,
             mensaje: 'El campo alias, nombre, apellido y score son requeridos'
         };
    }
    else{
        trobat = jugadores.find(({ alies }) => alies === req.params.alies );
        if(trobat != undefined)
        {
            jugadores.splice(trobat.posicio-1, 1);
            jugadores[jugadores.length] = {
                posicio: jugadores.length,
                alies: req.params.alies,
                nom: req.body.nom,
                cognom: req.body.cognom,
                score: req.body.score
            };
            jugadores.sort((a, b) => b.score - a.score);
            for(i=0; i<jugadores.length; i++) jugadores[i].posicio = j+1;
            respuesta = { jugadores : jugadores };
        }
    }
    res.send(respuesta);
 });
 app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
 });
