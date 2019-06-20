//initialize menu elements
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
menuIcon.addEventListener('click' ,responsiveNav);

// develop algorithm for the bot challenge
const refreshWord = document.querySelector('.answer a');
const wordChallenge = () =>{
    let displayWord = document.querySelector('.wrongWord');
    //create a words array
    const words = ["Emmanuel" ,"Michael", "Computer" ,"Stephen" , "Lawrence" ,"Jennifer" ,"Daniel" , "Mathew" ,"Television", "Mathematics"];
    let randomNumber1 = Math.floor(Math.random() * 10);
    let randomNumber2 = Math.floor(Math.random() * 10);
    // choose a word randomly
    let word = words[randomNumber1];
    /*check if random number(which serves as an index of the word string) is greater than the word length
    then assign a lower value to it */
    if(randomNumber2 > word.length) {
        randomNumber2 = randomNumber2 - word.length -1;
        
    }
    //delete a character from the selected word and replace it with a hyphen
    let wrongWord = word.replace(word[randomNumber2] ,'-');
    displayWord.textContent = wrongWord;
}
// add the wordChallenge function as a click listener callback to the "refreshWord" element
refreshWord.addEventListener('click', wordChallenge);