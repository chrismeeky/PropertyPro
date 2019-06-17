const propertyDiv = document.querySelector('.left-sidebar');
const featuredDiv = document.querySelector('.right-sidebar');
const featuredHolder = document.createElement('div');
featuredHolder.setAttribute('class' , 'featured-holder');
featuredDiv.appendChild(featuredHolder);
const properties = [
  {imgSrc:'img1.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N745,875' ,for:'Sale' ,featured:'yes'},
  {imgSrc:'image2.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N658,875',for:'Rent',featured:'no'},
  {imgSrc:'img3.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N1,258,875',for:'Sale',featured:'no'},
  {imgSrc:'img4.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N698,875',for:'Sale',featured:'yes'},
  {imgSrc:'img5.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N265,875',for:'Rent',featured:'no'},
  {imgSrc:'img6.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N72,254,875',for:'Sale',featured:'no'},
  {imgSrc:'img7.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N124,875',for:'Rent',featured:'no'},
  {imgSrc:'img8.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N250,875',for:'Sale',featured:'no'},
  {imgSrc:'img9.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N74,875',for:'Rent',featured:'no'},
  {imgSrc:'img10.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N694,875',for:'Sale',featured:'no'},
  {imgSrc:'img11.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N81,045,875',for:'Rent',featured:'no'},
  {imgSrc:'img12.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N987,875',for:'Rent',featured:'no'},
  {imgSrc:'img13.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N1,685,875',for:'Sale',featured:'yes'},
  {imgSrc:'img14.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N6,254,875',for:'Sale',featured:'no'},
  {imgSrc:'img15.png', id: '1' ,type:'mini flat' ,title:'', description:'Lets add some dummy description to this property and see how long it can hold',price:'N69,588,875',for:'Sale',featured:'no'},
  
]



properties.forEach(element =>{
  let price = document.createElement('p');
  price.textContent = `${element.price} (for ${element.for})`;
  price.setAttribute('class', 'price');
  let description = document.createElement('p');
  description.textContent = element.description;
  description.setAttribute('class', 'description');
  let imgDiv = document.createElement('div');
  let innerImgdiv = document.createElement('div');
  let image = document.createElement('img');
  image.setAttribute('src', element.imgSrc);
  innerImgdiv.setAttribute('class', 'inner-image-div');
  innerImgdiv.appendChild(image);
  let detailsDiv = document.createElement('div');
  detailsDiv.setAttribute('class' , 'details-div');
  detailsDiv.appendChild(price);
  detailsDiv.appendChild(description);
  
  imgDiv.setAttribute('class' ,'image-div');
  imgDiv.appendChild(innerImgdiv ,price);
  imgDiv.appendChild(price);
  imgDiv.appendChild(detailsDiv);
propertyDiv.appendChild(imgDiv);
if(element.featured == 'yes'){
  description.parentNode.removeChild(description);
  featuredHolder.appendChild(imgDiv);
  imgDiv.setAttribute('class' ,'image-div-rightbar');
}
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



