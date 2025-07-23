//-----------------------TABS---------------------------------

const images = document.querySelectorAll(".tabs-item img");
const tabBtns = document.querySelectorAll(".tabs-nav button")
const tabsItems = document.querySelectorAll(".tabs-item");

const links = ["images/tab1.png", "images/tab2.jpg", "images/tab3.jpeg"];

// меняем ссылку по нажатию
tabBtns.forEach((btn, index) => btn.addEventListener("click", () => {
  // меняем ссылку на фото
  images[0].setAttribute('src', links[index]);

  tabBtns.forEach(item => item.classList.remove("active"));
  tabBtns[index].classList.add("active");

}));

// скрываем остальные табы
tabsItems[1].classList.add("hide");
tabsItems[2].classList.add("hide");

// выделяем нажатую кнопку


//-----------------------ANCHORS---------------------------------
const anchors =  document.querySelectorAll(".header-nav a");
//console.log(anchors);

anchors.forEach(anc => {
  anc.addEventListener("click", function(event){
    event.preventDefault();

    const id = anc.getAttribute("href");
    const elem = document.querySelector(id);
    window.scroll({
      top: elem.offsetTop-25,
      behavior: 'smooth'
    });


  });
});