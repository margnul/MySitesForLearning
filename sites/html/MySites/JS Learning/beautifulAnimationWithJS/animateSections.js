const sectionElements = document.querySelectorAll('section')

const animateSections = () => {
  sectionElements.forEach((sectionElement) => {
    sectionElement.classList.add('is-visible')
  })
}

document.addEventListener('preloaderClosed', () => {
  animateSections()
})