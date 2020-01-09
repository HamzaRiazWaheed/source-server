const express = require('express')
const router = express.Router();
const fetch = require('node-fetch');

// define the home page route
router.get('/', function (req, res) {
    const msg = `Get Weather Data`
    res.send(msg)
});

// define the about route
router.get('/currentweather', function (req, res) {
    let {
        cords,
        city
    } = req.query;

    let url = `${process.env.OPENWEATHER_URL}&units=metric`;
    
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
            console.log(response);
            res.send(response)
        }).catch('error', (e) => {
            console.error(e);
            res.sendStatus(500);
        });
})

module.exports = router