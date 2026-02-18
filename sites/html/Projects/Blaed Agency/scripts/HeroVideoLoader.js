class HeroVideoLoader {

  stateClasses = {
    videoLoaded: "video-loaded"
  }

  constructor() {
    this.videos = Array.from(document.querySelectorAll('[data-js-video]'))
    this.cover = document.querySelector('[data-js-cover-image]')
    this.canvas = document.querySelector('[data-js-canvas]')
    this.isPausePassed = false
    this.isVideoReady = false

    this.showCover()

    setTimeout(() => {
      this.isPausePassed = true
      this.tryHideCover()
    }, 1200)

    this.activeVideo = this.pickBestVideo()
    this.init()
  }

  init() {
    if (!this.activeVideo) return

    this.activeVideo.src = this.activeVideo.dataset.src
    this.activeVideo.load()

    // Слушаем 'canplaythrough' — это гарантия, что видео проиграется без зависаний
    this.activeVideo.addEventListener('canplaythrough', () => {
      this.isVideoReady = true
      this.tryHideCover()
    }, { once: true })
  }

  showCover() {
    if (this.cover) setTimeout(() => {
      // this.cover.style.clipPath = 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)'
      this.cover.style.opacity = "1"
    }, 1000)
  }

  tryHideCover() {
    if (this.isPausePassed && this.isVideoReady) {
      // 1. Сбрасываем время
      this.activeVideo.currentTime = 0

      // 2. Запускаем воспроизведение
      this.activeVideo.play()
        .then(() => {
          // 3. Только после успешного старта показываем видео
          if(this.cover){
            this.cover.style.opacity = '0'
          }
          //this.cover.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
          this.cover.classList.add(this.stateClasses.videoLoaded)
          this.activeVideo.style.opacity = '1'
        })
        .catch(err => console.warn("Autoplay blocked or failed:", err))
    }
  }

  pickBestVideo() {
    const width = window.innerWidth
    // Сортируем от большего к меньшему и ищем подходящее под экран
    const sorted = this.videos.sort((a, b) => b.width - a.width)
    return sorted.find(v => width >= v.width) || sorted[sorted.length - 1]
  }
}

new HeroVideoLoader()

export default HeroVideoLoader