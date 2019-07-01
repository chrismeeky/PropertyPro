//cretate an array containing the agent's post information
const agentPost = [{
    id:'fdfdf59549656',
    categories: "Mini flat",
    optionIndex: 3,
    durationOptionIndex:15,
    stateOptionIndex:14,
    photos: ['images/photos/img6.png', 'images/photos/img4.png', 'images/photos/img11.png', 'images/photos/img6.png', 'images/photos/img7.png'],
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
//initialize all the elements with "Let" as we will be re-asigning(updating) them with new values
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

//initialize the select elements with their default values
category.selectedIndex = agentPost[0].optionIndex; 
duration.selectedIndex = agentPost[0].durationOptionIndex; 
state.selectedIndex = agentPost[0].stateOptionIndex; 
//initialize the input elements and textarea with their default values
description.textContent = agentPost[0].description;
title.value = agentPost[0].title;
transactionType.selectedIndex = 1;
transactionType.value = agentPost[0].transactionType;
email.value = agentPost[0].email;
phone.value = agentPost[0].phone;
city.value = agentPost[0].city;
address.value = agentPost[0].address;

//create a function that will display all the images contained in the arra and setting thhe delete icon to them
const displayImages = () => {
    const photos = agentPost[0].photos;
    for (let index = 0; index < photos.length; index++) {
        imageElements[index].setAttribute('src', photos[index]);
        deleteIconWrapper[index].setAttribute('src', 'images/icons/delete_image.png');
    }
}
displayImages();


/*since the behaviour of the price and duration elements are dependent on which transaction type(for sale and for rent)
a showPriceAndDuration function is called to display them accordingly*/ 
const showPriceAndDuration = () => {
    const priceOption = document.querySelector('.hidden'); //hide the price input element by default
    const selectTransaction = document.querySelector('[name="transaction-type"]');
    const durationOption = document.querySelector('.duration');
    const optionsWrapper = document.querySelector('.main-container');
    // if the transaction type is "for sale" , show the price box and hide the duration box
    if (selectTransaction.value == "For-sale") {
        priceOption.setAttribute('class', 'cat-div showing');
        durationOption.setAttribute('class', 'cat-div duration box hidden');
    }
    // if the transaction type is "for rent", show both the price and the duration box 
    else {
        priceOption.setAttribute('class', 'cat-div showing');
        durationOption.setAttribute('class', 'cat-div duration box showing');
        optionsWrapper.setAttribute('class', 'main-container main-container2');

    }
    price.value = agentPost[0].price;
};
showPriceAndDuration();


