import { removeFavoriteTeam, getFavoriteTeams } from './fav.js';
import { showLoading } from './utilities.js';
import Jadwal from './jadwal.js';

const myTeams = () => {
	const clubsContainer = document.querySelector('.clubs-container');

	function buildClubItem () {
		showLoading(clubsContainer);
		const html = [];

		getFavoriteTeams().then(res => {
			const favTeams = res;
			if (res.length > 0) {
				favTeams.forEach(data => {
					const image = data.crestUrl ? data.crestUrl : '/assets/images/noimage.webp';

					html.push('<div class="club-item">');
					html.push('<div class="card">');
					html.push('<div class="card-image">');
					html.push(`<img class="teamLogo" src="${image}">`);
					html.push(`<button data-id="${data.id}" class="btn-floating halfway-fab btn-fav white waves-effect"><i class="fa fa-heart fa-red"></i></button>`);
					html.push('</div>');
					html.push('<div class="card-content">');
					html.push(`<span class="card-title text-bold center-align">${data.shortName}</span>`);
					html.push('</div>');
					html.push('<div class="card-action center-align">');
					html.push(`<a class="waves-effect purple darken-1 waves-light btn more-info" data-id="${data.id}">More Info</a>`);
					html.push('</div>');
					html.push('</div>');
					html.push('</div>');
				});

				clubsContainer.innerHTML = html.join('\n');
				favEventListener();
				infoEventListener();
			} else {
				const html = [];
				html.push('<div class="valign-wrapper">');
				html.push('<h5 class="center-align">Tidak ada data team favorite</h5>');
				html.push('</div>');
				clubsContainer.innerHTML = html.join('\n');
			}
		}).catch(err => {
			console.error(err);

			// Display Somthing
			const html = [];
			html.push('<div class="valign-wrapper">');
			html.push('<h5 class="center-align">Tidak ada data team fvorite</h5>');
			html.push('</div>');
			clubsContainer.innerHTML = html.join('\n');
		});

		// console.log(data);
	}
	buildClubItem();

	/*
        FAVORITE Button Event Listener
    */
	function favEventListener () {
		document.querySelectorAll('button.btn-fav').forEach(elem => {
			elem.addEventListener('click', e => {
				const dataId = e.currentTarget.getAttribute('data-id');
				const parentClubItem = e.currentTarget.closest('.club-item');

				if (e.target.classList.contains('fa-red')) {
					removeFavoriteTeam(dataId);
					e.target.classList.remove('fa-red');
					e.target.classList.add('fa-grey');
					parentClubItem.remove();
				}
			});
		});
	}

	/*
        MORE INFO Button Event Listener
    */
	function infoEventListener () {
		document.querySelectorAll('a.more-info').forEach(elem => {
			elem.addEventListener('click', e => {
				const dataId = e.currentTarget.getAttribute('data-id');
				console.log(dataId);
				Jadwal(dataId);
			});
		});
	}
};

export default myTeams;
