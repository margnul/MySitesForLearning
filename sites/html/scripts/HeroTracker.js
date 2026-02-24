class HeroTracker {
  selectors = {
    tracker: '[data-js-tracker]',
    heroSection: '[data-js-hero-section]',
  }

  constructor() {
    this.trackerElement = document.querySelector(this.selectors.tracker)
    this.heroSectionElement = document.querySelector(this.selectors.heroSection)

    this.currentX = 0
    this.currentY = 0
    this.goalPreviewCardX = 0
    this.goalPreviewCardY = 0

    this.bindEvents()
    this.animate()
  }

  setTargetPosition(e) {
    const rect = this.heroSectionElement.getBoundingClientRect()
    const tracker = this.trackerElement.getBoundingClientRect()

    this.goalPreviewCardX = e.clientX - rect.left - tracker.width / 2
    this.goalPreviewCardY = e.clientY - rect.top - tracker.height / 2
  }

  animate() {
    const ease = 0.04

    this.currentX += (this.goalPreviewCardX - this.currentX) * ease
    this.currentY += (this.goalPreviewCardY - this.currentY) * ease

    this.trackerElement.style.setProperty(
      '--tracker-x',
      `${this.currentX}px`
    )
    this.trackerElement.style.setProperty(
      '--tracker-y',
      `${this.currentY}px`
    )

    requestAnimationFrame(() => this.animate())
  }


  bindEvents() {
    document.addEventListener('mousemove', e => {
      this.setTargetPosition(e)
    })
  }

}

new HeroTracker()
export default HeroTracker
