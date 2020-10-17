import API from "../data/api.js";
import { showLoading, removeLoading } from "./utilities.js";

const BASE_URL = window.location.origin;
let requestOptions = {
    method: 'GET',
    mode: 'same-origin',
    redirect: 'follow',
    // include credentials to apply cookies from browser window
    credentials: 'same-origin', // 'include',
    headers: new Headers()
};
requestOptions.headers.set('accept', 'image/webp,image/apng,image/*,*/*');
const BodyContent = document.querySelector(".body-content");
let dataPertandingan = null;

function Jadwal(id = 81) {
    loadPage();

    function loadPage() {
        const uri = new URL('/pages/jadwal.html', BASE_URL);
        const request = new Request(uri, requestOptions);
        
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
            buildJadwal();
        }).catch(err => {
            console.error(err);
        })
    }

    function buildJadwal() {
        // showLoading(document.querySelector('.matchList'));
        let html = [];

        function utcToLocal(utcdateTime, tz) {
            var zone = moment.tz(tz).format("Z") // Actual zone value e:g +5:30
            var zoneValue = zone.replace(/[^0-9: ]/g, "") // Zone value without + - chars
            var operator = zone && zone.split("") && zone.split("")[0] === "-" ? "-" : "+" // operator for addition subtraction
            var localDateTime
            var hours = zoneValue.split(":")[0]
            var minutes = zoneValue.split(":")[1]
            if (operator === "-") {
                localDateTime = moment(utcdateTime).subtract(hours, "hours").subtract(minutes, "minutes").format("YYYY-MM-DD HH:mm:ss")
            } else if (operator) {
                localDateTime = moment(utcdateTime).add(hours, "hours").add(minutes, "minutes").format("YYYY-MM-DD HH:mm:ss")
            } else {
                localDateTime = "Invalid Timezone Operator"
            }
            console.log(localDateTime);
            return localDateTime
        }

        utcToLocal('2020-10-17T19:00:00Z', 'Asia/Jakarta')

        API.getJadwalPertandigan(id).then(res => {

            dataPertandingan = res;
            
            console.log(dataPertandingan);

        }).catch(err => {
            console.error(err);
        });
    }

};

export default Jadwal;