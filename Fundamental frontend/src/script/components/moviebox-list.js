import "./moviebox-item";

class MovieBoxList extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
    }

    get title(){
        return this.getAttribute("data-title");
    }

    get lastItem() {
        return this.shadow.querySelector(".body-movie-list > moviebox-item:last-child");
    }

    set title(val){
        if(val) {
            this.setAttribute('data-title', val);
        } else {
            this.removeAttribute('data-title');
        }
    }

    set movies(movies) {
        this._movies = movies;
        this.render();
    }

    set addNewItem(item){
        this._newItem = item;
        this.addItem();
    }

    addItem(){
        const bodyMovieList = this.shadow.querySelector(".body-movie-list");
        this._newItem.forEach( res => {
            const MovieBoxItem = document.createElement("moviebox-item");
            MovieBoxItem.movie = res;
            bodyMovieList.appendChild(MovieBoxItem);
        });
    }

    render(){
        this.shadow.innerHTML = 
        `

        <Style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        .movie-list-wrap{
            background: #eee;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            margin-bottom: 20px;
            box-shadow: 1px 3px 8px rgba(49,49,49,.1);
            overflow: hidden;
        }
        
        .head-movie-list{
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            border-bottom: 1px solid #ececec;
            padding: 8px 15px;
            background: black;
        }
        
        .head-movie-list h3{
            font-size: 1.1em;
            line-height: 20px;
            font-weight: bolder;
            margin: 0;
            position: relative;
            color: white;
        }
        
        .head-movie-list{
            background-color: #223a65;
        }

        .body-movie-list{
            padding: 10px;
            overflow: hidden;
        }        
        </Style>


        <div class="movie-list-wrap">
            <div class="head-movie-list">
                <h3>${this.title}</h3>
            </div>
            <div class="body-movie-list">
                
            </div>
        </div>
        `;

        const bodyMovieList = this.shadow.querySelector(".body-movie-list");
        this._movies.forEach( res => {
            const MovieBoxItem = document.createElement("moviebox-item");
            MovieBoxItem.movie = res;
            bodyMovieList.appendChild(MovieBoxItem);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        if(this._movies){
            this.render();
        }
    }

    static get observedAttributes() {
        return ["data-title"];
    }
}

customElements.define('moviebox-list', MovieBoxList);