class VideoTranslation {
  selectors = {
    videoSection: '[data-js-video-section]',
    videoWrapper: '[data-js-video-section-video-wrapper]',
    videoBackground: '[data-js-video-section-video-background]',
    mainVideoWrapper: '[data-js-video-section-main-video-wrapper]',
    mainVideoFitting: '[data-js-video-section-main-video-fitting]',
    mainVideo: '[data-js-video-section-main-video]',
    description: '[data-js-video-section-description]',
    descriptionLine: '[data-js-video-section-description-line]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  clip(value, min, max) {
    return Math.max(Math.min(value, max), min)
  }

  constructor() {
    this.videoSectionElement = document.querySelector(this.selectors.videoSection)
    this.videoWrapperElement = document.querySelector(this.selectors.videoWrapper)
    this.videoBackgroundElement = document.querySelector(this.selectors.videoBackground)
    this.mainVideoWrapperElement = document.querySelector(this.selectors.mainVideoWrapper)
    this.mainVideoFittingElement = document.querySelector(this.selectors.mainVideoFitting)
    this.mainVideoElement = document.querySelector(this.selectors.mainVideo)
    this.descriptionElement = document.querySelector(this.selectors.description)
    this.descriptionLineElements = document.querySelectorAll(this.selectors.descriptionLine)

    this.sectionScroll = 0
    this.mainVideoElement.pause()

    this.scrollCheckDisabled = false
    this.translationEnabled = false

    this.bindEvents()
  }

  updateTranslation() {
    const multiplier = 0.4
    const coefficient = 1.9;
    let value = 0 //this.sectionScroll
    let scalerY = 0
    let scalerX = 0

    if (this.sectionScroll < 35) {
      scalerY = 70 - (this.sectionScroll * 2)
      scalerX = scalerY / 6
    }
    
    if (this.sectionScroll > 70) {
      value = this.sectionScroll * ((this.sectionScroll - 70) / 30 * coefficient)
    }

    this.videoWrapperElement.style.setProperty("--translation", `${value * multiplier}`);
    this.videoWrapperElement.style.setProperty("--scalerY", `${scalerY}%`);
    this.videoWrapperElement.style.setProperty("--scalerX", `${scalerX}%`);

    //this.descriptionElement.style.setProperty("--translation", `${value * multiplier}`);
  }

  translateMainVideo() {
    //console.log(this.sectionScroll)

    let translation = 0

    // if (this.sectionScroll > 60 && this.sectionScroll < 75 && this.translationEnabled) {
    //   translation = (this.sectionScroll - 67) * 2.5
    // }

    if (this.translationEnabled) {
      //translation = (this.sectionScroll - 67) * 2.5
      translation = (this.sectionScroll - 60.6) * 2.5
    }

    //translation = (this.sectionScroll - 67) * 2.5
    
    this.mainVideoWrapperElement.style.setProperty("--translation", `${translation}%`);
    //this.mainVideoFittingElement.style.setProperty("--translation", `${translation}%`);
  }

  checkToCloseVideo() {
    if (this.scrollCheckDisabled) return

    const rect = this.mainVideoWrapperElement.getBoundingClientRect()

    const percentage = 5

    //rect.top < -(window.innerHeight * percentage / 100)

    const topLimit = rect.bottom < window.innerHeight - (window.innerHeight / 20)
    const bottomLimit = rect.bottom > window.innerHeight + (window.innerHeight * percentage / 100)

    if (topLimit || bottomLimit) { 
      this.deactivateVideo()
    }
  }

  updateDescriptionLines() {
    this.descriptionLineElements.forEach((e, index) => {
      const start = 30
      const end = 40
      const dur = end - start

      const differCoefficient = 0.1

      let translator = 1

      if (this.sectionScroll > start) {
        translator = (end - this.sectionScroll) / dur
        translator += differCoefficient * index
      }

      translator = Math.max(translator, 0)

      // if (this.sectionScroll > end) {
      //   translator = 0
      // }

      e.style.setProperty("--translator", `${(1-translator)*100}%`);
    });
  }

  activateVideo() {
    if (!window.lenis) return;

    this.mainVideoWrapperElement.classList.add(this.stateClasses.isActive)
    this.descriptionElement.classList.remove(this.stateClasses.isActive)
    this.videoWrapperElement.classList.add(this.stateClasses.isActive)
    this.videoBackgroundElement.classList.add(this.stateClasses.isActive)


    const sectionTop =
      window.scrollY + this.videoSectionElement.getBoundingClientRect().top

    const targetScroll = sectionTop + window.innerHeight * 2

    this.scrollCheckDisabled = true
    this.translationEnabled = false

    window.lenis.scrollTo(targetScroll, {
      duration: .1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    this.mainVideoElement.currentTime = 0
    this.mainVideoElement.play()

    setTimeout(() => {
      this.scrollCheckDisabled = false
      this.translationEnabled = true
    }, 1600)
  }

  deactivateVideo() {
    this.mainVideoWrapperElement.classList.remove(this.stateClasses.isActive)
    this.descriptionElement.classList.add(this.stateClasses.isActive)
    this.videoWrapperElement.classList.remove(this.stateClasses.isActive)
    this.videoBackgroundElement.classList.remove(this.stateClasses.isActive)
    this.mainVideoElement.pause()

    setTimeout(() => {
      this.translationEnabled = false
      this.mainVideoWrapperElement.style.setProperty("--translation", `${0}%`);
    }, 800)
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      let x = this.videoSectionElement.getBoundingClientRect().top
      let H = this.videoSectionElement.getBoundingClientRect().height
      const offsetTop = 0 // window.innerHeight / 2 
      const offsetBottom = 0 // window.innerHeight

      H += offsetTop - offsetBottom
      x -= offsetTop

      this.sectionScroll = this.clip(-x / H, 0, 1) * 100

      this.updateTranslation()
      this.updateDescriptionLines()
      this.checkToCloseVideo()
      this.translateMainVideo()
      this.autoDescriptionHiddener()

      //const rect = this.mainVideoWrapperElement.getBoundingClientRect()

      //console.log(rect.top, rect.bottom, window.innerHeight - 100, this.sectionScroll)
    })

    this.videoWrapperElement.addEventListener('click', () => {
      this.activateVideo()
    })

    this.mainVideoWrapperElement.addEventListener('click', () => {
      this.deactivateVideo()
    })
  }

  autoDescriptionHiddener() {
    if (this.sectionScroll > 70) {
      this.descriptionElement.classList.remove(this.stateClasses.isActive)
    }
  }

}

new VideoTranslation()

export default VideoTranslation;