const express = require('express')
const router = express.Router();
const fetch = require('node-fetch');

// define the home page route
router.get('/', function (req, res) {
    const msg = `Get Weather Data`
    res.send(msg)
});

// weather/currentweather
router.get('/currentweather', function (req, res) {
    let {
        cords,
        city
    } = req.query;

    let url = process.env.OPENWEATHER_URL.replace('TYPE', 'weather');
    
    if (cords) {
        cords = cords.split(',');
        url += '&lat=' + cords[0] + '&lon=' + cords[1];
    }else if(city){
        url += '&q=' + city;
    }else {
        res.send('Paramters Missing: cords=lat,lon&city=london,uk');
    }
    fetch(url).then(response => {
            return response.json()
        }).then(response => {
            res.send(response)
        }).catch('error', (e) => {
            console.error(e);
            res.sendStatus(500);
        });
})

// weather/forcast
router.get('/forecast', function (req, res) {
    let {
        cords,
        city
    } = req.query;

    let url = process.env.OPENWEATHER_URL.replace('TYPE', 'forecast');
    
    if (cords) {
        cords = cords.split(',');
        url += '&lat=' + cords[0] + '&lon=' + cords[1];
    }else if(city){
        url += '&q=' + city;
    }else {
        res.send('Paramters Missing: cords=lat,lon&city=london,uk');
    }
    fetch(url).then(response => {
            return response.json()
        }).then(response => {
            res.send(response)
        }).catch('error', (e) => {
            console.error(e);
            res.sendStatus(500);
        });
})
module.exports = router