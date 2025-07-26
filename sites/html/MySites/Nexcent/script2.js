const sliderDots = document.querySelector(".info"), // картинки в div .info
      slidesDots = document.querySelectorAll(".album-item"),
      titlesDots = document.querySelectorAll(".album-title"),
      textsDots = document.querySelectorAll(".album-desc"),
      wrapperDots = document.querySelector(".album-buttons");

const dots = [];

for (let i = 0; i < 3; i++){
  const dot = document.createElement('button');

  dot.dataset.slideTo = 0;

  dot.classList.add('button-album');
  if (i == 0) dot.classList.add('button-album-active');

  if (i != 0) slidesDots[0].style.display = 'none';
  if (i != 0) titlesDots[i].style.display = 'none';
  if (i != 0) textsDots[i].style.display = 'none';
  dot.addEventListener('click', showSlideDots)

  wrapperDots.append(dot);
  dots.push(dot);
}

function showSlideDots(e){
    slidesDots.forEach(item => item.style.display='none');
    slidesDots[e.target.dataset.slideTo].style.display = 'block';

    titlesDots.forEach(item => item.style.display='none');
    textsDots.forEach(item => item.style.display='none');
    titlesDots[e.target.dataset.slideTo].style.display = 'block';
    textsDots[e.target.dataset.slideTo].style.display = 'block';

    dots.forEach(item => item.classList.remove('button-album-active'));
    dots[e.target.dataset.slideTo].classList.add('button-album-active');

  setTimeout(() => {
    slidesDots[e.target.dataset.slideTo].src = "./images/illustration1_2.jpg";
    console.log("Waited 1 second!");
  }, 350);

}

