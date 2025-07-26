const sliderDots = document.querySelector(".info"), // картинки в div .info
      slidesDots = document.querySelectorAll(".album-item"),
      titlesDots = document.querySelectorAll(".album-title"),
      textsDots = document.querySelectorAll(".album-desc"),
      wrapperDots = document.querySelector(".album-buttons");

const dots = [];

for (let i = 0; i < slidesDots.length; i++){
  const dot = document.createElement('button');

  dot.dataset.slideTo = i;

  dot.classList.add('button-album');
  if (i == 0) dot.classList.add('button-album-active');

  if (i != 0) slidesDots[i].style.display = 'none';
  if (i != 0) titlesDots[i].style.display = 'none';
  if (i != 0) textsDots[i].style.display = 'none';
  dot.addEventListener('click', showSlideDots)

  wrapperDots.append(dot);
  dots.push(dot);
}

const newspaperSpinning = [
  { transform: "translate(0, -50%)", opacity: "0.3"},
  { transform: "translate(-90vw, -50%)" , opacity: "0"},
];

const newspaperTiming = {
  duration: 400,
  iterations: 1,
};

function showSlideDots(e){
//     slidesDots.forEach(item => item.style.display='none');
//     for (let i = 0; i < slidesDots.length; i++){
//       if (dots[i].classList.contains('button-album-active')){
// //        slidesDots[i].style.display = 'block';
//         slidesDots[i].animate(newspaperSpinning, newspaperTiming);
//         console.log(i);
//       }
//     }
    // slidesDots[e.target.dataset.slideTo].style.display = 'block';

    
    //slidesDots.forEach(item => item.style.display='none');
    //slidesDots[e.target.dataset.slideTo].style.display = 'block';

    slidesDots.forEach(item => item.animate(newspaperSpinning, newspaperTiming));

    titlesDots.forEach(item => item.style.display='none');
    textsDots.forEach(item => item.style.display='none');
    titlesDots[e.target.dataset.slideTo].style.display = 'block';
    textsDots[e.target.dataset.slideTo].style.display = 'block';

    dots.forEach(item => item.classList.remove('button-album-active'));
    dots[e.target.dataset.slideTo].classList.add('button-album-active');

  setTimeout(() => {
    
    slidesDots.forEach(item => item.style.display='none');
    slidesDots[e.target.dataset.slideTo].style.display = 'block';
    console.log("Waited 1 second!");
  }, 350);

}

