import "./components/moviebox-list.js"
import "./components/moviebox-item.js"
import swal from 'sweetalert';
import API from './data/discover.js';

const main = () => {

    const renderHome = () =>{
        const mainElement = document.querySelector('main');
        mainElement.innerHTML = 
        `
        <div class="container">
            <h1 class="mt-5">What Movie?</h1>
            <p class="lead">Disini anda bisa menemukan berbagai macam movie dan berbagai hal tentang movie itu.</p>
        </div>
        <div class="container">
            <moviebox-list id="trending" data-title="🔥 Hot Trending"></moviebox-list>
            <moviebox-list id="discover" data-title="Discover"></moviebox-list>
        </div>
        `;

        const trendingListElement = document.getElementById('trending');
        const discoverListElement = document.getElementById('discover');

        API.getTrending()
        .then((res) => {
            trendingListElement.movies = res.results;
        }).catch((e) => {
            if(e){
                swal("Error", e, "error");
            }
        })

        API.getMovieDiscover()
        .then(res => {
            discoverListElement.movies = res.results;
        }).catch((e) => {
            if(e){
                swal("Error", e, "error");
            }
        })
    }

    function renderSearchResult(keyword){
        let page = 1;
        const mainElement = document.querySelector('main');
        mainElement.innerHTML = 
        `
        <div class="container mb-5" id="search-wrapper">
            <moviebox-list id="searchResults" data-title="Search Results"></moviebox-list>
            <button id="loadMore" type="button" style="display: block;" class="btn btn-dark text-center mx-auto">Load More</button>
        </div>
        `;

        const resultListElement = document.querySelector('#searchResults');

        API.searchMovies(keyword, page)
        .then(res => {
            resultListElement.movies = res.results;
            page++;
        }).catch((e) => {
            if(e){
                swal("Error", e, "error");
            }
        })

        document.querySelector('#loadMore').addEventListener("click", function(){
            API.searchMovies(keyword, page++)
            .then(res => {
                resultListElement.addNewItem = res.results;
            }).catch((e) => {
                if(e){
                    swal("Error", e, "error");
                }
            })
        });
    }


    
    document.addEventListener("DOMContentLoaded", () => {
        const inputKeyword = document.querySelector('#inputKeyword');
        const searchButton = document.querySelector('#searchButton');
        const brandIdentity = document.querySelector('.navbar-brand');

        renderHome();

        searchButton.addEventListener("click", function(){
            const keyword = inputKeyword.value;
            if(keyword){
                renderSearchResult(keyword);
            } else {
                swal("Warning", "Fill search box first", "warning");
            }
        })

        brandIdentity.addEventListener("click", function(){
            renderHome();
        })
    

    });
}

export default main;