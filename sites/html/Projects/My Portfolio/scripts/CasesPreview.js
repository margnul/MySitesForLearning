class CasesPreview {
  selectors = {
    caseCard: '[data-js-case-card]',
    previewCard: '[data-js-preview-card]',
    casesSection: '[data-js-cases-section]',
  }

  stateClasses = {
    isActive: 'is-active'
  }

  links = {
    Aaronn: [
      "./images/cases/Aaronn/0.png",
      "./images/cases/Aaronn/1.png",
      "./images/cases/Aaronn/2.png",
      "./images/cases/Aaronn/3.png",
      "./images/cases/Aaronn/4.png",
    ],
    Blaed: [
      "./images/cases/Blaed/0.png",
      "./images/cases/Blaed/1.png",
      "./images/cases/Blaed/2.png",
      "./images/cases/Blaed/3.png",
      "./images/cases/Blaed/4.png",
    ],
    FutureTech: [
      "./images/cases/FutureTech/0.png",
      "./images/cases/FutureTech/1.png",
      "./images/cases/FutureTech/2.png",
      "./images/cases/FutureTech/3.png",
      "./images/cases/FutureTech/4.png",
    ],
    Nexcent: [
      "./images/cases/Nexcent/0.png",
      "./images/cases/Nexcent/1.png",
    ],
    NoTab: [
      "./images/cases/NoTab/0.png",
      "./images/cases/NoTab/1.png",
      "./images/cases/NoTab/2.png",
    ],
    Positivus: [
      "./images/cases/Positivus/0.png",
      "./images/cases/Positivus/1.png",
      "./images/cases/Positivus/2.png",
      "./images/cases/Positivus/3.png",
    ]
  }

  aspectRatios = {
    Aaronn: 946/1262,
    Blaed: 1319/1120,
    FutureTech: 1,
    Nexcent: 977/1302,
    NoTab: 963/1284,
    Positivus: 954/1272
  }

  constructor() {
    this.caseCardElements = document.querySelectorAll(this.selectors.caseCard)
    this.previewCardElement = document.querySelector(this.selectors.previewCard)
    this.previewImageElement = this.previewCardElement.querySelector('img')
    this.casesSectionElement = document.querySelector(this.selectors.casesSection)

    this.currentX = 0
    this.currentY = 0
    this.goalPreviewCardX = 0
    this.goalPreviewCardY = 0

    this.timeout = null


    this.currentCaseKey = null
    this.imageIndex = 0
    this.imageInterval = null

    this.bindEvents()
    this.animate()
  }


  startImageRotation(caseKey) {
    if (this.currentCaseKey === caseKey) return

    this.stopImageRotation()

    this.currentCaseKey = caseKey
    this.imageIndex = 0

    const images = this.links[caseKey]
    if (!images || !images.length) return

    this.previewImageElement.src = images[this.imageIndex]
    const width = this.previewCardElement.getBoundingClientRect().width
    const imgHeight = width / this.aspectRatios[caseKey]
    console.log(width, imgHeight)
    this.previewCardElement.style.setProperty(
      "--preview-card-height",
      imgHeight.toString() + "px"
    )

    this.imageInterval = setInterval(() => {
      this.imageIndex = (this.imageIndex + 1) % images.length
      this.previewImageElement.src = images[this.imageIndex]
    }, 1000)
  }

  stopImageRotation() {
    clearInterval(this.imageInterval)
    this.imageInterval = null
    this.currentCaseKey = null
  }


  setTargetPosition(e) {
    const rect = this.casesSectionElement.getBoundingClientRect()

    this.goalPreviewCardX = e.clientX - rect.left
    this.goalPreviewCardY = e.clientY - rect.top
  }

  animate() {
    const ease = 0.04

    this.currentX += (this.goalPreviewCardX - this.currentX) * ease
    this.currentY += (this.goalPreviewCardY - this.currentY) * ease

    this.previewCardElement.style.setProperty(
      '--pos-x',
      `${this.currentX}px`
    )
    this.previewCardElement.style.setProperty(
      '--pos-y',
      `${this.currentY}px`
    )

    requestAnimationFrame(() => this.animate())
  }


  activatePreviewCard() {
    this.previewCardElement.classList.add(this.stateClasses.isActive)
  }

  hidePreviewCard() {
    this.previewCardElement.classList.remove(this.stateClasses.isActive)
  }


  bindEvents() {
    document.addEventListener('mousemove', e => {
      const caseCard = e.target.closest(this.selectors.caseCard)

      this.setTargetPosition(e)

      const caseKey = caseCard.dataset.case || caseCard.id

      if (caseCard) {
        clearTimeout(this.timeout)
        this.activatePreviewCard()
        this.startImageRotation(caseKey)
      }
    })

    this.caseCardElements.forEach(element => {
      element.addEventListener('mouseleave', () => {
        this.stopImageRotation()
        this.timeout = setTimeout(() => {
          this.hidePreviewCard()
        }, 400)
      })
    })
  }

}

new CasesPreview()
export default CasesPreview
