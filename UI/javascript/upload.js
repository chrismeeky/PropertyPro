const header = document.querySelector('header');
const menuIcon = document.querySelector('.icon');
stickyFrom = header.offsetTop;
const mainContainer = document.querySelector('.main-container');

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


const responsiveNav = () => {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
menuIcon.addEventListener('click' ,responsiveNav);
const fileUpload = document.querySelector('#file-upload');
const img = document.querySelectorAll('.image-wrapper');
const loadImage = (target) =>{
    fileUpload.click();
    

};
img.forEach(element =>{
    element.addEventListener('click' ,({target})=>{
        loadImage(target);
    })
});



window.addEventListener('load', () =>{
    fileUpload.addEventListener('change' , (event) =>{
let reader =fileUpload.value;
reader.readAsDataURL(event.srcElement.files[0]);
let me = this;
reader.onload(function(){
    let fileContent = reader.result;
    alert(fileContent);
})

    });
});