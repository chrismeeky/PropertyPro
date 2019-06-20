//Show the report form when the report button is clicked
const reportButton = document.querySelector('.report-ad');
const reportForm = document.querySelector('.report-form');
reportButton.addEventListener('click' ,() =>{
reportForm.setAttribute('class' ,'report-form form-show');
});

//initialize menu elements
const header = document.querySelector('header');
const menuIcon = document.querySelector('.icon');
stickyFrom = header.offsetTop;

// make the header menu stuck at the top 
const makeSticky = () => {
  //add a sticky class when the page scrolls beyond the header
  if (window.pageYOffset > stickyFrom) {
    header.classList.add("sticky");
  }
  else {
    header.classList.remove("sticky");
  }
}
// call makeSticky function when the window scrolls
window.onscroll = () => {
  makeSticky();
}


// make the menu a dropdown button when the screen size becomes small
const responsiveNav = () => {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
menuIcon.addEventListener('click' ,responsiveNav);

