const express = require('express')
const path = require('path')
const bodyparser = require('body-parser');
const ENV = require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(bodyparser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ROUTE MODULES
let weather = require('./routes/weather/index');
app.use('/weather', weather);

//let giphy = require('./routes/giphy/index');
// app.use('/giphy', giphy);

/**
 * Get Items
 */
app.get('/api/test/', async (req, res) => {
    res.send('it Works!');
})





app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
