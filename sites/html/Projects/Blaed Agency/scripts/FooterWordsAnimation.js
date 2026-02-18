class FooterWordsAnimation{
  selectors = {
    motionRow: '[data-js-cta-row-motion]',
    word: '[data-js-cta-word]',
    letter: '[data-js-cta-letter]',
  }

  constructor() {
    this.motionRowElement = document.querySelector(this.selectors.motionRow)
    this.words = this.motionRowElement.querySelectorAll(this.selectors.word)
    this.letters = [...this.words].map((item) => item.querySelectorAll(this.selectors.letter))

    this.indexToMove = 0

    this.bindEvents()
  }

  moveObject(ind) {
    
  }

  bindEvents() {
    document.addEventListener('DOMContentLoaded', () => {

    })
  }

}


new FooterWordsAnimation()

export default FooterWordsAnimation