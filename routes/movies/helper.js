const fetch = require('node-fetch');

const genresList =  { 
    '12': 'Adventure',
    '14': 'Fantasy',
    '16': 'Animation',
    '18': 'Drama',
    '27': 'Horror',
    '28': 'Action',
    '35': 'Comedy',
    '36': 'History',
    '37': 'Western',
    '53': 'Thriller',
    '80': 'Crime',
    '99': 'Documentary',
    '878': 'Science Fiction',
    '9648': 'Mystery',
    '10402': 'Music',
    '10749': 'Romance',
    '10751': 'Family',
    '10752': 'War',
    '10770': 'TV Movie' 
}

function queryBuilder( type, path, query ){
    return `${process.env.TMDB_URL}/${type}/${path}?api_key=${process.env.TMDB_API}&language=en-US&query=${query}&page=1&include_adult=false`;
}

function getFromTMDB(type,path, query){
    let url = queryBuilder(type,path,query);
    return new Promise((res,rej) => {
        fetch(url).then(response => {
            res(response.json())
        }).catch(e => rej(e));
    })
}

module.exports = {
    genresList,
    getFromTMDB
}