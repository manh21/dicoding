import './club-item.js';

class ClubList extends HTMLElement {
    constructor(){
		super();
		this._shadowRoot = this.attachShadow({mode: "open"});
    }
    
    set clubs(clubs){
        this._clubs = clubs;
        this.render();
    }

    render(){
        this._shadowRoot.innerHTML = "";
        this._clubs.forEach(data => {
            const clubItemElement = document.createElement('club-item')
            // memanggil fungsi setter club() pada club-item.
            clubItemElement.club = data;
            this._shadowRoot.appendChild(clubItemElement);
        });
    }

    renderError(message) {
        this._shadowRoot.innerHTML = "";
        this._shadowRoot.innerHTML += 
        `
            <style>
                .placeholder {
                    font-weight: lighter;
                    color: rgba(0,0,0,0.5);
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            </style>
            <h2 class="placeholder">${message}</h2>
        `;
    }
}

customElements.define('club-list', ClubList);