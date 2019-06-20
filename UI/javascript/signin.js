const header = document.querySelector('header');
const menuIcon = document.querySelector('.icon');
const recoverPassButton = document.querySelector('.recover-password');
const recoveryDiv = document.querySelector('.hide');
stickyFrom = header.offsetTop;
recoverPassButton.addEventListener('click' ,() =>{
    recoveryDiv.setAttribute('class' ,'show');
});

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
// make the menu a dropdown list when the screen size becomes small
const responsiveNav = () => {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
menuIcon.addEventListener('click' ,responsiveNav);