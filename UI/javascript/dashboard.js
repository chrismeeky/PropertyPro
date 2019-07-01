/*when the update button is clicked, the user should 
be taken to "View Property" page*/
const updatePostIcon = document.querySelector('.update-icon-wrapper');
updatePostIcon.addEventListener('click', () => {
  location.href = 'update_property.html';
});
/*when the checkbox is checked, set the div wrapping 
it to a background color*/
const options = document.querySelector('#post-options-hidden');
const showOptions = ({ target }) => {

  options.setAttribute('id', 'post-options-show');
  if (target.checked == 1)
    target.parentElement.parentElement.style.backgroundColor = 'rgb(129, 129, 129)';
  else {
    target.parentElement.parentElement.style.backgroundColor = 'rgba(219, 220, 226, 0.37)';
  }
};
//Add a shopOptions callback to the checkbox listener event
const checkButtons = document.querySelectorAll('input');
checkButtons.forEach(checkbox => {
  checkbox.addEventListener('change', showOptions);
});

//Make the header's position sticky
const header = document.querySelector('header');
const menuIcon = document.querySelector('.icon');
stickyFrom = header.offsetTop;

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



let status = false;
// make the menu a dropdown list when the screen size becomes small
// Also make the sticky option div disappear when the dropdown list is pulled
const responsiveNav = () => {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";

    if (options.id == 'post-options-show') {
      options.setAttribute('id', 'post-options-hidden');
      status = true;
    }
  } else {
    x.className = "topnav";
    if (status) {
      options.setAttribute('id', 'post-options-show');
      status = false;
    }
  }
}
menuIcon.addEventListener('click', responsiveNav);