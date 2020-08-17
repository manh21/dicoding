const baseUrl = "https://image.tmdb.org/t/p/w154"

class MovieBoxItem extends HTMLElement {   
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
    } 
    set movie(movie){
        this._movie = movie;
        this.render();
    }

    render(){
        this.shadow.innerHTML = 
        `
        <style>
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            :host{
                float: left;
                width: 20%;
            }
            
            .movie-item-wrap{
                overflow: hidden;
                margin: 7px;
                margin-bottom: 15px;
                transition: all .2s;
                -webkit-transition: all .2s;
                position: relative;
            }
            
            .movie-item-wrap a{
                color: #333;
                text-decoration: none;
                transition: color .1s linear;
                -moz-transition: color .1s linear;
                -webkit-transition: color .1s linear;
            }
            
            .movie-item-wrap a img {
                width: 100%;
                height: auto;
                min-height: 120px;
                top: 0;
                position: absolute;
            }
            
            .movie-item-wrap a .item-poster{
                padding: 142% 0 0;
                position: relative;
                overflow: hidden;
                background: #333;
                border-radius: 3px;
            }
            
            .movie-item-wrap .title{
                /* background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%); */
                background: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.6) 30%,rgba(0,0,0,.8) 60%,rgba(0,0,0,.7) 100%);
                bottom: 0;
                left: 0;
                height: auto;
                padding: 10px;
                position: absolute;
                width: 100%;
            }
            
            .movie-item-wrap .title h2{
                color: #fff;
                font-size: small;
                font-weight: 500;
                margin: 0;
                text-align: center;
                text-shadow: 0 0 2px rgba(0,0,0,.6)
            }
            
            .movie-item-wrap .rating-tahun{
                position: absolute;
                left: -1px;
                top: -1px;
                z-index: 1;
            }
            
            .movie-item-wrap .rating-tahun .rating{
                border-radius: 0;
                color: #ebebeb;
                background: rgba(39,59,89,.7);
                font-size: 12px;
                font-weight: 600;
                height: 24px;
                line-height: normal;
                padding: 4px 2px 4px 4px;
                text-align: left;
                float: left;
                display: inline-block;
            }
            
            .movie-item-wrap .rating-tahun .tahun{
                border-radius: 0;
                color: #ebebeb;
                background: rgba(39,59,89,.7);
                font-size: 12px;
                font-weight: 600;
                height: 24px;
                line-height: normal;
                padding: 4px 2px 4px 4px;
                text-align: left;
                float: left;
                display: inline-block;
            }
            
            .rating .star{
                color: gold;
            }

            @media only screen and (max-width: 570px) {
                :host{
                    float: left;
                    width: 33.333333%;;
                }
            }
            @media only screen and (max-width: 450px) {
                :host{
                    float: left;
                    width: 50%;;
                }
            }
        </style>
        `;

        this.shadow.innerHTML += 
        `
            <div class="movie-item-wrap">
                <a href="https://www.themoviedb.org/movie/${this._movie.id}" target="_blank" title="${this._movie.title}">
                    <div class="item-poster">
                        <div class="rating-tahun">
                            <span class="rating"><span class="star">★</span> ${this._movie.vote_average}</span>
                            <span class="tahun"><span class="calender">📅</span> ${this._movie.release_date.substring(0,4)}</span>
                        </div>
                        <img src="${baseUrl}${this._movie.poster_path}" alt="${this._movie.title}" itemprop="image" title="${this._movie.title}" width="154" height="231">
                        <div class="title">
                            <h2>${this._movie.title}</h2>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }
}

customElements.define("moviebox-item", MovieBoxItem);