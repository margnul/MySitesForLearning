//import { gsap } from "gsap";

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
    this.animateSlices = this.animateSlices.bind(this)
    this.startVideo = this.startVideo.bind(this)
    this.renderVideoFrame = this.renderVideoFrame.bind(this)

    this.createImage()
    this.bindEvents()
  }

  // Выбираем подходящее видео по размеру экрана
  getVideoForScreen() {
    const width = window.innerWidth

    if (width < 1280) return './videos/blaed-agency-hero-uhd.mp4'
    if (width < 1024) return './videos/blaed-agency-hero-hd.mp4'
    if (width < 960) return './videos/blaed-agency-hero-md.mp4'
    return './videos/blaed-agency-hero-ld.mp4'
  }

  // Загружаем превью для анимации
  createImage() {
    this.img = new Image()
    this.img.src = this.coverImageElement.src

    this.img.onload = () => {
      this.canvasWidth = this.canvasElement.width = this.canvasElement.offsetWidth
      this.canvasHeight = this.canvasElement.height = this.canvasElement.offsetHeight

      this.sliceHeight = this.canvasHeight / this.slicesCount

      this.prepareSlices()
      this.animateSlices()
    }
  }

  getCanvasSize() {
    this.canvasWidth = this.canvasElement.width = this.canvasElement.offsetWidth
    this.canvasHeight = this.canvasElement.height = this.canvasElement.offsetHeight
  }

  prepareSlices() {
    this.slices = []

    for (let i = 0; i < this.slicesCount; i++) {
      this.slices.push({
        index: i,
        offsetX: (i % 2 === 0 ? -this.canvasWidth : this.canvasWidth),
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
      dy,
      drawW,
      drawH
    )
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.slices.forEach(slice => this.drawSlice(slice))
  }

  animateSlices() {
    gsap.to(this.slices, {
      duration: 1.2,
      ease: "power3.out",
      offsetX: 0,
      onUpdate: this.render,
      onComplete: this.startVideo,
    })
  }

  // Создаём и запускаем видео в Canvas
  startVideo() {
    // скрыть превью
    this.coverImageElement.style.transition = "opacity .4s ease"
    this.coverImageElement.style.opacity = 0
    setTimeout(() => {
      this.coverImageElement.style.display = "none"
    }, 400)

    // создаём видео
    this.video = document.createElement('video')
    this.video.src = this.getVideoForScreen()
    this.video.muted = true
    this.video.loop = true
    this.video.playsInline = true
    this.video.autoplay = true

    // как только видео готово к воспроизведению, начинаем рендерить в Canvas
    this.video.addEventListener('canplay', () => {
      this.video.play().catch(err => console.warn("Autoplay blocked:", err))
      requestAnimationFrame(this.renderVideoFrame)
    })
  }

  // Рендер видео в Canvas каждый кадр
  renderVideoFrame() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    // масштабируем видео под Canvas (object-fit: cover)
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
  new HeroMedia();
});

export default HeroMedia