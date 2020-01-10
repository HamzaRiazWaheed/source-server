var gifTag = document.getElementById('gif-search-tag');
var getGif_buttons = document.getElementsByClassName('get-gif');
var searchedGifs = document.getElementById('searched-gifs');

for(var i=0; i < getGif_buttons.length; i++){
    getGif_buttons[i].addEventListener('click', function() {
        // get tag
        var tag = gifTag.value;
        if(!tag) {
           gifTag.focus();
           return;
        }

        var searchType = this.getAttribute('type');
        var url = `/giphy/${searchType}?q=${tag}`
        fetch(url).then(function(resp){
            return resp.json()
        }).then(function(resp){
            appendGif(resp);
        }).catch(function(e){
            console.log(e);
        })
    
    }, false)
}

function appendGif(gifs){
    searchedGifs.innerHTML = "";
    gifs.forEach(gif => {
        searchedGifs.innerHTML += `<img class="img-loading" src="${gif}"/>`;
    });
    /*gifs.forEach((gif, i) => {
        var img = new Image();
        img.src = gif;
        img.onload = function(){
            searchedGifs.replaceChild(img, i)
        }
        // searchedGifs.innerHTML += `<img class="img-loading" src=${gif}/>`;
    });*/
}
