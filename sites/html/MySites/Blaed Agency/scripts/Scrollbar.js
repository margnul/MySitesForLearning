class Scrollbar {

  selectors = {
    scrollthumb: '[data-js-scrollthumb]',
  }

  stateClasses = {
    isDragging: 'is-dragging',
  }

  initialState = {
    offsetY: null,
    isDragging: false,
    currentDraggingElement: null,
  }

  constructor() {
    this.scrollthumbElements = document.querySelectorAll(this.selectors.scrollthumb)

    this.state = { ...this.initialState }

    this.scrollthumbHeight = 0;
    this.scrollbarMargin = 20; // px

    this.bindEvents()
    this.updateHeight()
  }

  onPointerDown(event) {
    const { target, y } = event
    const isScrollthumb = target.matches(this.selectors.scrollthumb)

    if (!isScrollthumb) {
      return
    }

    target.classList.add(this.stateClasses.isDragging)
    const { top } = target.getBoundingClientRect()

    this.state = {
      offsetY: y - top,
      isDragging: true,
      currentDraggingElement: target,
    }

    this.preventTextSelection(true)
    window.removeEventListener('scroll', this.handleScroll)
    //this.updateHeight(1.3)
  }

  onPointerMove(event) {
    if (!this.state.isDragging) {
      return
    }

    const y = event.clientY - this.state.offsetY

    const yClamped = Math.max(0, Math.min(y, window.innerHeight - this.scrollbarMargin - this.scrollthumbHeight))

    this.scrollthumbElements.forEach(el => {
      el.style.setProperty('--scrollthumb-progress', (yClamped) + 'px');
    })

    
    const progress = yClamped / (window.innerHeight - this.scrollbarMargin - this.scrollthumbHeight)
    const scrollPosition = progress * (document.documentElement.scrollHeight - window.innerHeight + this.scrollbarMargin)

    window.scrollTo({
      top: scrollPosition,
      behavior: 'instant' // или 'auto' для мгновенной прокрутки
    })
  }

  onPointerUp() {
    if (!this.state.isDragging) {
      return
    }

    this.state.currentDraggingElement.classList.remove(this.stateClasses.isDragging)
    this.state = { ...this.initialState }

    this.preventTextSelection(false)
    window.addEventListener('scroll', this.handleScroll)
    //this.updateHeight()
  }

  handleScroll = () => {
    this.updateHeight()
    this.updatePositionOnScroll()
  }

  updateHeight(coefficient = 1.8) {
    const siteHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight - this.scrollbarMargin

    this.scrollthumbHeight = windowHeight / siteHeight * windowHeight / coefficient

    this.scrollthumbElements.forEach(el => {
      el.style.setProperty('--scrollthumb-height', this.scrollthumbHeight + 'px');
    })
  }

  updatePositionOnScroll() {
    if (this.scrollthumbHeight === 0) {
      this.updateHeight()
      return
    }

    const siteHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight - this.scrollbarMargin
    const scrollingProgress = window.scrollY
    const progress = scrollingProgress / (siteHeight - windowHeight)

    const moving = (windowHeight - this.scrollthumbHeight) * progress

    this.scrollthumbElements.forEach(el => {
      el.style.setProperty('--scrollthumb-progress', (moving) + 'px');
    })
  }

  bindEvents() {
    window.addEventListener('scroll', this.handleScroll)

    document.addEventListener('pointerdown', (event) => this.onPointerDown(event))
    document.addEventListener('pointermove', (event) => this.onPointerMove(event))
    document.addEventListener('pointerup', (event) => this.onPointerUp())
  }

  preventTextSelection(prevent) {
    if (prevent) {
      // Блокируем выделение текста
      document.addEventListener('selectstart', this.preventDefault)
      document.addEventListener('dragstart', this.preventDefault)
      // CSS-класс для отключения выделения
      document.body.classList.add('no-selection')
    } else {
      // Восстанавливаем нормальное поведение
      document.removeEventListener('selectstart', this.preventDefault)
      document.removeEventListener('dragstart', this.preventDefault)
      document.body.classList.remove('no-selection')
    }
  }
}

new Scrollbar()

export default Scrollbar