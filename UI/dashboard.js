const options = document.querySelector('#post-options-hidden');
const showOptions = ({target}) =>{
    
        options.setAttribute('id' ,'post-options-show');
        if(target.checked ==1)
        target.parentElement.parentElement.style.backgroundColor = 'rgb(129, 129, 129)';
        else{
            target.parentElement.parentElement.style.backgroundColor = 'rgba(219, 220, 226, 0.37)';
        }
};
const checkButtons = document.querySelectorAll('input');
checkButtons.forEach(checkbox =>{
    checkbox.addEventListener('change' ,showOptions);
});


const header = document.querySelector('header');
const menuIcon = document.querySelector('.icon');
stickyFrom = header.offsetTop;


window.onscroll =  () =>{
     myFunction ();
}

const myFunction = ()=> {
if (window.pageYOffset > stickyFrom) {
    header.classList.add("sticky");
}
else {
    header.classList.remove("sticky");
}
}

let status = false;

const responsiveNav = () => {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";

     if(options.id == 'post-options-show'){
        options.setAttribute('id' ,'post-options-hidden');
        status = true; 
     }
    } else {
      x.className = "topnav";
      if(status){
        options.setAttribute('id' ,'post-options-show');
        status = false;
      }
    }
  }
menuIcon.addEventListener('click' ,responsiveNav);