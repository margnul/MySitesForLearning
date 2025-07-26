//-----------------------TABS---------------------------------

const tabBtns = document.querySelectorAll(".tabs-nav button");
//console.log(tabBtns);

const tabsItems = document.querySelectorAll(".tabs-item");
//console.log(tabsItems);

// функция скрывания всех табов и деактивации всех кнопок
function hideTabs(){
  tabsItems.forEach(item => item.classList.add("hide"));
  tabBtns.forEach(btn => btn.classList.remove("active"));
}

// функция показывающая таб и подсвечивающая кнопку
function showTab(index){
  tabsItems[index].classList.remove("hide");
  tabBtns[index].classList.add("active");
}

hideTabs();
showTab(0);

tabBtns.forEach((btn, index) => btn.addEventListener("click", () => {
  hideTabs();
  showTab(index);
}));



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