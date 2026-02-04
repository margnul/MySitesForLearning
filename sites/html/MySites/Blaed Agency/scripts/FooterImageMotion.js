class FooterImageMotion{
  selectors = {
    imageWrapper: '[data-js-foter-image-wrapper]',
    imageObject: '[data-js-foter-image-object]',
    footer: '[data-js-footer]',
  }

  constructor() {
    this.imageWrapperElement = document.querySelector(this.selectors.imageWrapper)
    this.imageObjectElement = this.imageWrapperElement.querySelector(this.selectors.imageObject)
    this.footerElement = document.querySelector(this.selectors.footer)

    this.bindEvents()
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      const y2 = this.footerElement.getBoundingClientRect().bottom
      const y1 = this.imageWrapperElement.getBoundingClientRect().top
      const H = window.innerHeight
      const duration = y2 - y1

      const wrapperHeight = this.imageWrapperElement.getBoundingClientRect().height
      const imageHeight = this.imageObjectElement.getBoundingClientRect().height

      const difference = wrapperHeight - imageHeight

      const value = difference * (1 - (y2 - H) / duration)
    
      if (y2 - H < duration) {
        this.imageObjectElement.style.setProperty('transform', `translate3d(0px, ${value}px, 0px)`)
      }

      //console.log(window.scrollY, y2 - H, duration)
    })
  }


}


new FooterImageMotion()

export default FooterImageMotion