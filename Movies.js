//TMDB

const API_KEY = 'api_key=31fabc6002a15c88b97936bc6507517e';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_URL = BASE_URL + '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&' + API_KEY;

const API_URL_TOP = BASE_URL + '/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&' + API_KEY;

const API_URL_KID = BASE_URL + '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&'+API_KEY;

// const API_URL_DRAMA = BASE_URL +'/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&'+ API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const searchURL = BASE_URL + '/search/movie?'+ API_KEY;

const main = document.getElementById('main');

const form = document.getElementById("form");

const search = document.getElementById("myInput"); 

const genres =[ { "id": 28, "name": "Action" }, { "id":12, "name":"Adventure"}, { "id":16, "name":"Animation"}, { "id":35, "name":"Comedy"}, { "id":80, "name":"Crime"}, { "id":99, "name":"Documentary"}, { "id":18, "name":"Drama"}, { "id":10751, "name":"Family"}, { "id":14, "name":"Fantasy"}, { "id":36, "name":"History"}, { "id":27, "name":"Horror"}, { "id":10402, "name":"Music"}, { "id":9648, "name":"Mystery"}, { "id":10749, "name":"Romance"}, { "id":878, "name":"Science Fiction"}, { "id":10770, "name":"TV Movie"}, { "id":53, "name":"Thriller"}, { "id":10752, "name":"War"}, { "id":37, "name":"Western"}]

const tagsEl = document.getElementById('navitem');

const y = window.matchMedia('(max-width: 992px)');

const topRated = document.getElementById('Toprated');

const kid = document.getElementById('kid');

// const drama = document.getElementById('drama');

var selectedGenre = []

setGenre();
function setGenre(){
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('items');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () =>{
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
                if (y.matches){
                    if (t.style.display == 'none'){
                        tagsEl.style.display = "block";
                    }else{
                    tagsEl.style.display = "none";
                    }
                }
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }else{
                            selectedGenre.push(genre.id);
                        }
                    })
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })


}

function highlightSelection() {
   const tags= document.querySelectorAll('.items');
   tags.forEach(tag =>{
       tag.classList.remove('highlight');

   })
    if (selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('highlight');
        })
    }

}



getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);

    })
}

getTopMovies(API_URL_TOP);

function getTopMovies(topurl){
    fetch(topurl).then(res => res.json()).then(topRatedData => {
        console.log(topRatedData.results);
        showMoviesTop(topRatedData.results);

    })
}

// getDramas(API_URL_DRAMA);

// function getDramas(drama) {

//     fetch(drama).then(res => res.json()).then(dramaData => {
//         console.log(dramaData.results);
//         showDramas(dramaData.results);

//     })
// }

getKidMovies(API_URL_KID);

function getKidMovies(kidUrl) {

    fetch(kidUrl).then(res => res.json()).then(kidData => {
        console.log(kidData.results);
        showKidMovies(kidData.results);

    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
                            <img class="image" src="${IMG_URL+poster_path}">
                            <p class="p">${title}</p>
                            <div class="overlay">
                                <h2>${title}</h2>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
                                        class="imbd" /> 
                                <a><span class="span ${getColor(vote_average)}">${vote_average}</span></a>
                                <div>
                                    <h3 class="cast-h">Overview</h3>
                                    ${overview};
                                    
                                </div>

                            </div>
      
        
        `
        if (title.length < 30) {
            if (poster_path) {
                    main.appendChild(movieEl);
        }}
    })
}

// function showDramas(dramaData) {
//     drama.innerHTML = '';

//     dramaData.forEach(movie => {
//         const { title, poster_path, vote_average, overview } = movie;
//         const movieEl = document.createElement('div');
//         movieEl.classList.add('movie');
//         movieEl.innerHTML = `
//                             <img class="image" src="${IMG_URL + poster_path}">
//                             <p class="p">${title}</p>
//                             <div class="overlay">
//                                 <h2>${title}</h2>
//                                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
//                                         class="imbd" /> 
//                                 <a><span class="span ${getColor(vote_average)}">${vote_average}</span></a>
//                                 <div>
//                                     <h3 class="cast-h">Overview</h3>
//                                     ${overview};
                                    
//                                 </div>

//                             </div>
      
        
//         `
//         if (title.length < 30) {
//             if (poster_path){
//                 drama.appendChild(movieEl);

//             }
//         }
//     })
// }


function showKidMovies(kidData) {
    kid.innerHTML = '';

    kidData.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const kidEl = document.createElement('div');
        kidEl.classList.add('movie');
        kidEl.innerHTML = `
                            <img class="image"
                            src="${IMG_URL+poster_path}" />
                        <p class="p">${title}</p>
                        <div class="overlay">
                            <h2>${title}</h2>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
                                    class="imbd" /> 
                                    <a><span class="span ${getColor(vote_average)}">${vote_average}</span></a>
                            <div>
                                <h3 class="cast-h">Overview</h3>
                                ${overview};
                            </div>
                        </div>
      
        
        `
        if (title.length <= 35){
            if (poster_path) {
                kid.appendChild(kidEl);
        }}
        
    })
}
function showMoviesTop(topRatedData) {
    topRated.innerHTML = '';

    topRatedData.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        if(poster_path){
        const topRatedEl = document.createElement('div');
        topRatedEl.classList.add('movie');
        topRatedEl.innerHTML = `
                    <img class="image"
                            src="${IMG_URL + poster_path}" />
                        <p class="p">${title}</p>
                        <div class="overlay">
                            <h2>${title}</h2>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
                                    class="imbd" /> 
                                    <a><span class="span ${getColor(vote_average)}" >${vote_average}</span></a>
                            <div>
                                <h3 class="cast-h">Overview</h3>
                                ${overview};

                            </div>
                        </div>
        
        `
            topRated.appendChild(topRatedEl);
        }
    else{
        return
    }
    })
}


form.addEventListener('submit', (e) =>{

    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }
})

function getColor(vote){
    if (vote >=7.5){
        return 'green';
    }else if(vote >=5){
        return 'orange';
    }else{
        return 'red'
    }
}


function Button(y) {
    y = window.matchMedia('(max-width: 992px)');
    s = window.matchMedia('min-width: 993px');
    var x = document.getElementById('navitem');
    if (y.matches) {
        if (x.style.display == 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
    }

}

// search.addEventListener("click", () => inputBox.classList.add("open"));


// const searchFun = () => {
//     let filter = document.getElementById('myInput').value.toUpperCase();

//     let mydata = document.getElementById('data');

//     let cards = mydata.getElementsByClassName('box');


//     for (var i = 0; i < cards.length; i++) {
//         let p = cards[i].getElementsByTagName('p')[0];

//         if (p) {

//             let textvalue = p.textContent || p.innerHTML;

//             if (textvalue.toUpperCase().indexOf(filter) > -1) {
//                 cards[i].style.display = "";

//             } else {
//                 cards[i].style.display = "none";
//             }

//         }
//     }
// }
