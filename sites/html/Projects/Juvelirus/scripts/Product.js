import productsData from './data/product-data.json' with { type: 'json' };

class Product{
  selectors = {
    productBrand: '[data-js-product-brand]',
    productName: '[data-js-product-name]',
    productDetails: '[data-js-product-details]',
    productDescription: '[data-js-product-description]',
    productPrice: '[data-js-product-price]',
    productImage: '[data-js-product-image]',
    addToCartButton: '[data-js-product-add-to-cart]',
    pageTitle: '[data-js-title-element]',
  }

  stateClasses = { 
    isActive: 'is-active'
  }

  constructor() {
    this.productBrandElement = document.querySelector(this.selectors.productBrand)
    this.productNameElement = document.querySelector(this.selectors.productName)
    this.productDetailsElement = document.querySelector(this.selectors.productDetails)
    this.productDescriptionElement = document.querySelector(this.selectors.productDescription)
    this.productPriceElement = document.querySelector(this.selectors.productPrice)
    this.productImageElements = document.querySelectorAll(this.selectors.productImage)
    this.addToCartButtonElement = document.querySelector(this.selectors.addToCartButton)
    this.pageTitleElement = document.querySelector(this.selectors.pageTitle)

    this.productId = window.location.search
      .replace('?', '').split('=')[1]
    
    this.productId === undefined ? this.productId = 1 : null
    
    this.replaceText()
    this.bindEvents()
  }

  replaceText() {
    const { brand, name, materials, description, price, image, srcset} = productsData.products[this.productId-1]
    this.productBrandElement.innerHTML = brand
    this.productNameElement.innerHTML = name
    this.productDetailsElement.innerHTML = materials
    this.productDescriptionElement.innerHTML = description
    this.productPriceElement.innerHTML = price
    this.productImageElements.forEach((productImageElement) => {
      productImageElement.setAttribute('src', image)
      productImageElement.setAttribute('srcset', srcset)
      productImageElement.setAttribute('sizes', "(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1023px) 50vw, 35vw")
    })
    this.pageTitleElement.innerHTML = brand + " - " + name
  }

  bindEvents() {
    this.addToCartButtonElement.addEventListener('click', () => this.addToCartButtonClicked())
  }

  addToCartButtonClicked() {
    let browserCartData = JSON.parse(localStorage.getItem('cart'));
    if (browserCartData === null) {
      browserCartData = []
    }
    browserCartData.push(this.productId)
    localStorage.setItem('cart', JSON.stringify(browserCartData));
    //console.log(browserCartData)
    this.addToCartButtonElement.classList.add(this.stateClasses.isActive)
    this.addToCartButtonElement.innerHTML = "Добавлено"
  }
}

export default Product
