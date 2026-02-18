class DragAndDrop{
  // селекторы по атрибутам
  selectors = {
    root: '[data-js-dnd]',
  }

  // css классы состояний
  stateClasses = {
    isDragging: "is-dragging",
  }

  initialState = {
    offsetX: null,
    offsetY: null,
    isDragging: false,
    currentDraggingElement: null,
  }

  constructor(){
    this.state = {...this.initialState}
    this.bindEvents()
  }

  resetState(){
    this.state = {...this.initialState}
  }

  onPointerDown(event){
    const {target, x, y} = event
    const isDraggable = target.matches(this.selectors.root)

    if (!isDraggable) return

    target.classList.add(this.stateClasses.isDragging)

    const { left, top } = target.getBoundingClientRect()

    this.state = {
      offsetX: x - left,
      offsetY: y - top,
      isDragging: true,
      currentDraggingElement: target,
    }
  }

  onPointerMove(event){
    if (!this.state.isDragging) return

    const x = event.pageX - this.state.offsetX
    const y = event.pageY - this.state.offsetY

    console.log(this.state.offsetX, this.state.offsetY)

    this.state.currentDraggingElement.style.left = `${x}px`
    this.state.currentDraggingElement.style.top = `${y}px`
  }

  onPointerUp(){
    if (!this.state.isDragging) return

    this.state.currentDraggingElement.classList.remove(this.stateClasses.isDragging)
    this.resetState()
  }

  bindEvents(){
    document.addEventListener('pointerdown', (event) => this.onPointerDown(event))
    document.addEventListener('pointermove', (event) => this.onPointerMove(event))
    document.addEventListener('pointerup', () => this.onPointerUp())
  }
}

new DragAndDrop()