class SavoirFaire {
  selectors = {
    savoirFaireSection: '[data-js-savoir-faire-section]',
    serviceLink: '[data-js-service-link]',
    service: '[data-js-savoir-faire-service]',
    serviceTitle: '[data-js-savoir-faire-service-title-word]',
    contentItem: '[data-js-savoir-faire-service-content-item]',
    smallTitle: '[data-js-savoir-faire-small-title]',
  }

  stateClasses = {
    isActive: 'is-active',
    isVisible: 'is-visible',
  }

  clip(value, min, max) {
    return Math.max(Math.min(value, max), min)
  }

  constructor() {
    this.savoirFaireSectionElement = document.querySelector(this.selectors.savoirFaireSection)
    this.serviceLinkElements = document.querySelectorAll(this.selectors.serviceLink)
    this.serviceElements = document.querySelectorAll(this.selectors.service)
    this.serviceTitleElements = [...this.serviceElements].map((item) => item.querySelectorAll(this.selectors.serviceTitle))
    this.contentItemElements = [...this.serviceElements].map((item) => item.querySelectorAll(this.selectors.contentItem))
    this.smallTitleElement = document.querySelector(this.selectors.smallTitle)
    
    this.sectionScroll = 0 // 0 - 100

    this.bindEvents()
    this.updateNavLinks()
    this.updateServices()
  }

  updateNavLinks() {
    this.serviceLinkElements.forEach((item, index) => {
      const topBound = 25 * (index + 1)
      const bottomBound = 25 * index
      //const progress = (Math.max(Math.min(this.sectionScroll, topBound), bottomBound) * 4 / 100 - index)
      const progress = this.clip(this.sectionScroll, bottomBound, topBound) * 4 / 100 - index
      item.style.setProperty('--progress', progress.toString())
    })
  } 

  updateServices() {
    this.serviceElements.forEach((item, index) => {
      const topBound = 25 * (index + 1)
      const bottomBound = 25 * index
      const activate = (this.sectionScroll >= bottomBound && this.sectionScroll <= topBound)
      item.classList.toggle(this.stateClasses.isActive, activate)

      this.animateTitles(index)
    })
  }

  animateTitles(index) {
    // out
    const topBound = 25 * (index + 1)
    const bottomBound = 25 * index
    const progress = (this.sectionScroll - bottomBound) / 25
    
    const animationOffset = 0.8
    const animationWidth = 1 - animationOffset
    const x = (progress - animationOffset) / animationWidth
    const shift = this.clip((Math.pow(2.1, x) - 1) * 100, 0, 110)

    const animationInset = 0.2
    const animationWidth2 = animationInset
    const x2 = 1 - this.clip(progress, 0, animationInset) / animationWidth2
    const shift2 = this.clip((Math.pow(2.1, x2) - 1) * 100, 0, 110)

    if (index === 0) {
      //console.log(progress, x, shift)
    }

    this.serviceTitleElements[index].forEach((item) => {
      if (progress >= 0.5) {
        if (index === 3) {
          item.style.setProperty("--shift", `0%`)
        } else {
          item.style.setProperty("--shift", `${shift}%`)
        }
      } else {
        item.style.setProperty("--shift", `${-shift2}%`)
      }
      if (index === 3) {
        item.style.setProperty("--progress-out", "0");
      } else {
        item.style.setProperty("--progress-out", (shift).toString());
      }
      item.style.setProperty("--progress-in", (shift2).toString());
    })

    this.contentItemElements[index].forEach((item, elementNum) => {
      const step = 20
      if (progress >= 0.5) {
        if (index === 3) {
          item.style.setProperty("--shift", `0%`)
        } else {
          const width = 110 - (step * (elementNum))
          const newShift = this.clip(shift - (step * (elementNum)), 0, 110) / width * 110
          item.style.setProperty("--shift", `${newShift}%`)
          //item.style.setProperty("--shift", `${shift}%`)
        }
      } else {
        item.style.setProperty("--shift", `${-shift2}%`)
      }
      if (index === 3) {
        item.style.setProperty("--progress-out", "0");
      } else {
        const width = 110 - (step * (elementNum))
        const newShift = this.clip(shift - (step * (elementNum)), 0, 110) / width * 110
        item.style.setProperty("--progress-out", (newShift).toString());
        //item.style.setProperty("--progress-out", (shift).toString());
      }
      item.style.setProperty("--progress-in", (shift2).toString());
    })
  }

  //transform: translate3d(0px, -110%, 0px);
  //transform: translate3d(0px, -53.6435%, 0px);

  bindEvents() {
    window.addEventListener('scroll', () => {
      let x = this.savoirFaireSectionElement.getBoundingClientRect().top
      let H = this.savoirFaireSectionElement.getBoundingClientRect().height
      const offsetTop = 0 //window.innerHeight / 2
      const offsetBottom = window.innerHeight

      H += offsetTop - offsetBottom
      x -= offsetTop

      //this.sectionScroll = (Math.max(Math.min(-x / H, 1), 0) * 100)
      this.sectionScroll = this.clip(-x / H, 0, 1) * 100
      
      this.updateNavLinks()
      this.updateServices()
      this.updateSmallTitle()
    })

    this.serviceLinkElements.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const index = Number(link.dataset.serviceIndex)
        this.scrollToService(index)
      })
    })
  }

  updateSmallTitle() {
    const makeVisible = (this.sectionScroll > 5)
    this.smallTitleElement.classList.toggle(this.stateClasses.isVisible, makeVisible)
  }

  scrollToService(index) {
    const section = this.savoirFaireSectionElement

    const sectionTop = window.scrollY + section.getBoundingClientRect().top
    const sectionHeight = section.getBoundingClientRect().height
    const viewportHeight = window.innerHeight

    // та же формула, что и в scroll listener
    const offsetTop = 0
    const offsetBottom = viewportHeight
    const effectiveHeight = sectionHeight + offsetTop - offsetBottom

    const targetProgress = index * 25
    const targetScroll =
      sectionTop + (sectionHeight / 8) +
      (targetProgress / 100) * effectiveHeight
    
    console.log(targetScroll)

    window.lenis.scrollTo(targetScroll, {
      duration: 2.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }

  
}

new SavoirFaire()

export default SavoirFaire;