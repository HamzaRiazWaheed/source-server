const express = require('express')
const router = express.Router();
const path = require('path');

const helper = require('./helper');

// define the home page route
router.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../../public', 'pages', 'tmdb', 'index.html'));
});

// SEARCH GIPHS, MAX 25 results
router.get('/search', function (req, res) {
    const allowedSearchQuery = ['person', 'tv', 'movie'];
    let { q, what } = req.query;

    if(!q || allowedSearchQuery.indexOf(what) < 0){
        res.sendStatus(400);
    }
    helper.getFromTMDB('search',what, q).then(response => {
        let list = [];
        if(what == 'person'){
            list = response.results.map(r => {
                return {
                "name": r.name,
                "id": r.id,
                "image": process.env.TMDB_POSTER + r.profile_path,
                "gender": (r.gender == 1 ? 'female' : 'male'),
                "work": r.known_for.map((w) => {
                        const item = {
                            "votes": w.vote_count,
                            "id": w.id,
                            "poster": process.env.TMDB_POSTER + w.poster_path,
                            "language": w.original_language,
                            "title": w.original_title,
                            "genre": w.genre_ids.map((g) => {
                                return helper.genresList[g];
                            }),
                            "rating": w.vote_average,
                            "overview": w.overview,
                            "release_date": w.release_date
                        }
                        return item;
                    })
                }
            })
        }
        else {
            list = response.results.map((r) => {
                const item = {
                    "votes": r.vote_count,
                    "id": r.id,
                    "poster": process.env.TMDB_POSTER + r.poster_path,
                    "language": r.original_language,
                    "title": r.original_title,
                    "genre": (function(){
                        return r.genre_ids.map((g) => {
                            return helper.genresList[g];
                        })
                    })(),
                    "rating": r.vote_average,
                    "overview": r.overview,
                    "release_date": r.release_date
                }
                return item;
            })
        } 
        
        res.send(list)

    }).catch('error', (e) => {
        console.error(e);
        res.sendStatus(500);
    });

})

module.exports = router