const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";



const insertElement = document.querySelector('main');

//Initially this function will hit.
getMovies(APIURL);
async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();

    showMovies(data.results);

    console.log(data);
}


function showMovies(movies) {
    document.querySelector('main').innerHTML = ''
    movies.forEach((element) => {
        const image = IMGPATH + element.backdrop_path

        const mainElement = document.createElement('div');
        mainElement.classList.add('movie');

        mainElement.innerHTML = `
            <img src="${image} alt="${element.title}"">
            <div class="movie-info">
                <div class="text-container">
                    <p>${element.title}</p >
                </div>
                <span class="${ratingColor(element.vote_average)}">${element.vote_average.toFixed(2)}<span><i class="fas fa-star" style="color: gold;"></i>
                </span></span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${element.overview}
            </div>
        `
        insertElement.appendChild(mainElement)
    });
}


function ratingColor(vote) {
    if (vote >= 8)
        return 'green'
    else if (vote >= 5 && vote <8)
        return 'orange'
    else
        return 'red'
}


const form = document.querySelector('.search-bar')

const input = document.getElementById('search')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputValue = input.value;
    if (inputValue) {
        getMovies(SEARCHAPI + inputValue.toLowerCase())
        console.log(69);
        input.value = ''
    }
    console.log(typeof inputValue);
})