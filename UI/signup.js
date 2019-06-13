let header = document.querySelector('header');
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

// develop algorithm for the bot challenge
let refreshWord = document.querySelector('.answer span');

let wordChallenge = () =>{
    let displayWord = document.querySelector('.wrongWord');
    const words = ["Emmanuel" ,"Michael", "Computer" ,"Stephen" , "Lawrence" ,"Jennifer" ,"Daniel" , "Mathew" ,"Television", "Mathematics"];
    let randomNumber1 = Math.floor(Math.random() * 10);
    let randomNumber2 = Math.floor(Math.random() * 10);
    let word = words[randomNumber1];
    if(randomNumber2 > word.length) {
        randomNumber2 = randomNumber2 - word.length -1;
        
    }
    let wrongWord = word.replace(word[randomNumber2] ,'-');
    displayWord.textContent = wrongWord;
    console.log(wrongWord);
}
refreshWord.addEventListener('click', wordChallenge);