class CasesAnimation {
  selectors = {
    case: '[data-js-case]',
  }

  stateClasses = {
    hovered: 'is-hovered',
    neighbourHovered: 'is-neighbour-hovered',
  }

  constructor() {
    this.caseElements = Array.from(
      document.querySelectorAll(this.selectors.case)
    )

    this.bindEvents()
  }

  onHover(el) {
    el.classList.add(this.stateClasses.hovered)
  }

  onHoverNeighbour(el) {
    if (!el) return
    el.classList.add(this.stateClasses.neighbourHovered)
  }

  removeAnimations() {
    this.caseElements.forEach(el => {
      el.classList.remove(this.stateClasses.hovered)
      el.classList.remove(this.stateClasses.neighbourHovered)
    })
  }

  bindEvents() {
    this.caseElements.forEach((element, index) => {
      element.addEventListener('mouseenter', () => {
        this.removeAnimations()

        this.onHover(element)
        this.onHoverNeighbour(this.caseElements[index - 1])
        this.onHoverNeighbour(this.caseElements[index + 1])
      })

      element.addEventListener('click', () => {
        //console.log(element)
      })

      element.addEventListener('mouseleave', () => {
        this.removeAnimations()
      })
    })
  }
}

new CasesAnimation()

export default CasesAnimation
