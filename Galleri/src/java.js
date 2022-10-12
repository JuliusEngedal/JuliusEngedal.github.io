/* === Nav start === */

function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

/* Sticky */

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


/* === Nav slut === */
