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
    this.img = new Image();
    let started = false;

    const handleLoad = () => {
      if (started) return;
      started = true;

      this.getCanvasSize();
      this.sliceHeight = this.canvasHeight / this.slicesCount;
      this.updateDimensions();
      this.prepareSlices();
      this.animateSlicesRAF();
      this.initVideo();
    };

    this.img.onload = handleLoad;
    this.img.src = this.coverImageElement.src;

    if (this.img.complete) {
      handleLoad();
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

  updateDimensions() {
    const dpr = window.devicePixelRatio || 1;
    const cw = this.canvasElement.offsetWidth;
    const ch = this.canvasElement.offsetHeight;

    // Устанавливаем реальный размер буфера с учетом Retina
    this.canvasElement.width = cw * dpr;
    this.canvasElement.height = ch * dpr;
    this.ctx.scale(dpr, dpr); // Масштабируем контекст, чтобы координаты в коде остались прежними

    this.canvasWidth = cw;
    this.canvasHeight = ch;

    // Предрассчитываем масштаб (Cover) один раз
    const iw = this.img.width;
    const ih = this.img.height;
    const scale = Math.max(cw / iw, ch / ih);

    this.precomputed = {
      dw: iw * scale,
      dh: ih * scale,
      dx: (cw - iw * scale) / 2,
      dy: (ch - ih * scale) / 2,
      sourceSliceHeight: ih / this.slicesCount,
      destSliceHeight: (ih * scale) / this.slicesCount
    };
  }

  drawSlice(slice) {
    const p = this.precomputed;

    this.ctx.drawImage(
      this.img,
      0, p.sourceSliceHeight * slice.index,
      this.img.width, p.sourceSliceHeight,
      slice.offsetX + p.dx, p.dy + (p.destSliceHeight * slice.index),
      p.dw, p.destSliceHeight + 1
    );
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
      const progress = Math.min((now - start) / duration, 1);
      const eased = this.easeOutCubic(progress);

      this.slices.forEach(slice => {
        slice.offsetX = slice.fromX * (1 - eased);
      });

      this.drawBackground();
      this.slices.forEach(slice => this.drawSlice(slice));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // --- ВОТ ЗДЕСЬ ЗАПУСКАЕМ ВИДЕО ---
        if (this.video && this.videoReady) {
          this.video.currentTime = 0; // Сбрасываем на начало на всякий случай
          this.video.play()
            .then(() => {
              this.useVideo = true; // Разрешаем отрисовку видео в renderLoop
            })
            .catch(e => console.warn("Video play failed:", e));
        }

        requestAnimationFrame(this.renderLoop);
      }
    };

    requestAnimationFrame(animate);
  }

  /* ---------------------------------- */
  /* VIDEO */
  /* ---------------------------------- */

  initVideo() {
    this.video = document.createElement('video');
    this.video.src = this.getVideoForScreen();
    this.video.muted = true;
    this.video.loop = true;
    this.video.playsInline = true;
    this.video.autoplay = false; // Отключаем автоплей
    this.video.preload = 'auto';

    this.video.addEventListener('canplay', () => {
      this.videoReady = true;
      // Больше здесь ничего не запускаем
    }, { once: true });
    
    if (this.video.readyState >= 3) {
      this.videoReady = true;
    }

    this.video.load();
  }

  /* ---------------------------------- */
  /* MAIN RENDER LOOP */
  /* ---------------------------------- */

  renderLoop() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.useVideo && this.videoReady) {
      //console.log('video is playing')
      this.drawVideo();
    } else {
      this.drawImageCover();
    }

    requestAnimationFrame(this.renderLoop);
  }

  /* ---------------------------------- */
  /* EVENTS */
  /* ---------------------------------- */

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.getCanvasSize();
        // Пересчитываем слайсы только если реально изменились размеры
        this.sliceHeight = this.canvasHeight / this.slicesCount;
        this.updateDimensions();
        this.prepareSlices();
      }, 150); // Ждем 150мс после окончания ресайза
    });

    document.addEventListener("DOMContentLoaded", () => {
      // this.createImage()
    })
  }
}

new HeroMedia()

export default HeroMedia