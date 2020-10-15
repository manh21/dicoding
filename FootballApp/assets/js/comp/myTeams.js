import { addFavoriteTeam, removeFavoriteTeam, buildFavButton, getFavoriteTeams } from "./fav.js";

const myTeams = () => {
    let clubsContainer = document.querySelector('.clubs-container');

    function buildClubItem() {
        let html = [];

        getFavoriteTeams().then(res => {
            let favTeams = res;
            favTeams.forEach(data => {
                let image = data.crestUrl ? data.crestUrl : '/assets/images/noimage.webp';

                html.push(`<div class="club-item">`);
                // html.push(`<a data-id="${data.id}" >`);
                html.push(`<div class="card">`);
                html.push(`<div class="card-image">`);
                html.push(`<img class="teamLogo" src="${image}">`);
                html.push(`<button data-id="${data.id}" class="btn-floating halfway-fab btn-fav white waves-effect"><i class="fa fa-heart fa-red"></i></button>`);
                html.push(`</div>`);
                html.push(`<div class="card-content">`);
                html.push(`<span class="card-title text-bold center-align">${data.shortName}</span>`);
                html.push(`</div>`);
                html.push(`</div>`);
                // html.push(`</a>`);
                html.push(`</div>`);
            })

            clubsContainer.innerHTML = html.join('\n');
            favEventListener();

        }).catch(err => {
            console.error(err);
        });
        
        // console.log(data);
    }
    buildClubItem();

    /*
        FAVORITE Button Event Listener
    */
    function favEventListener() {
    document.querySelectorAll('button.btn-fav').forEach(elem => {
        elem.addEventListener('click', e => {
            let dataId = e.currentTarget.getAttribute('data-id');
            let parentClubItem = e.currentTarget.closest('.club-item');
            
            if(e.target.classList.contains('fa-red')){
                removeFavoriteTeam(dataId);
                e.target.classList.remove('fa-red');
                e.target.classList.add('fa-grey');
                parentClubItem.remove();
            } else {
                addFavoriteTeam(teamData, dataId);
                e.target.classList.remove('fa-grey');
                e.target.classList.add('fa-red');
            }
        });
    });
}
}

export default myTeams;