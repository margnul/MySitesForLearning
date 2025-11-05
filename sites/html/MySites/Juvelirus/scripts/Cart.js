import productsData from './data/product-data.json' with { type: 'json' };

class Cart {
  selectors = {
    deleteButton: '[data-js-cart-delete-button]',
    confirmTile: '[data-js-cart-product-delete-confirmation]',
    confirmButton: '[data-js-cart-product-delete-confirmation-confirm]',
    cancelButton: '[data-js-cart-product-delete-confirmation-cancel]',

    cartWrapper: '[data-js-cart-wrapper]',

    orderScreen: '[data-js-order-screen]',
    orderButton: '[data-js-order-button]',
    cancelOrderButton: '[data-js-cancel-order-button]',

    myHtml: '[data-js-html-element]',
  }

  stateClasses = {
    isActive: 'is-active',
    isScrollLocked: 'is-lock',
  }

  constructor() {
    this.cartWrapperElement = document.querySelector(this.selectors.cartWrapper)

    this.orderScreenElement = document.querySelector(this.selectors.orderScreen)
    this.orderButtonElement = document.querySelector(this.selectors.orderButton)
    this.cancelOrderButtonElement = document.querySelector(this.selectors.cancelOrderButton)

    this.myHtmlElement = document.querySelector(this.selectors.myHtml)

    this.addElementsToCart()
    //this.connectElements()
    //this.bindEvents()
  }

  connectElements() {
    this.deleteButtonElements = document.querySelectorAll(this.selectors.deleteButton)
    this.confirmTileElements = document.querySelectorAll(this.selectors.confirmTile)
    this.confirmButtonElements = document.querySelectorAll(this.selectors.confirmButton)
    this.cancelButtonElements = document.querySelectorAll(this.selectors.cancelButton)
  }

  bindEvents() {
    this.deleteButtonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => this.onDeleteButtonClick(index))
    })

    this.cancelButtonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => this.onCancelButtonClick(index))
    })

    this.confirmButtonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => this.onConfirmButtonClick(index))
    })

    //console.log(this.orderButtonElement)
    this.orderButtonElement.addEventListener('click', () => this.onOrderButtonClick())
    this.cancelOrderButtonElement.addEventListener('click', () => this.onCancelOrderButtonClick())
  }

  simpleFunc() {
    console.log("happened!")
  }

  onDeleteButtonClick(index) {
    this.confirmTileElements[index].classList.add(this.stateClasses.isActive)
  }

  onCancelButtonClick(index) {
    this.confirmTileElements[index].classList.remove(this.stateClasses.isActive)
  }

  getDataForCart() {
    const browserCartData = localStorage.getItem('cart')

    try {
      return JSON.parse(browserCartData)
    } catch (e){
      console.log(e)
      return false
    } 
    
  }

  async loadTemplate() {
    const response = await fetch('./product-cart-template.html')
    return await response.text()
  }

  async generateItem(itemData) {
    const template = await this.loadTemplate()
    const {id, brand, name, price} = itemData

    return template
      .replace(/{id}/g, id)
      .replace(/{brand}/g, brand)
      .replace(/{name}/g, name)
      .replace(/{price}/g, price)
  }

  async addElementsToCart() {
    const productIDs = this.getDataForCart()
    this.cartWrapperElement.innerHTML = ""

    if (productIDs == false || productIDs == null) {

      this.orderButtonElement.classList.remove(this.stateClasses.isActive)
      const response = await fetch('./emplty-cart-message.html')
      const responseText = await response.text()
      this.cartWrapperElement.insertAdjacentHTML('beforeend', responseText)

    } else {

      this.orderButtonElement.classList.add(this.stateClasses.isActive)
      for (const productID of productIDs) {
        const cartItemHTML = await this.generateItem(productsData.products[productID-1])

        this.cartWrapperElement.insertAdjacentHTML('beforeend', cartItemHTML)
      }
    }

    this.connectElements()
    this.bindEvents()
  }

  onConfirmButtonClick(index) {
    const productIDs = this.getDataForCart()
    productIDs.splice(index, 1)
    localStorage["cart"] = JSON.stringify(productIDs)
    this.addElementsToCart()
  }

  onOrderButtonClick() {
    this.orderScreenElement.classList.add(this.stateClasses.isActive)
    this.myHtmlElement.classList.add(this.stateClasses.isScrollLocked)
  }

  onCancelOrderButtonClick() {
    this.orderScreenElement.classList.remove(this.stateClasses.isActive)
    this.myHtmlElement.classList.remove(this.stateClasses.isScrollLocked)
  }
}

export default Cart;