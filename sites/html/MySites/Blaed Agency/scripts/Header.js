

class Header {
  selectors = {
    navButton: '[data-js-nav-button]',
    navWrapper: '[data-js-nav-wrapper]',
    baselineWrapepr: '[data-js-baseline-wrapper]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.navButtonElement = document.querySelector(this.selectors.navButton)
    this.navWrapperElement = document.querySelector(this.selectors.navWrapper)
    this.baselineWrapperElement = document.querySelector(this.selectors.baselineWrapepr)

    this.bindEvents()
  }

  bindEvents() {
    this.navButtonElement.addEventListener('click', (btn) => {
      btn.preventDefault()

      const isButtonActive = this.navButtonElement.classList.contains(this.stateClasses.isActive)

      this.navButtonElement.classList.toggle(this.stateClasses.isActive, !isButtonActive)
      this.navWrapperElement.classList.toggle(this.stateClasses.isActive, !isButtonActive)
    })
  }

}

new Header()

export default Header;