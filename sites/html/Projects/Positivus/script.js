const menuIcon = document.querySelector(".menu-icon"),
      header = document.querySelector('header');
const body = document.querySelector("body")

// переключение класса для элемента menuIcon при нажатии на него
menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('menu-icon-active');
  header.classList.toggle('header-mobile-active');
  // body.classList.toggle("no-scroll");
  window.scroll({
      top: 0,
      behavior: 'smooth'
    });
});



//////////////////////////////////


const PlusButtons = document.querySelectorAll(".working-process-block-heading  button"),
      WorkingProcessBlocks = document.querySelectorAll("#working-process-blocks > div"),
      WorkingProcessDescriptions = document.querySelectorAll(".working-process-block-decs")

for(let i = 1; i < PlusButtons.length; i++){
  PlusButtons[i].classList.remove("working-process-block-button-active");
  WorkingProcessBlocks[i].classList.remove("working-process-block-active");
  WorkingProcessDescriptions[i].style.cssText = 'display: none;';
}   

//console.log(WorkingProcessDescriptions);

PlusButtons.forEach(item => item.addEventListener("click", ()=> {
  let index = 0;
  for(let i = 0; i < PlusButtons.length; i++){
    if(PlusButtons[i] === item) index = i;
  }

  let doNotActivate = false;
  if (WorkingProcessBlocks[index].classList.contains("working-process-block-active"))
    doNotActivate = true;

  //console.log(item);

  for(let i = 0; i < PlusButtons.length; i++){
    PlusButtons[i].classList.remove("working-process-block-button-active");
    WorkingProcessBlocks[i].classList.remove("working-process-block-active");
    WorkingProcessDescriptions[i].style.cssText = 'display: none;';
  }

  if(!doNotActivate){
    item.classList.add("working-process-block-button-active");
    WorkingProcessBlocks[index].classList.add("working-process-block-active");
    WorkingProcessDescriptions[index].style.cssText = 'display: block;';
  }

})
);


/////////////////////////////



var carouselPositions;
var halfContainer;
var currentItem;
var navStars = [];
const arrows = document.querySelectorAll(".testimonials-nav > button"),
      testimonialsBlocks = document.querySelectorAll("#testimonials-carousel > div");

function getCarouselPositions() {
  carouselPositions = [];
  document.querySelectorAll('#testimonials-carousel div').forEach(function(div) {
    carouselPositions.push([div.offsetLeft, div.offsetLeft + div.offsetWidth]); // add to array the positions information
  })
  halfContainer = document.querySelector('#testimonials-carousel').offsetWidth/2;
}

getCarouselPositions(); // call it once

function getStarsPositions(){
  // navStars = document.querySelectorAll('.#nav-stars-wrapper button');
  document.querySelectorAll('#nav-stars-wrapper button').forEach(function(button) {
    navStars.push(button);
  })
}
getStarsPositions();


function goCarousel(direction) {
  
  var currentScrollLeft = document.querySelector('#testimonials-carousel').scrollLeft;
  var currentScrollBottom = currentScrollLeft + document.querySelector('#testimonials-carousel').offsetWidth;
  
  if (currentScrollLeft === 0 && direction === 'next') {
      currentItem = 1;
  } else if (currentScrollBottom === document.querySelector('#testimonials-carousel').scrollWidth && direction === 'previous') {
      console.log('here')
      currentItem = carouselPositions.length - 2;
  } else {
      var currentMiddlePosition = currentScrollLeft + halfContainer;
      for (var i = 0; i < carouselPositions.length; i++) {
        if (currentMiddlePosition > carouselPositions[i][0] && currentMiddlePosition < carouselPositions[i][1]) {
          currentItem = i;
          if (direction === 'next') {
              currentItem++;
          } else if (direction === 'previous') {
              currentItem--    
          }
        }
      }
  } 
  
  if(currentItem < 0 || currentItem >= carouselPositions.length){
    return;
  }

  navStars.forEach(item => item.classList.remove("testimonials-nav-button-active"));
  navStars[currentItem].classList.toggle("testimonials-nav-button-active");

  document.getElementById('testimonials-carousel').scrollTo({
    left: carouselPositions[currentItem][0],
    behavior: 'smooth' 
  });

  arrows[0].classList.remove("testimonials-nav-arrow-inactive")
  arrows[1].classList.remove("testimonials-nav-arrow-inactive")
  if(currentItem === 0){
    arrows[0].classList.add("testimonials-nav-arrow-inactive")
  }
  if(currentItem === carouselPositions.length-1){
    arrows[1].classList.add("testimonials-nav-arrow-inactive")
  }
  
}

function directGoCarousel(currentItem) {
  navStars.forEach(item => item.classList.remove("testimonials-nav-button-active"));
  navStars[currentItem].classList.toggle("testimonials-nav-button-active");

  document.getElementById('testimonials-carousel').scrollTo({
    left: carouselPositions[currentItem][0],
    behavior: 'smooth' 
  });

  //console.log(currentItem, carouselPositions.length);

  arrows[0].classList.remove("testimonials-nav-arrow-inactive")
  arrows[1].classList.remove("testimonials-nav-arrow-inactive")
  if(currentItem === 0){
    arrows[0].classList.add("testimonials-nav-arrow-inactive")
  }
  if(currentItem === carouselPositions.length-1){
    arrows[1].classList.add("testimonials-nav-arrow-inactive")
  }
}

function recalculateStars(){
  console.log(currentItem);

  setTimeout(() => {

    var currentScrollLeft = document.querySelector('#testimonials-carousel').scrollLeft;
    
    var currentMiddlePosition = currentScrollLeft + halfContainer;
    for (var i = 0; i < carouselPositions.length; i++) {
      if (currentMiddlePosition > carouselPositions[i][0] && currentMiddlePosition < carouselPositions[i][1]) {
        currentItem = i;
      }
    }


    navStars.forEach(item => item.classList.remove("testimonials-nav-button-active"));
    navStars[currentItem].classList.toggle("testimonials-nav-button-active");

    arrows[0].classList.remove("testimonials-nav-arrow-inactive")
    arrows[1].classList.remove("testimonials-nav-arrow-inactive")
    if(currentItem === 0){
      arrows[0].classList.add("testimonials-nav-arrow-inactive")
    }
    if(currentItem === carouselPositions.length-1){
      arrows[1].classList.add("testimonials-nav-arrow-inactive")
    }

  }, 250);
}


testimonialsBlocks.forEach(item => item.addEventListener('touchend', recalculateStars));
window.addEventListener('resize', getCarouselPositions);


///////////////////////////////////////////////////////

const radioButtonLabels = document.querySelectorAll(".radio-button")
const radioButtons = document.querySelectorAll(".radio-button input")

radioButtonLabels.forEach(item => item.addEventListener('change', () => {
  radioButtonLabels.forEach(label => label.classList.remove("radio-button-active"))
  const radioButton = item.querySelector("input")
  item.classList.toggle("radio-button-active", radioButton.checked)
})
)
