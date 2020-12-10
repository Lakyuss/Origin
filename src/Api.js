const express = require("express");
const bodyParser = require("body-parser");
const app = express()
var router = express.Router();
const fs = require('fs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let code100 = { code: 100, error: false, message: '2-DAMVI Server Up' };
let code200 = { code: 200, error: false, message: 'Player Exists' };
let code201 = { code: 201, error: false, message: 'Player Correctly Created' };
let code202 = { code: 201, error: false, message: 'Player Correctly Updated' };
let codeError502 = { code: 503, error: true, message: 'The field: name, surname, score are mandatories (the score value has to be >0)' };
let codeError503 = { code: 503, error: true, message: 'Error: Player Exists' };
let codeError504 = { code: 504, error: true, message: 'Error: Player not found' };

var players = [
    { position: "1", alias: "jperez", name: "Jose", surname: "Perez", score: 1000, created: "2020-11-03T15:20:21.377Z"},
    { position: "2", alias: "jsanz", name: "Juan", surname: "Sanz", score: 950, created: "2020-11-03T15:20:21.377Z" },
    { position: "3", alias: "mgutierrez", name: "Maria", surname: "Gutierrez", score: 850, created: "2020-11-03T15:20:21.377Z" }
];
let response = {
    error: false,
    code: 200,
    message: ''
};
 
/*function UpdateRanking() {
    players.sort((a, b) => (a.score <= b.score) ? 1 : -1);

    for (x = 0; x < players.length; x++) {
        players[x].position = x + 1;
    }
};

function getjson()
{
    fs.readFile('./src/player.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        players = JSON.parse(jsonString);
    })
}

function savejson()
{
    const str = JSON.stringify(players);
    fs.writeFile('./src/player.json', str,'utf8', (err) => { 
        if (err) throw err; 
        console.log('The file has been saved!'); 
    });
}*/

router.get('/', function (req, res) {
    res.send(code100);
});

router.get('/ranking', function (req, res) {
    let ranking = { namebreplayers: players.length, players: players };
    res.send(ranking);
});

router.get('/players', function (req, res){
    res.send(players);
});

router.get('/players/:alias', function (req, res) {
    var index = players.findIndex(j => j.alias === req.params.alias);

    if (index >= 0) 
    {                                                                                                                     
        response = code200;
        response.jugador = players[index];
    } 
    else 
    {
        response = codeError504;
    }
    res.send(response);
});

router.post('/players/:alias', function (req, res) {
    var paramAlias = req.params.alias || '';
    var paramName = req.body.name || '';
    var paramSurname = req.body.surname || '';
    var paramScore = req.body.score || '';

    if (paramAlias === '' || paramName === '' || paramSurname === '' || parseInt(paramScore) <= 0 || paramScore === '') {
        response = codeError502;
    } 
    else 
    {
        var index = players.findIndex(j => j.alias === paramAlias)

        if (index != -1) 
        {
            response = codeError503;
        } 
        else 
        {
            players.push({ 
                position: '', 
                alias: paramAlias, 
                name: paramName, 
                surname: paramSurname, 
                score: paramScore ,
                created: new Date()
            });
            UpdateRanking();
            index = players.findIndex(j => j.alias === paramAlias);
            response = code201;
            response.player = players[index];
        }
    }
    res.send(response);
});

router.put('/players/:alias', function (req, res) {
    var paramalias = req.params.alias || '';
    var paramname = req.body.name || '';
    var paramsurname = req.body.surname || '';
    var paramScore = req.body.score || '';

    if (paramalias === '' || paramname === '' || paramsurname === '' || parseInt(paramScore) <= 0 || paramScore === '') 
    {
        response = codeError502;
    } 
    else 
    {
        var index = players.findIndex(j => j.alias === paramalias)

        if (index != -1) 
        {
            players[index] = { 
                position: '', 
                alias: paramalias, 
                name: paramname, 
                surname: paramsurname, 
                score: paramScore,
                created:  players[index].created,
                updated: new Date()
            };
            UpdateRanking();
            index = players.findIndex(j => j.alias === paramalias);
            response = code202;
            response.jugador = players[index];
        } 
        else 
        {
            response = codeError504;
        }
    }

    router.delete('/players/:alias', function(req,res){
        var paramAlias = req.params.alias || '';
        if (paramAlias === '') 
        {
            response = codeError502;
        } 
        else
        {
            getjson();
            var index = players.findIndex(j => j.alias === paramAlias);
            var playerIndex = players.indexOf("Jugador");
            if (index != -1) 
            {
                console.log("The player "+ paramAlias+" has ben deleted");
                response = code203;
                players.splice(index, 1);
                UpdateRanking();
            }
            else 
            {
                response = codeError504;
            }
        }
        res.send(response);
    });
    router.get('/buycoins/:alias', function(req,res){
        var paramAlias = req.params.alias || '';
        var parambilletes = req.body.billetes || '';
        var moneywinned = 2;       
        var price = 1;
        if (paramAlias === '' || parambilletes === '') {
            response = codeErrorBuy402;
        }
        else{
            getjson();
            var index = players.findIndex(j => j.alias === paramAlias)
            if(players[index].billetes < 1)
            {
                response = codeErrorBuy403;
            }
            else
            {
                players[index].billetes -= precio;
                players[index].coins += ganancia;
                response = codeBuy401;
                response.jugador = players[index];
            }
        }
        res.send(response);
    });
    res.send(response);
});
module.exports = router;

/*module.exports.dataChecker = dataChecker;
module.exports.searcher = searcher;
module.exports.createPlayer = createPlayer;
module.exports.updatePlayer = updatePlayer;
module.exports.sendPlayer = sendPlayer;
module.exports.sendPlayers = sendPlayers;*/
