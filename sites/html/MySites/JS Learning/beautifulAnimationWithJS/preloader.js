const preloaderElement = document.querySelector(".preloader")

preloaderElement.addEventListener('animationend', (event) => {
  if(event.animationName === 'fade-out'){
    preloaderElement.dispatchEvent(
      new CustomEvent('preloaderClosed', {
        bubbles: true,
        detail: {
          closeAnimationName: event.animationName,  
          closeAnimationDuration: event.elapsedTime,
        }
      })
    )
  }
})