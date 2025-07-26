const menuIcon = document.querySelector(".menu-icon"),
      header = document.querySelector('header');
const body = document.querySelector("body")

// переключение класса для элемента menuIcon при нажатии на него
menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('menu-icon-active');
  header.classList.toggle('header-mobile');
  body.classList.toggle("no-scroll");
  window.scroll({
      top: 0,
      behavior: 'smooth'
    });
});



// слайдер со стрелками
const sliderArrows = document.querySelector(".slider-arrows"),
      slidesArrows = sliderArrows.querySelectorAll('.slider-arrows-item'),
      prev = sliderArrows.querySelector(".slider-arrows-arrow-left"),
      next = sliderArrows.querySelector(".slider-arrows-arrow-right");

console.log(prev);

let slideIndex = 0;

prev.addEventListener('click', () => showSlideArrows(-1));
next.addEventListener('click', () => showSlideArrows(1));

function showSlideArrows(n = 0) {
  slideIndex += n;

  if (slideIndex < 0)slideIndex = slidesArrows.length - 1;
  if (slideIndex >= slidesArrows.length)slideIndex = 0;

  slidesArrows.forEach(item => item.style.display = "none");
  slidesArrows[slideIndex].style.display = "block";
}

showSlideArrows();




// слайдер с точками
const sliderDots = document.querySelector(".slider-dots"),
      slidesDots = document.querySelectorAll(".slider-dots-item"),
      wrapperDots = sliderDots.querySelector(".slider-dots-nav");



const dots = [];

for (let i = 0; i < slidesDots.length; i++){
  const dot = document.createElement('button');

  // дата атрибут
  dot.dataset.slideTo = i;

  dot.classList.add('slider-dots-nav-item');
  if (i == 0) dot.classList.add('slider-dots-nav-item-active');

  if (i != 0) slidesDots[i].style.display = 'none';
  dot.addEventListener('click', showSlideDots)

  wrapperDots.append(dot);
  dots.push(dot);
}

function showSlideDots(e){
  slidesDots.forEach(item => item.style.display = "none");
  slidesDots[e.target.dataset.slideTo].style.display = "block";

  dots.forEach(item => item.classList.remove("slider-dots-nav-item-active"));
  dots[e.target.dataset.slideTo].classList.add("slider-dots-nav-item-active");
}

