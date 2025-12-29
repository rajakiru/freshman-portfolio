//Welcome Page - Text Scramble
class TextScramble {
  constructor(previous) {
    this.previous = previous;
    this.chars = '<>-_[]{}—\\/=+*^?!________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.previous.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 80);
      const end = start + Math.floor(Math.random() * 100);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    console.log(this.queue.length);
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      //length of give text
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        //Output of charecters
        output += `<span class="random_char">${char}</span>`;
      } else {
        output += from;
      }
    }
    //Animate Transition
    this.previous.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}

//Constant phrase to replace old text
const phrases = ["Welcome To My Page!"];
const previous = document.querySelector('.text');
const fx = new TextScramble(previous);

let counter = 0;
const next = () => {
  if (counter < phrases.length) {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1000);
    });
    counter = counter + 1; //% phrases.length
  }
};

next();

//JavaScipt for Navigation menu
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// JavaScript for Images
var slideIndex = 1;
showSlides(slideIndex);

// Show Slides
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("pic_dot");
  //hides other slides
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  //active state of dots
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  //displays block slide  and active state of dots
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

//Typewriter text
document.addEventListener('DOMContentLoaded',function(event){
  // array of text to be displayed
  var dataText = [ "Hi, there! ", "I'm Kiruthika."];

  // function to call itself till text is displayed
  function typeWriter(text, i, fnCallback) {
    // to check if text isn't finished
    if (i < (text.length)) {
      // add next character
     document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 120); //used to set speed (I set it at 120)
    }
    // text finished, check if there is callback
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 5000);
    }
  }
  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 5000);
     }
     // check if dataText[i] exists
    if (i < dataText.length){
      // text exists! start typewriter animation
     typeWriter(dataText[i], 0, function(){
       // after callback (and whole text has been animated), start next text
       StartTextAnimation(i + 1);
     });
    }
  }
  // start the text animation
  StartTextAnimation(0);
});

/* Dark Mode Toggle (commented out - dark mode is now permanent)
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  // Save the preference in localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Check for saved dark mode preference on page load (default is dark mode)
document.addEventListener('DOMContentLoaded', function() {
  const darkMode = localStorage.getItem('darkMode');

  // If no preference is saved, default to dark mode
  // If preference is saved and it's not 'disabled', enable dark mode
  if (darkMode === null || darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }
});
*/
