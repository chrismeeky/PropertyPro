const propertyDiv = document.querySelector('.left-sidebar');
const featuredDiv = document.querySelector('.right-sidebar');
const featuredHolder = document.createElement('div');
featuredHolder.setAttribute('class', 'featured-holder');
featuredDiv.appendChild(featuredHolder);
const properties = [
  { imgSrc: 'images/photos/img1.png', id: '1', type: 'mini flat', title: '', description: '5 Bedroom bungalow fully air-conditioned with a big parking garage', price: 'N745,875', for: 'Sale', featured: 'yes' },
  { imgSrc: 'images/photos/image2.png', id: '1', type: 'mini flat', title: '', description: '5 Bedroom bungalow fully air-conditioned with a big parking garage', price: 'N658,875', for: 'Rent', featured: 'no' },
  { imgSrc: 'images/photos/img3.png', id: '1', type: 'mini flat', title: '', description: 'Three storey building with with a mountain view and a swimming pool', price: 'N1,258,875', for: 'Sale', featured: 'no' },
  { imgSrc: 'images/photos/img4.png', id: '1', type: 'mini flat', title: '', description: '6 Bedroom bungalow with solar system up for rent', price: 'N698,875', for: 'Sale', featured: 'yes' },
  { imgSrc: 'images/photos/img5.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N265,875', for: 'Rent', featured: 'no' },
  { imgSrc: 'images/photos/img6.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N72,254,875', for: 'Sale', featured: 'no' },
  { imgSrc: 'images/photos/img7.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N124,875', for: 'Rent', featured: 'no' },
  { imgSrc: 'images/photos/img8.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N250,875', for: 'Sale', featured: 'no' },
  { imgSrc: 'images/photos/img9.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N74,875', for: 'Rent', featured: 'no' },
  { imgSrc: 'images/photos/img10.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N694,875', for: 'Sale', featured: 'no' },
  { imgSrc: 'images/photos/img11.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N81,045,875', for: 'Rent', featured: 'no' },
  { imgSrc: 'images/photos/img12.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N987,875', for: 'Rent', featured: 'no' },
  { imgSrc: 'images/photos/img13.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N1,685,875', for: 'Sale', featured: 'yes' },
  { imgSrc: 'images/photos/img14.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', price: 'N6,254,875', for: 'Sale', featured: 'no' },
  { imgSrc: 'images/photos/img15.png', id: '1', type: 'mini flat', title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLets add some dummy description to this property and see how long it can hold', price: 'N69,588,875', for: 'Sale', featured: 'no' },

];


//loop through the property array and dynamically display the posts
properties.forEach(element => {
  //initialize all the post elements :the image, title,description, etc elements
  let price = document.createElement('p');
  price.textContent = `${element.price} (for ${element.for})`;
  price.setAttribute('class', 'price');
  let description = document.createElement('p');
  description.textContent = element.description;
  description.setAttribute('class', 'description');
  let imgDiv = document.createElement('div');
  // when a post is clicked, load the view property page
  imgDiv.addEventListener('click', () => {
    location.href = 'view_property.html'
  });
  // create the image divs, image elements and populate from the array
  let innerImgdiv = document.createElement('div');
  let image = document.createElement('img');
  image.setAttribute('src', element.imgSrc);
  innerImgdiv.setAttribute('class', 'inner-image-div');
  //set an image to the image div
  innerImgdiv.appendChild(image);
  /* create and set the detailsDiv attribute and append child 
  elements (price and details ) elements to it*/
  let detailsDiv = document.createElement('div');
  detailsDiv.setAttribute('class', 'details-div');
  detailsDiv.appendChild(price);
  detailsDiv.appendChild(description);
  /*set imgDiv class attribute and append the child 
  elements (innerImgDiv ,price and details to it)*/
  imgDiv.setAttribute('class', 'image-div');
  imgDiv.appendChild(innerImgdiv);
  imgDiv.appendChild(price);
  imgDiv.appendChild(detailsDiv);
  //populate the page (propertyDiv) with the posts
  propertyDiv.appendChild(imgDiv);
  //populate the featured posts Div with posts if the property "featured" attribute is set to yes 
  if (element.featured == 'yes') {
    description.parentNode.removeChild(description);
    featuredHolder.appendChild(imgDiv);
    imgDiv.setAttribute('class', 'image-div-rightbar');
  }
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

// make the menu a dropdown list when the screen size becomes small
const responsiveNav = () => {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
menuIcon.addEventListener('click', responsiveNav);

img.forEach(element => {
  element.addEventListener('click', ({ target }) => {
    loadImage(target);
  })
})


