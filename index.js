const express = require('express')
const path = require('path')
const bodyparser = require('body-parser');
const ENV = require('dotenv').config();

const PORT = process.env.PORT;

const publicFolder = path.join(__dirname, 'public');
const pagesFolder = path.join(__dirname, 'public', 'pages');

const app = express();

// SET STATIC RESOURCES
app.use(express.static(publicFolder))
app.use(express.static(pagesFolder))

// MIDDLEWARES
app.use(bodyparser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// define the home page route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'main', 'index.html'));
});

// TEST ROUTE
app.get('/api/test/', async (req, res) => {
    res.send('it Works!');
})

// ROUTE MODULES
let weather = require('./routes/weather/index');
app.use('/weather', weather);

let giphy = require('./routes/giphy/index');
app.use('/giphy', giphy);



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
