class Revealer{
  selectors = {
    toReveal: '[data-js-to-reveal]',
    toReveal15percents: '[data-js-to-reveal-15-percent]',
    toReveal5percents: '[data-js-to-reveal-5-percent]',
  }

  stateClasses = {
    notAnimated: 'not-animated',
  }


  constructor() {
    this.toRevealElements = document.querySelectorAll(this.selectors.toReveal)
    this.toReveal15percentsElements = document.querySelectorAll(this.selectors.toReveal15percents)
    this.toReveal5percentsElements = document.querySelectorAll(this.selectors.toReveal5percents)


    this.addNotAnimatedClass()
    this.startObservaton()
  }

  addNotAnimatedClass() {
    this.toRevealElements.forEach(el => 
      el.classList.add(this.stateClasses.notAnimated)
    )
    this.toReveal15percentsElements.forEach(el => 
      el.classList.add(this.stateClasses.notAnimated)
    )
    this.toReveal5percentsElements.forEach(el => 
      el.classList.add(this.stateClasses.notAnimated)
    )
  }


  toObserve(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(this.stateClasses.notAnimated)
        }
      })
    }, {
      threshold: 0.1
    })

    observer.observe(element);
  }

  toObserve15percents(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(this.stateClasses.notAnimated)
        }
      })
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -15% 0px'
    })

    observer.observe(element);
  }

  toObserve5percents(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(this.stateClasses.notAnimated)
        }
      })
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -5% 0px'
    })

    observer.observe(element);
  }

  startObservaton() {
    this.toRevealElements.forEach(el => 
      this.toObserve(el)
    )
    this.toReveal15percentsElements.forEach(el => 
      this.toObserve15percents(el)
    )
    this.toReveal5percentsElements.forEach(el => 
      this.toObserve5percents(el)
    )
  }





}

new Revealer()

export default Revealer;