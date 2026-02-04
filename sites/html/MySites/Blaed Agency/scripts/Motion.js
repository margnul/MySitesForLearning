class Motion {
  selectors = {
    logoWord: '[data-js-motion-logo-word]',
    logoLetter: '[data-js-motion-logo-letter]',
    motionSection: '[data-js-motion-section]',
    footerBaseline: '[data-js-footer-baseline]',
  }

  clip(value, min, max) {
    return Math.max(Math.min(value, max), min)
  }

  constructor() { 
    this.logoWordElements = document.querySelectorAll(this.selectors.logoWord)
    this.logoLetterElements = [...this.logoWordElements].map((item) => item.querySelectorAll(this.selectors.logoLetter))
    this.motionSectionElement = document.querySelector(this.selectors.motionSection)
    this.footerBaselineElement = document.querySelector(this.selectors.footerBaseline)

    this.sectionScroll = 0

    this.bindEvents()
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      let x = this.motionSectionElement.getBoundingClientRect().top
      let H = this.motionSectionElement.getBoundingClientRect().height
      const offsetTop = window.innerHeight
      let offsetBottom = 0

      if (window.innerHeight / window.innerWidth > 2) {
        offsetBottom = window.innerHeight/4
      }
      
      H += offsetTop - offsetBottom - this.motionSectionElement.getBoundingClientRect().height
      x -= offsetTop

      this.sectionScroll = this.clip(-x / H, 0, 1) * 100

      //console.log(window.innerHeight / window.innerWidth)

      this.updateTranslation()
      this.footerBaselineTranslation()

    })
  }


  updateTranslation() {
    this.logoLetterElements.forEach((Word, WordIndex) => {
      const H = this.motionSectionElement.getBoundingClientRect().height
      const translations = [0, 1 / 10.66, 1 / 5.33, 1 / 3.55]

      // let scroll = 0
      // const offset = 0.2

      // if (this.sectionScroll/100 < offset) {
      //   scroll = 0
      // } else {
      //   scroll = ((this.sectionScroll / 100) - offset) / (1 - offset)
      // }
      
      // const translation = translations[WordIndex] * H * (1 - scroll) * 1.1

      // const WordStyle = `translate: none; rotate: none; scale: none; opacity: 1; transform: translate3d(0px, ${-translation}px, 0px);`
      // this.logoWordElements[WordIndex].style.cssText = WordStyle

      let offset = 0.2

      let scroll = 0

      if (this.sectionScroll/100 < offset) {
        scroll = 0
      } else {
        scroll = ((this.sectionScroll / 100) - offset) / (1 - offset)
      }

      //console.log(this.sectionScroll, scroll)

      const breakPoint0X = 0.6 // 0.5
      const breakPoint0Y = 0.2
      
      let multiplier = 0

      multiplier = scroll < breakPoint0X ? (breakPoint0Y/breakPoint0X) * scroll : ((1 - breakPoint0Y)/(1 - breakPoint0X)) * scroll + (1 - ((1 - breakPoint0Y)/(1 - breakPoint0X)))

      const translation = translations[WordIndex] * H * (1 - multiplier) * 1.3

      const WordStyle = `translate: none; rotate: none; scale: none; opacity: 1; transform: translate3d(0px, ${-translation}px, 0px);`
      this.logoWordElements[WordIndex].style.cssText = WordStyle



        


      Word.forEach((Letter, LetterIndex) => {
        //matrix(a, b, c, d, tx, ty)
        let a, d, tx, ty


        //letters appearing
        let offset = 0.2 + (LetterIndex / 20) + (WordIndex / 10)

        let scroll = 0

        if (this.sectionScroll/100 < offset) {
          scroll = 0
        } else {
          scroll = ((this.sectionScroll / 100) - offset) / (1 - offset)
        }

        //console.log(this.sectionScroll, scroll)

        const breakPoint1X = 0.3 // 0.5
        const breakPoint1Y = 0.6

        let multiplier = 0
        
        multiplier = scroll < breakPoint1X ? (breakPoint1Y/breakPoint1X) * scroll : ((1 - breakPoint1Y)/(1 - breakPoint1X)) * scroll + (1 - ((1 - breakPoint1Y)/(1 - breakPoint1X)))

        //Letter.style.transform = `matrix(0.5,0,0,0.5,314.8182,${257.53747 * (1 - multiplier)})`
        ty = 257.53747 * (1 - multiplier)



        //letters scaling
        offset = 0.85 - (WordIndex / 25)

        scroll = 0

        if (this.sectionScroll/100 < offset) {
          scroll = 0
        } else {
          scroll = ((this.sectionScroll / 100) - offset) / (1 - offset)
        }

        //console.log(this.sectionScroll, scroll)

        const breakPoint2X = 0.6
        const breakPoint2Y = 0.6

        multiplier = 0
        
        multiplier = scroll < breakPoint2X ? (breakPoint2Y/breakPoint2X) * scroll : ((1 - breakPoint2Y)/(1 - breakPoint2X)) * scroll + (1 - ((1 - breakPoint2Y)/(1 - breakPoint2X)))

        //Letter.style.transform = `matrix(0.5,0,0,0.5,314.8182,${257.53747 * (1 - multiplier)})`
        a = 0.5 * multiplier
        d = 0.5 * multiplier
        tx = 314.8182 * (1 - multiplier)


        Letter.style.transform = `matrix(${0.5 + a},0,0,${0.5 + d},${tx},${ty})`
      })
    });
  }

  footerBaselineTranslation() {
    const translationStartPoint = 80
    const translationMultiplier = 100/(100-translationStartPoint)
    if (this.sectionScroll > translationStartPoint) {
      this.footerBaselineElement.style.transform = `translateY(${(100 - this.sectionScroll) * translationMultiplier}%)`
    } else {
      this.footerBaselineElement.style.transform = `translateY(100%)`
    }
  }

}


new Motion()

export default Motion;