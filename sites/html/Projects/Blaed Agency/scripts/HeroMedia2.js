class HeroMedia {
  selectors = {
    wrapper: '[data-js-video-wrapper]',
    coverImage: '[data-js-cover-image]',
    canvas: '[data-js-canvas]',
  }

  constructor() {
    this.wrapperElement = document.querySelector(this.selectors.wrapper)
    this.coverImageElement = document.querySelector(this.selectors.coverImage)
    this.canvasElement = document.querySelector(this.selectors.canvas)
    this.ctx = this.canvasElement.getContext("2d")

    this.slicesCount = 4
    this.slices = []

    this.render = this.render.bind(this)
    this.startVideo = this.startVideo.bind(this)
    this.renderVideoFrame = this.renderVideoFrame.bind(this)
    this.animateSlicesRAF = this.animateSlicesRAF.bind(this)

    this.createImage()
    this.bindEvents()
    this.getCanvasSize()
  }

  getVideoForScreen() {
    const width = window.innerWidth
    if (width >= 1280) return './videos/blaed-agency-hero-uhd.mp4'
    if (width >= 1024) return './videos/blaed-agency-hero-hd.mp4'
    if (width >= 960) return './videos/blaed-agency-hero-md.mp4'
    return './videos/blaed-agency-hero-ld.mp4'
  }

  createImage() {
    this.img = new Image()
    this.img.src = this.coverImageElement.src

    this.img.onload = () => {
      this.getCanvasSize()
      this.sliceHeight = this.canvasHeight / this.slicesCount
      this.prepareSlices()
      this.animateSlicesRAF()
    }
  }

  getCanvasSize() {
    this.canvasWidth = this.canvasElement.width = this.canvasElement.offsetWidth
    this.canvasHeight = this.canvasElement.height = this.canvasElement.offsetHeight
  }

  prepareSlices() {
    this.slices = []

    for (let i = 0; i < this.slicesCount; i++) {
      const fromX = (i % 2 === 0 ? -this.canvasWidth : this.canvasWidth)

      const oneY = this.canvasHeight / this.slicesCount
      const fromYs = [-3 * oneY, -1 * oneY, 2 * oneY, 2 * oneY]

      const fromY = fromYs[i]

      this.slices.push({
        index: i,
        fromX,
        fromY,
        offsetX: fromX,
        offsetY: fromY,
      })
    }
  }

  drawSlice(slice) {
    const cw = this.canvasWidth
    const ch = this.sliceHeight

    const iw = this.img.width
    const ih = this.img.height / this.slicesCount

    const scale = Math.max(cw / iw, ch / ih)
    const drawW = iw * scale
    const drawH = ih * scale

    const dx = (cw - drawW) / 2
    const dy = slice.index * this.sliceHeight + (this.sliceHeight - drawH) / 2

    this.ctx.drawImage(
      this.img,
      0,
      ih * slice.index,
      iw,
      ih,
      slice.offsetX + dx,
      slice.offsetY + dy,
      drawW,
      drawH
    )
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.slices.forEach(slice => this.drawSlice(slice))
  }

  // easing ~ power3.out
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
  }

  animateSlicesRAF() {
    const duration = 1800
    const start = performance.now()

    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = this.easeOutCubic(progress)

      // this.slices.forEach(slice => {
      //   slice.offsetX = slice.fromX * (1 - eased)
      // })

      this.slices.forEach(slice => {
        slice.offsetX = slice.fromX * (Math.max((1 - eased) * 2, 0.5) - 0.5)
        slice.offsetY = slice.fromY * Math.min((1 - eased) * 2, 0.5) * 2 * (slice.fromY < 0 === 0 ? 1 : -1)
      })

      this.render()

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        this.startVideo()
      }
    }

    requestAnimationFrame(animate)
  }

  startVideo() {
    this.coverImageElement.style.transition = "opacity .4s ease"
    this.coverImageElement.style.opacity = 0

    setTimeout(() => {
      this.coverImageElement.style.display = "none"
    }, 400)

    this.video = document.createElement('video')
    this.video.src = this.getVideoForScreen()
    this.video.muted = true
    this.video.loop = true
    this.video.playsInline = true
    this.video.autoplay = true

    this.video.addEventListener('canplay', () => {
      this.video.play().catch(err => console.warn("Autoplay blocked:", err))
      requestAnimationFrame(this.renderVideoFrame)
    })
  }

  renderVideoFrame() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    const vw = this.video.videoWidth
    const vh = this.video.videoHeight
    const cw = this.canvasWidth
    const ch = this.canvasHeight

    const scale = Math.max(cw / vw, ch / vh)
    const drawW = vw * scale
    const drawH = vh * scale
    const dx = (cw - drawW) / 2
    const dy = (ch - drawH) / 2

    this.ctx.drawImage(this.video, dx, dy, drawW, drawH)
    requestAnimationFrame(this.renderVideoFrame)
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.getCanvasSize()
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new HeroMedia()
})
