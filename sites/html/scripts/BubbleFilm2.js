class BubbleFilm {
  selectors = {
    canvas: '[data-js-hero-canvas]',
    wrapper: '[data-js-hero-canvas-wrapper]',
    button: '[data-js-hero-canvas-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isVisible: 'is-visible',
  }

  additionalPaddingLeft = [
    0, 0, 0, 0, 0, 0, 0, -4, -3, -5, -4, -6, -8, -8,
  ]

  additionalPaddingTop = [
    0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  ]

  gridPaddingTop = 17;
  gridPaddingBottom = 24;
  gridPaddingLeft = 20;
  gridPaddingRight = 26;

  rows = 14;
  cols = 12;

  DEBUG_MODE = true;

  constructor() {
    this.canvasElement = document.querySelector(this.selectors.canvas)
    this.ctx = this.canvasElement.getContext('2d');

    this.wrapperElement = document.querySelector(this.selectors.wrapper)
    this.buttonElement = document.querySelector(this.selectors.button)

    this.bubbleW = 0;
    this.bubbleH = 0;

    this.imgIntact = new Image();
    this.imgPopped = new Image();

    this.imgIntact.src = '../images/bubble-film/bubbleFilm1-2.png';
    this.imgPopped.src = '../images/bubble-film/bubbleFilm2-2.png';

    this.imagesLoaded = 0;
    this.states = Array(this.rows * this.cols).fill(false);

    this.tempCanvas = document.createElement('canvas');
    this.tctx = this.tempCanvas.getContext('2d');

    // ✅ FIX 1 — bind контекста (иначе this потеряется в callbacks)
    this.onImageLoad = this.onImageLoad.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.toggleWrapper = this.toggleWrapper.bind(this);

    this.imgIntact.onload = this.onImageLoad;
    this.imgPopped.onload = this.onImageLoad;

    this.bindEvents()
  }

  resizeCanvas() {
    const rect = this.canvasElement.getBoundingClientRect();

    this.canvasElement.width = rect.width;
    this.canvasElement.height = rect.height;

    const gridWidth =
      this.canvasElement.width - this.gridPaddingLeft - this.gridPaddingRight;

    const gridHeight =
      this.canvasElement.height - this.gridPaddingTop - this.gridPaddingBottom;

    // ✅ FIX 2 — использование this.cols / this.rows
    this.bubbleW = gridWidth / this.cols;
    this.bubbleH = gridHeight / this.rows;

    this.draw();
  }

  onImageLoad() {
    this.imagesLoaded++;

    if (this.imagesLoaded === 2) {
      this.resizeCanvas();

      // ✅ FIX 3 — безопасный доступ к classList
      if (this.wrapperElement) {
        this.wrapperElement.classList.add(this.stateClasses.isActive)
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    // ✅ Background draw
    this.ctx.drawImage(
      this.imgIntact,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    const scaleX = this.imgPopped.naturalWidth / this.canvasElement.width;
    const scaleY = this.imgPopped.naturalHeight / this.canvasElement.height;

    this.states.forEach((isPopped, index) => {

      // ✅ FIX 4 — this.cols вместо cols
      const col = index % this.cols;
      const row = Math.floor(index / this.cols);

      const x =
        this.gridPaddingLeft +
        col * this.bubbleW +
        ((row % 2) * this.bubbleW / 2) +
        this.additionalPaddingLeft[row];

      const y =
        this.gridPaddingTop +
        row * this.bubbleH +
        this.additionalPaddingTop[row];

      if (isPopped) {
        this.drawSoftBubble(x, y, scaleX, scaleY);
      }

      // ✅ FIX 5 — DEBUG_MODE → this.DEBUG_MODE
      if (this.DEBUG_MODE) {
        this.ctx.strokeStyle = "rgba(255,0,0,0.5)";
        this.ctx.strokeRect(x, y, this.bubbleW, this.bubbleH);

        this.ctx.fillStyle = "red";
        this.ctx.font = "10px Arial";

        this.ctx.fillText(
          row + " " + col,
          x + 4,
          y + 12
        );
      }
    });
  }

  drawSoftBubble(x, y, sx, sy) {
    const radius = Math.min(this.bubbleW, this.bubbleH) / 2;

    // ✅ FIX 6 — buffer resize + clear
    this.tempCanvas.width = this.bubbleW;
    this.tempCanvas.height = this.bubbleH;

    this.tctx.clearRect(0, 0, this.bubbleW, this.bubbleH);

    const centerX = this.bubbleW / 2;
    const centerY = this.bubbleH / 2;

    const gradient = this.tctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );

    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    this.tctx.fillStyle = gradient;
    this.tctx.beginPath();
    this.tctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.tctx.fill();

    // ✅ FIX 7 — composite mode
    this.tctx.globalCompositeOperation = 'source-in';

    // ✅ FIX 8 — this.imgPopped + this.bubbleW/H
    this.tctx.drawImage(
      this.imgPopped,
      x * sx,
      y * sy,
      this.bubbleW * sx,
      this.bubbleH * sy,
      0,
      0,
      this.bubbleW,
      this.bubbleH
    );

    this.ctx.drawImage(this.tempCanvas, x, y);
  }

  toggleWrapper() {
    if (this.wrapperElement) {
      this.wrapperElement.classList.toggle(this.stateClasses.isActive)
    }
  }

  bindEvents() {

    // ✅ FIX 9 — click handler с arrow function (контекст this)
    this.canvasElement.addEventListener('click', (e) => {

      const rect = this.canvasElement.getBoundingClientRect();

      const scaleX = this.canvasElement.width / rect.width;
      const scaleY = this.canvasElement.height / rect.height;

      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      const row = Math.floor((mouseY - this.gridPaddingTop) / this.bubbleH);

      const rowOffset = (row % 2 === 1) ? (this.bubbleW / 2) : 0;

      const col = Math.floor(
        (mouseX - this.gridPaddingLeft - rowOffset) / this.bubbleW
      );

      // ✅ FIX 10 — boundary check через this.rows/cols
      if (
        row >= 0 &&
        row < this.rows &&
        col >= 0 &&
        col < this.cols
      ) {
        const index = row * this.cols + col;

        if (!this.states[index]) {
          this.states[index] = true;

          console.log(`Лопнули пузырек: ряд ${row}, колонка ${col}, индекс ${index}`);

          this.draw();
        }
      }
    });

    this.buttonElement?.addEventListener('click', this.toggleWrapper);

    window.addEventListener('resize', this.resizeCanvas);
  }
}

new BubbleFilm()

export default BubbleFilm