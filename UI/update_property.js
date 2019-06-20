const agentPost = [{
    categories: "Mini flat",
    photos: ['img6.png', 'img4.png', 'img11.png', 'img6.png', 'img7.png'],
    title: 'Three bedroom bungalow with cozzy furniture for sale',
    transactionType: 'For-rent',
    duration: '3 years',
    price: '12,000,000',
    description: 'This house is a product of painstakingly architectural design.It boasts of 5 well decorated rooms with jaccuzi in each room. This house is located on a mountain with a nice view of the city..',
    email: 'johndoe@gmail.com',
    phone: '08054756236',
    state: 'Enugu',
    city: 'Nsukka',
    address: 'No 4 Ugwurugwu road',
}];
let deleteIconWrapper = document.querySelectorAll([".close-button img"]);
let category = document.getElementById('category');
let imageElements = document.querySelectorAll("#property-image");
let title = document.querySelector("#title");
let transactionType = document.querySelector('#transaction-type');
let duration = document.getElementById('duration');
let price = document.querySelector('#price');
let description = document.querySelector('textarea');
let email = document.querySelector('#adEmail');
let phone = document.querySelector('#adPhone');
let state = document.querySelector('#adState');
let city = document.querySelector('#adCity');
let address = document.querySelector('#adAddress');


category.selectedIndex = 3;
duration.selectedIndex = 15;
description.textContent = agentPost[0].description;
title.value = agentPost[0].title;
transactionType.selectedIndex = 1;
transactionType.value = agentPost[0].transactionType;

email.value = agentPost[0].email;
phone.value = agentPost[0].phone;
state.selectedIndex = 14;
city.value = agentPost[0].city;
address.value = agentPost[0].address;


const displayImages = () => {
    const photos = agentPost[0].photos;
    for (let index = 0; index < photos.length; index++) {
        imageElements[index].setAttribute('src', photos[index]);
        deleteIconWrapper[index].setAttribute('src', 'delete_image.png');
    }
}
displayImages();



const showPrice = () => {
    const priceOption = document.querySelector('.hidden');
    const selectTransaction = document.querySelector('[name="transaction-type"]');
    const durationOption = document.querySelector('.duration');
    const optionsWrapper = document.querySelector('.main-container');
    if (selectTransaction.value == "For-sale") {
        priceOption.setAttribute('class', 'cat-div showing');
        durationOption.setAttribute('class', 'cat-div duration box hidden');
    }
    else {
        priceOption.setAttribute('class', 'cat-div showing');
        durationOption.setAttribute('class', 'cat-div duration box showing');
        optionsWrapper.setAttribute('class', 'main-container main-container2');

    }
    price.value = agentPost[0].price;
};
showPrice();