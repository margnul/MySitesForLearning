class TiilesScrollAnimation {

  selectors = {
    //animatedText: '[data-js-animated-text]',
    animatedSection: '[data-js-animated-section]',
    animatedList: '[data-js-animated-list]',
    animatedItem: '[data-js-animated-item]',
  }

  constructor() {
    //this.animatedTextElement = document.querySelector(this.selectors.animatedText)
    this.animatedSectionElement = document.querySelector(this.selectors.animatedSection)
    this.animatedListElement = document.querySelector(this.selectors.animatedList)
    this.animatedItemElements = document.querySelectorAll(this.selectors.animatedItem)

    this.itemWidth = document.querySelector(this.selectors.animatedItem).getBoundingClientRect().width
    this.listWidth = this.animatedListElement.scrollWidth;
    this.windowH = window.innerHeight;

    this.bindEvents()
  }

  updateItems() {
    const screenCenter = window.innerWidth / 2

    this.animatedItemElements.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      //const distance = Math.abs(screenCenter - itemCenter);
      const distance = screenCenter - itemCenter;
      const maxDistance = screenCenter;

      let p = (screenCenter - itemCenter) / screenCenter; // -1..1


      p = Math.max(Math.min(p, 1), -1);



      // Параболическая траектория
      const depth = -(p * p) * 400;  // глубина Z
      const x = p * 200;             // горизонтальное смещение
      

      const arm = 1.7
      const absP = Math.abs(p);
      const raw = (-Math.pow(arm, absP) + 1) ;
      const value = Math.sign(p) * raw * this.listWidth;

      const angle = Math.max(Math.min(raw * Math.sign(p) * 360, 130), -130);

      const scale = 1 - Math.abs(p) * 0.9; // уменьшение к краям

      item.style.transform = `
        perspective(1200px)
        translateX(calc(${-value}px))
        translateZ(${depth}px)
        rotateY(${angle}deg)
        scale(${scale})
      `;

      item.style.zIndex = `${Math.round(scale*1000)}`;
    })
  }


  bindEvents() {
    window.addEventListener("scroll", () => {
      const rect = this.animatedSectionElement.getBoundingClientRect()
      //const progress = Math.min(Math.max(0, (window.innerHeight / 2 - rect.top) / rect.height), 1)
      const progress = Math.min(Math.max(0, (0 - rect.top) / (rect.height - window.innerHeight)), 1)

      this.animatedListElement.scrollLeft = progress * (this.listWidth - this.itemWidth - window.innerWidth)

      this.updateItems()
    })

    window.addEventListener("resize", () => {
      this.itemWidth = document.querySelector(this.selectors.animatedItem).getBoundingClientRect().width
      this.listWidth = this.animatedListElement.scrollWidth;
      this.windowH = window.innerHeight;

      this.updateItems()
    })
  }
}

export default TiilesScrollAnimation
