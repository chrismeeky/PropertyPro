//initialize menu elements
const header = document.querySelector('header');
const menuIcon = document.querySelector('.icon');
stickyFrom = header.offsetTop;
const mainContainer = document.querySelector('.main-container');

/*since the behaviour of the price and duration elements are dependent on which transaction type(for sale and for rent)
a showPriceAndDuration function is called to display them accordingly*/
const showPriceOption = () =>{
    const priceOption = document.querySelector('.hidden');
    const selectTransaction = document.querySelector('[name="transaction-type"]');
    const durationOption = document.querySelector('.duration');
    selectTransaction.addEventListener('change' ,() =>{
        if(selectTransaction.value =="For-sale"){
          priceOption.setAttribute('class' , 'cat-div showing');
          durationOption.setAttribute('class' ,'cat-div duration box hidden');
        }
        else{
            priceOption.setAttribute('class' , 'cat-div showing');
          durationOption.setAttribute('class' ,'cat-div duration box showing');
          mainContainer.setAttribute('class' ,'main-container main-container2' );

        }
    })
}
showPriceOption();


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

//when the upload icon is clicked, the browser should open the file explorer of the device
const fileUpload = document.querySelector('#file-upload');
const img = document.querySelectorAll('.image-wrapper');
const loadImage = (target) =>{
    fileUpload.click();
    

};
// attach a click event listener to call the loadImage function when any of the upload imae icon ic clicked

img.forEach(element =>{
    element.addEventListener('click' ,({target})=>{
        loadImage(target);
    })
});


