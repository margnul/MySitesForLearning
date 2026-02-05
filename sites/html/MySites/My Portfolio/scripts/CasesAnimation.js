class CasesAnimation {
  selectors = {
    case: '[data-js-case]',
    casesAlbum: '[data-js-cases-album]',
  }

  stateClasses = {
    animateTransition: 'to-animate-transition'
  }

  constructor() {
    this.caseElements = Array.from(
      document.querySelectorAll(this.selectors.case)
    )
    this.casesAlbumElement = document.querySelector(this.selectors.casesAlbum)

    this.mouseX = 0
    this.mouseY = 0
    this.hasMouse = false

    this.albumRect = null
    this.caseRects = []

    this.updateRects()
    this.bindEvents()
    this.animate()
    this.onWindowBlur()
  }

  /* -------------------------
     EVENTS
  -------------------------- */

  onMouseMove(e) {
    this.hasMouse = true
    this.mouseX = e.clientX
    this.mouseY = e.clientY

    console.log(this.mouseX, this.mouseY)
  }

  onScroll() {
    // при скролле позиции DOM меняются
    this.updateRects()
  }

  onResize() {
    this.updateRects()
  }

  onWindowBlur() {
    this.hasMouse = false
    this.setToDefault()
  }

  onVisibilityChange() {
    if (document.hidden) {
      this.hasMouse = false
      this.setToDefault()
    }
  }

  onMouseLeave() {
    this.hasMouse = false
    this.setToDefault()
  }

  bindEvents() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true })
    window.addEventListener('resize', () => this.onResize())
    window.addEventListener('blur', () => this.onWindowBlur())
    document.addEventListener('visibilitychange', () => this.onVisibilityChange())
    this.casesAlbumElement.addEventListener('mousemove', e => this.onMouseMove(e))
    this.casesAlbumElement.addEventListener('mouseleave', () => this.onMouseLeave())
  }

  /* -------------------------
     GEOMETRY
  -------------------------- */

  updateRects() {
    this.albumRect = this.casesAlbumElement.getBoundingClientRect()
    this.caseRects = this.caseElements.map(el =>
      el.getBoundingClientRect()
    )
  }

  /* -------------------------
     ANIMATION LOOP
  -------------------------- */

  animate() {
    if (this.hasMouse) {
      this.updateAnimation()
    }

    requestAnimationFrame(() => this.animate())
  }

  updateAnimation() {
    const maxDistance = Math.hypot(
      this.albumRect.width,
      this.albumRect.height
    )

    this.caseElements.forEach((el, index) => {
      const rect = this.caseRects[index]

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.hypot(
        centerX - this.mouseX,
        centerY - this.mouseY
      )

      const normalized = Math.min(distance / maxDistance, 1)

      const value = this.animationFunction(normalized)

      el.classList.remove(this.stateClasses.animateTransition)
      el.style.setProperty('--animator', value)
    })
  }

  /* -------------------------
     EASING
  -------------------------- */

  animationFunction(d) {
    // d: 0 (близко) → 1 (далеко)
    const influence = 1 - d
    return Math.pow(influence, 3)
  }


  setToDefault() {
    this.caseElements.forEach((el) => {
      el.classList.add(this.stateClasses.animateTransition)
      el.style.setProperty('--animator', 0)
    })
  }
}

new CasesAnimation()
export default CasesAnimation
