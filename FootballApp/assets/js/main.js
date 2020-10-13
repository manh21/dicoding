import { Home } from './comp/home.js';

document.addEventListener('DOMContentLoaded', function() {
    const BASE_URL = window.location.origin;
    const BodyContent = document.querySelector(".body-content");
    const SideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(SideNav);
    
    let page = window.location.hash.substr(1);
    (page == '') ? page = 'home' : page = page;
    let requestOptions = {
        method: 'GET',
        mode: 'same-origin',
        redirect: 'follow',
        // include credentials to apply cookies from browser window
        credentials: 'same-origin', // 'include',
        headers: new Headers()
    };
    requestOptions.headers.set('accept', 'image/webp,image/apng,image/*,*/*');

    // Initialize
    loadNavigation();
    loadPage(page);


    function loadNavigation() {
        const URI = new URL('/nav.html', BASE_URL);
        let request = new Request(URI, requestOptions);

        fetch(request).then(res => res.text())
        .then(res => {
            document.querySelectorAll('.topnav, .sidenav').forEach(el => {
                el.innerHTML = res;
            });
            // Initialize NavLink Listener
            Home();
        })
        .catch(err => {
            console.error(err);
        });
    }

    function listenNavLink() {
        document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm){
            elm.addEventListener('click', function(event){
                // Tutup sidenav
                let sidenav = document.querySelector('.sidenav');
                M.Sidenav.getInstance(sidenav).close();
                
                // Muat konten halaman yang dipanggil 
                pageLink = event.target.getAttribute('href').substr(1);
                loadPage(pageLink);
            });
        });
    }

    function loadPage(page) {
        const URI = new URL('/pages/' + page + '.html', BASE_URL);
        const request = new Request(URI, requestOptions);
        
        fetch(request).then(res => {
            if (!res.ok) {
                if(res.status == 404){
                    let html = [];
                    html.push(`<div class="valign-wrapper">`);
                    html.push(`<h5 class="center-align">Halaman tidak ditemukan</h5>`);
                    html.push(`</div>`);
                    BodyContent.innerHTML = html.join('\n');
                } else {
                    BodyContent.innerHTML = `<p>Ups... halaman tidak dapat diakses.</p>`;
                }
                throw Error(res.statusText);
            }
            return res.text();
        })
        .then(res => {
            BodyContent.innerHTML = res;
            if(page == "home" || page == "characterlist"){
                listenCharacter();
            }
        })
        .catch(err => {
            console.error(err);
            // BodyContent.innerHTML = `<p>Ups... halaman tidak dapat diakses.</p>`;
        });
    }

    function listenCharacter() {
        document.querySelectorAll(".charLink").forEach(elm => {
            elm.addEventListener('click', e => {
                const anchor = e.target.closest("a");
                if (!anchor) return; 
                charLink = anchor.getAttribute("href").substr(1);
                charId = anchor.getAttribute("data-id")
                loadCharacterPage(charLink, charId);
            });
        });
    }

    function loadCharacterPage(charLink, charId) {
        const URI = new URL('/pages/' + charLink + '.html', BASE_URL);
        const request = new Request(URI, requestOptions);

        fetch(request).then(res => {
            if (!res.ok) {
                if(res.status == 404){
                    let html = [];
                    html.push(`<div class="valign-wrapper">`);
                    html.push(`<h5 class="center-align">Halaman tidak ditemukan</h5>`);
                    html.push(`</div>`);
                    BodyContent.innerHTML = html.join('\n');
                } else {
                    BodyContent.innerHTML = `<p>Ups... halaman tidak dapat diakses.</p>`;
                }
                throw Error(res.statusText);
            }
            return res.text();
        }).then(res => {
            BodyContent.innerHTML = res;
            getCharacterData(charId).then(res => {
                // Add avatar image
                document.querySelector('.avatar').src = BASE_URL + res['image'];

                // add bio
                let bio = createCharView(res);
                document.querySelector('.bio-content').innerHTML = bio;
            }).catch(err => {
                console.error(err);
            });
        }).catch(err => {
            console.error(err);
        });
    }

    // Return Character Bio and Stats
    // Simulate API Requset for data
    function getCharacterData(id) {
        const URI = new URL('/character.json', BASE_URL);
        const requset = new Request(URI, requestOptions);
        
        return fetch(requset).then(res => res.json())
        .then(res => {
            return res.find(d => d.id == id);
        })
    }
	
	// Create character bio and stats
	// Return Bio html data
	function createCharView(data){
        let titles = '';
        let stars = ``;
		for(let i = 0; i < data['titles'].length; i++){
            if(data['titles'][i+1]){
                titles += data['titles'][i] + ', ';
            } else {
                titles += data['titles'][i];
            }
		}
        
        for(let i = 0; i < parseInt(data['rarity']); i++){
            stars += `<i class="fa fa-star"></i>`       
        }
		
		let html = [];
		
		html.push(`<div class="col s12 m6">`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Name:</div>`);
		html.push(`<div class="data-value">${data['name']}</div>`);
		html.push(`</div>`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Sex:</div>`);
		html.push(`<div class="data-value">${data['sex']}</div>`);
		html.push(`</div>`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Bithday:</div>`);
		html.push(`<div class="data-value">${data['birthday']}</div>`);
		html.push(`</div>`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Constellation:</div>`);
		html.push(`<div class="data-value">${data['constellation']}</div>`);
		html.push(`</div>`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Region:</div>`);
		html.push(`<div class="data-value">${data['region']}</div>`);
		html.push(`</div>`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Affiliation:</div>`);
		html.push(`<div class="data-value">${data['affiliation']}</div>`);
		html.push(`</div>`);
		html.push(`</div>`);
		html.push(`<div class="col s12 m6">`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Vision:</div>`);
		html.push(`<div class="data-value">${data['vision']}</div>`);
		html.push(`</div>`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Weapon:</div>`);
		html.push(`<div class="data-value">${data['weapon']}</div>`);
		html.push(`</div>`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Rarity:</div>`);
		html.push(`<div class="data-value">${stars}</div>`);
		html.push(`</div>`);
		html.push(`<div class="item">`);
		html.push(`<div class="data-label">Titles:</div>`);
		html.push(`<div class="data-value">${titles}</div>`);
		html.push(`</div>`);
		html.push(`</div>`);
		
		return html.join('\n');
	};
});