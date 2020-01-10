const express = require('express')
const router = express.Router();
const fetch = require('node-fetch');

// define the home page route
router.get('/', function (req, res) {
    const msg = `Get Giphs`
    res.send(msg)
});

// SEARCH GIPHS, MAX 25 results
router.get('/search', function (req, res) {
    
    let { q } = req.query;

    if(!q){
        res.sendStatus(400);
    }
    
    getGiphs('search',q).then(response => {
        let gifs = response.data.map((img) => {
            return img.images.downsized.url;
        })
        res.send(gifs)
    }).catch('error', (e) => {
        console.error(e);
        res.sendStatus(500);
    });

})

// Get Random Giph
router.get('/random', function (req, res) {
    let { q } = req.query;

    if(!q){
        res.sendStatus(400);
    }
    
    getGiphs('random',q).then(response => {
        let gifs = response.data.images.downsized.url;
        res.send([gifs])
    }).catch('error', (e) => {
        console.error(e);
        res.sendStatus(500);
    });

})

function getGiphs(type,searchString){
    let url = `${process.env.GIPHY_URL}&q=${searchString}`.replace('(TYPE)', type);
    return new Promise((res,rej) => {
        fetch(url).then(response => {
            res(response.json())
        }).catch(e => rej(e));
    })
}

module.exports = router