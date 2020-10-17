/* 
    SHOW LOADING
    @params: elementNode
*/
export function showLoading(el) {
    // console.log(el);
    let html = ``;

    html += `<div class="center-align mx"><img src="assets/images/loading.svg"></div>`;

    el.innerHTML = html;
}

/* 
    REMOVE LOADING
    @params: elementNode
*/
export function removeLoading(el) {
    el.innerHTML = '';
}


export function utcToLocal(utcdateTime, tz) {
    moment.locale('id');
    var zone = moment.tz(tz).format("Z") // Actual zone value e:g +5:30
    var zoneValue = zone.replace(/[^0-9: ]/g, "") // Zone value without + - chars
    var operator = zone && zone.split("") && zone.split("")[0] === "-" ? "-" : "+" // operator for addition subtraction
    var localDateTime
    var hours = zoneValue.split(":")[0]
    var minutes = zoneValue.split(":")[1]
    if (operator === "-") {
        localDateTime = moment(utcdateTime).subtract(hours, "hours").subtract(minutes, "minutes").format('LL')
    } else if (operator) {
        localDateTime = moment(utcdateTime).add(hours, "hours").add(minutes, "minutes").format('LL')
    } else {
        localDateTime = "Invalid Timezone Operator"
    }
    return localDateTime
}