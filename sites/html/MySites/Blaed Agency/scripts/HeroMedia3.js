class HeroMedia {
  selectors = {
    wrapper: '[data-js-video-wrapper]',
    coverImage: '[data-js-cover-image]',
    canvas: '[data-js-canvas]',
  }

  stateClasses = {
    videoLoaded: "video-loaded"
  }

  constructor() {
    this.wrapperElement = document.querySelector(this.selectors.wrapper)
    this.coverImageElement = document.querySelector(this.selectors.coverImage)
    this.canvasElement = document.querySelector(this.selectors.canvas)
    this.ctx = this.canvasElement.getContext('2d')

    //this.canvasElement.style.opacity = "0"

    this.slicesCount = 4
    this.slices = []

    this.video = null
    this.videoReady = false
    this.useVideo = false

    this.renderLoop = this.renderLoop.bind(this)
    this.animateSlicesRAF = this.animateSlicesRAF.bind(this)

    this.bindEvents()
    this.createImage()
  }


  /* ---------------------------------- */
  /* VIDEO SOURCE */
  /* ---------------------------------- */

  getVideoForScreen() {
    const w = window.innerWidth
    if (w >= 1280) return './videos/blaed-agency-hero-uhd.mp4'
    if (w >= 1024) return './videos/blaed-agency-hero-hd.mp4'
    if (w >= 960) return './videos/blaed-agency-hero-md.mp4'
    return './videos/blaed-agency-hero-ld.mp4'
  }

  /* ---------------------------------- */
  /* IMAGE */
  /* ---------------------------------- */

  createImage() {
    this.img = new Image()
    this.img.src = this.coverImageElement.src

    this.drawTransparent()

    this.img.onload = () => {
      this.getCanvasSize()
      this.sliceHeight = this.canvasHeight / this.slicesCount
      this.prepareSlices()
      this.animateSlicesRAF()
      this.initVideo()
    }
  }

  /* ---------------------------------- */
  /* CANVAS */
  /* ---------------------------------- */

  getCanvasSize() {
    this.canvasWidth = this.canvasElement.width = this.canvasElement.offsetWidth
    this.canvasHeight = this.canvasElement.height = this.canvasElement.offsetHeight
  }

  prepareSlices() {
    this.slices = []

    for (let i = 0; i < this.slicesCount; i++) {
      const fromX = (i % 2 === 0 ? -this.canvasWidth : this.canvasWidth) * 1.2
      this.slices.push({
        index: i,
        fromX,
        offsetX: fromX,
      })
    }
  }

  drawTransparent() { 
    this.ctx.fillStyle = '#fff0'
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  drawBackground() {
    this.ctx.fillStyle = '#fff'
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  drawImageCover() {
    const cw = this.canvasWidth
    const ch = this.canvasHeight

    const iw = this.img.width
    const ih = this.img.height

    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    this.ctx.drawImage(this.img, dx, dy, dw, dh)
  }

  drawSlice(slice) {
    const cw = this.canvasWidth
    const ch = this.sliceHeight

    const iw = this.img.width
    const ih = this.img.height / this.slicesCount

    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale

    const dx = (cw - dw) / 2
    const dy = slice.index * this.sliceHeight + (this.sliceHeight - dh) / 2

    this.ctx.drawImage(
      this.img,
      0,
      ih * slice.index,
      iw,
      ih,
      slice.offsetX + dx,
      dy,
      dw,
      dh
    )
  }

  drawVideo() {
    if (!this.videoReady) return

    const vw = this.video.videoWidth
    const vh = this.video.videoHeight
    const cw = this.canvasWidth
    const ch = this.canvasHeight

    const scale = Math.max(cw / vw, ch / vh)
    const dw = vw * scale
    const dh = vh * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    this.ctx.drawImage(this.video, dx, dy, dw, dh)
  }

  /* ---------------------------------- */
  /* ANIMATION */
  /* ---------------------------------- */

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
  }

  animateSlicesRAF() {

    if (this.coverImageElement.classList.contains(this.stateClasses.videoLoaded)) {
      return
    }

    const duration = 1100
    const start = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = this.easeOutCubic(progress)

      this.slices.forEach(slice => {
        slice.offsetX = slice.fromX * (1 - eased)
      })

      this.drawBackground()
      this.slices.forEach(slice => this.drawSlice(slice))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        requestAnimationFrame(this.renderLoop)
      }
    }

    requestAnimationFrame(animate)
  }

  /* ---------------------------------- */
  /* VIDEO */
  /* ---------------------------------- */

  initVideo() {
    this.video = document.createElement('video')
    this.video.src = this.getVideoForScreen()
    this.video.muted = true
    this.video.loop = true
    this.video.playsInline = true
    this.video.autoplay = true
    this.video.preload = 'auto'

    this.video.addEventListener('canplay', () => {
      this.videoReady = true
      this.useVideo = true
      //this.video.play().catch(() => { })
    })
  }

  /* ---------------------------------- */
  /* MAIN RENDER LOOP */
  /* ---------------------------------- */

  renderLoop() {
    //this.drawBackground()
    this.drawImageCover()

    if (this.useVideo && this.videoReady) {
      this.video.play().catch(() => { })
      this.drawVideo()
    } else {
      this.drawImageCover()

      if (this.coverImageElement.classList.contains(this.stateClasses.videoLoaded)) {
        this.canvasElement.style.opacity = '0'
      }
    }

    requestAnimationFrame(this.renderLoop)
  }

  /* ---------------------------------- */
  /* EVENTS */
  /* ---------------------------------- */

  bindEvents() {
    window.addEventListener('resize', () => {
      this.getCanvasSize()
    })

    document.addEventListener("DOMContentLoaded", () => {
      // this.createImage()
    })
  }
}

new HeroMedia()

export default HeroMedia