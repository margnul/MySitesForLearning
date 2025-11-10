class ParagraphAnimation {

  selectors = {
    animatedText: '[data-js-animated-text]',
    animatedSection: '[data-js-animated-section]',
    animatedCanvas: '[data-js-animated-canvas]',
  }

  constructor() {
    this.animatedTextElement = document.querySelector(this.selectors.animatedText)
    this.animatedSectionElement = document.querySelector(this.selectors.animatedSection)
    this.canvas = document.querySelector(this.selectors.animatedCanvas)
    this.context = this.canvas.getContext("2d")

    this.frameCount = 75
    const currentFrame = i =>
      `../videos/video4-frames/frame_${String(i).padStart(2, '0')}_delay-0.04s.png`

    this.images = []

    for (let i = 0; i < this.frameCount; i++) {
      const img = new Image()
      img.src = currentFrame(i)
      this.images.push(img)
    }

    // init first frame
    this.img = new Image()
    this.img.onload = () => this.drawFrame()
    this.img.src = currentFrame(0)

    this.bindEvents()
  }

  drawFrame() {
    if (!this.img.complete) return

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Fit to canvas (like object-fit: cover)
    const scale = Math.max(
      this.canvas.width / this.img.width,
      this.canvas.height / this.img.height
    )

    const x = (this.canvas.width / 2) - (this.img.width / 2) * scale
    const y = (this.canvas.height / 2) - (this.img.height / 2) * scale

    this.context.drawImage(
      this.img,
      x, y,
      this.img.width * scale,
      this.img.height * scale
    )
  }

  bindEvents() {
    window.addEventListener("scroll", () => {
      const rect = this.animatedSectionElement.getBoundingClientRect()
      const progress = Math.min(Math.max(0, (window.innerHeight / 2 - rect.top ) / rect.height), 1)

      const frameIndex = Math.min(
        this.frameCount - 1,
        Math.floor(progress * this.frameCount)
      )

      const nextFrame = this.images[frameIndex]

      if (nextFrame.complete) {
        this.img = nextFrame
        this.drawFrame()
      }
    })
  }
}

export default ParagraphAnimation
