$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(e) {
        if (this.hash !== "") {
            // Menonaktifkan default behaviour
            e.preventDefault();
            
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 2000, function(){
                window.location.hash = hash;
            });
        } // End if
    });

});

// Handle mobile navigation
function navMobile() {
    // Get Mobile Nav Element
    const mobile = document.getElementById("nav-mobile");
    // Get Desktop Nav Element
    const desktop = document.getElementById("des-nav");
    if (mobile.style.display === "block") {
        mobile.style.display = "none";
        desktop.style.display = "block";
    } else {
        mobile.style.display = "block";
        desktop.style.display = "none";s
    }
}

