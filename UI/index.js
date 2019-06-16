const propertyDiv = document.querySelector('.left-sidebar');
const properties = [
  {imgSrc:'img1.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N745,875' ,'for':'Sale'},
  {imgSrc:'image2.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N658,875','for':'Rent'},
  {imgSrc:'img3.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N1,258,875','for':'Sale'},
  {imgSrc:'img4.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N698,875','for':'Sale'},
  {imgSrc:'img5.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N265,875','for':'Rent'},
  {imgSrc:'img6.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N72,254,875','for':'Sale'},
  {imgSrc:'img7.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N124,875','for':'Rent'},
  {imgSrc:'img8.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N250,875','for':'Sale'},
  {imgSrc:'img9.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N74,875','for':'Rent'},
  {imgSrc:'img10.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N694,875','for':'Sale'},
  {imgSrc:'img11.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N81,045,875','for':'Rent'},
  {imgSrc:'img12.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N987,875','for':'Rent'},
  {imgSrc:'img13.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N1,685,875','for':'Sale'},
  {imgSrc:'img14.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N6,254,875','for':'Sale'},
  {imgSrc:'img15.png', 'id': '1' ,'type':'mini flat' ,'title':'', 'discription':'','price':'N69,588,875','for':'Sale'},
  
]



properties.forEach(element =>{
  let price = document.createElement('p');
  price.textContent = `${element.price} (for ${element.for})`;
  price.setAttribute('class', 'price');
  let description = document.createElement('p');
  description.textContent = 'this is the description';
  description.setAttribute('class', 'description');
  let imgDiv = document.createElement('div');
  let innerImgdiv = document.createElement('div');
  let image = document.createElement('img');
  image.setAttribute('src', element.imgSrc);
  innerImgdiv.setAttribute('class', 'inner-image-div');
  innerImgdiv.appendChild(image);
  
  imgDiv.setAttribute('class' ,'image-div');
  imgDiv.appendChild(innerImgdiv ,price);
  imgDiv.appendChild(price);
  imgDiv.appendChild(description);
propertyDiv.appendChild(imgDiv);
})






const header = document.querySelector('header');
const menuIcon = document.querySelector('.icon');
stickyFrom = header.offsetTop;
const mainContainer = document.querySelector('.main-container');

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

img.forEach(element =>{
    element.addEventListener('click' ,({target})=>{
        loadImage(target);
    })
})



