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