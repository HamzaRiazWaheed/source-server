var search_input = document.getElementById('movies-search-box');
var search_buttons = document.getElementsByClassName('get-movies');
var display_box = document.getElementById('searched-result-box');

for(var i=0; i < search_buttons.length; i++){
    search_buttons[i].addEventListener('click', function() {
        // get tag
        var tag = search_input.value;
        if(!tag) {
            search_input.focus();
           return;
        }

        var searchType = this.getAttribute('type');
        var url = `/movies/search?what=${searchType}&q=${tag}`
        fetch(url).then(function(resp){
            return resp.json()
        }).then(function(resp){
            console.log(resp)
            display_box.innerHTML = "";
            appendResponse(resp, searchType)
            
        }).catch(function(e){
            console.log(e);
        })
    
    }, false)
}

function appendResponse(result, type){
    if(type == "person"){
        result.forEach(r => {
            display_box.innerHTML += `
            <div class="wrap-person">
                <div class="person-box">
                    <img src="${r.image}" class="person-image">
                    <div class="name-overlay person-name">
                        ${r.name}
                    </div>
                </div>
                ${ appendMovies(r.work, type) }
            </div>
            `
                        
        })
       
    }else {
        display_box.innerHTML += appendMovies(result,type)
    }
}

function appendMovies(result, type){
    let html = "";
    result.forEach(data => {
        /*display_box.innerHTML += `
            <div class="movie-box">
                <div class="left">
                    <img src="${r.poster}" class="poster" >
                </div>
                <div class="right">
                    <div class="title">${r.title}</div>
                    <div class="genres"> ${r.genre.toString()}</div>
                    <div class="ratings">
                        <span class="rating-box">${r.rating}</span>
                        <span class="votes">${r.votes} votes</span>
                    </div>
                    <div class="overview">
                        ${  r.overview.length > 150 ? (r.overview.substr(0,150)) + '...' : r.overview }
                    </div>
                    <div class="releas-date"><span class="label">Release date</span><span class="value">${r.release_date}</span></div>
                </div>
            </div>`;*/
            html += `
                <div class="movie-big-box ${type}">
                    <img src="${ data.poster ? data.poster : ""}" class="big-poster">
                    <div class="overlay">
                        <div class="title">${data.title}</div>
                        <div class="genres"> ${data.genre.toString()}</div>
                        <div class="ratings">
                            Rating: <span class="rating-box">${data.rating}</span> - <span class="votes">${data.votes} votes</span>
                        </div>
                        <div class="overview">
                            ${  data.overview.length > 300 ? (data.overview.substr(0,300)) + '...' : data.overview }
                        </div>
                        <div class="releas-date">Release date: ${data.release_date}</div>
                    </div>
                </div> 
            `
    });
    console.log('runnn')
    return html;
    /*gifs.forEach((gif, i) => {
        var img = new Image();
        img.src = gif;
        img.onload = function(){
            searchedGifs.replaceChild(img, i)
        }
        // searchedGifs.innerHTML += `<img class="img-loading" src=${gif}/>`;
    });*/
}
