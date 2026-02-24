class BubbleWrap {
  selectors = {
    canvas: '#bubbleWrap',
    wrapper: '[data-js-hero-canvas-wrapper]',
    button: '[data-js-hero-canvas-button]',
    title: '[data-js-hero-title]',
    subtitle: '[data-js-hero-subtitle]',
  };

  BASE_CONFIG = {
    rows: 14,
    cols: 12,
    gridPadding: { top: 17, bottom: 24, left: 20, right: 26 },
    additionalPaddingLeft: [0, 0, 0, 0, 0, 0, 0, -4, -3, -5, -4, -6, -8, -8],
    additionalPaddingTop: [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    debugMode: false,
  };

  stateClasses = {
    isActive: 'is-active',
    isVisibleBig: 'is-visible-big',
    isVisibleSmall: 'is-visible-small',
    notVisible: 'not-visible',
  };

  constructor() {
    this.canvas = document.querySelector(this.selectors.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.wrapper = document.querySelector(this.selectors.wrapper);
    this.button = document.querySelector(this.selectors.button);
    this.title = document.querySelector(this.selectors.title);
    this.subtitle = document.querySelector(this.selectors.subtitle);

    this.currentConfig = JSON.parse(JSON.stringify(this.BASE_CONFIG));
    this.bubbleW = 0;
    this.bubbleH = 0;
    this.imagesLoaded = 0;
    this.states = Array(this.BASE_CONFIG.rows * this.BASE_CONFIG.cols).fill(false);

    this.tempCanvas = document.createElement('canvas');
    this.tctx = this.tempCanvas.getContext('2d');

    this.imgIntact = new Image();
    this.imgPopped = new Image();
    this.imgIntact.src = '../images/bubble-film/bubbleFilm1-2.png';
    this.imgPopped.src = '../images/bubble-film/bubbleFilm2-2.png';

    this.popSoundElements = [...Array(4)].map(() => document.createElement('audio'))
    this.popSoundElements.forEach((el, index) => {
      el.setAttribute('src', `../sounds/pop-alt_2-${index + 1}.mp3`)
    })
    this.indexToPlay = 0

    this.init();
  }

  init() {
    const handleLoad = () => {
      this.imagesLoaded++;
      if (this.imagesLoaded === 2) {
        this.updateScreenState();
        this.resizeCanvas();
        this.wrapper.classList.add(this.stateClasses.isActive);
        this.bindEvents();
      }
    };
    this.imgIntact.onload = handleLoad;
    this.imgPopped.onload = handleLoad;
  }

  checkFit(size, margin = 20) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const rect = {
      top: 10,
      right: w - 10,
      left: w - 10 - size,
      bottom: 10 + size
    };

    if (rect.left < margin || rect.bottom > h - margin) {
      return false;
    }

    if (this.title) {
      const titleRect = this.title.getBoundingClientRect();

      const t = {
        top: titleRect.top - margin,
        bottom: titleRect.bottom + margin,
        left: titleRect.left - margin,
        right: titleRect.right + margin
      };

      const overlaps = !(rect.right < t.left ||
        rect.left > t.right ||
        rect.bottom < t.top ||
        rect.top > t.bottom);

      if (overlaps) return false;
    }

    if (this.subtitle) {
      const subTitleRect = this.subtitle.getBoundingClientRect();

      const t = {
        top: subTitleRect.top - margin,
        bottom: subTitleRect.bottom + margin,
        left: subTitleRect.left - margin,
        right: subTitleRect.right + margin
      };

      const overlaps = !(rect.right < t.left ||
        rect.left > t.right ||
        rect.bottom < t.top ||
        rect.top > t.bottom);

      if (overlaps) return false;
    }

    return true;
  }

  updateScreenState() {
    let multiplier = 1;

    this.wrapper.classList.remove(
      this.stateClasses.isVisibleBig,
      this.stateClasses.isVisibleSmall,
      this.stateClasses.notVisible
    );

    // Сначала пробуем Большой размер (600px)
    if (this.checkFit(600)) {
      this.wrapper.classList.add(this.stateClasses.isVisibleBig);
      multiplier = 1;
    }
    // Если не влез, пробуем Маленький размер (300px)
    else if (this.checkFit(300)) {
      this.wrapper.classList.add(this.stateClasses.isVisibleSmall);
      multiplier = 0.5;
    }
    // Если ничего не подошло — скрываем
    else {
      this.wrapper.classList.add(this.stateClasses.notVisible);
      multiplier = 0.5;
    }

    this.currentConfig.gridPadding = {
      top: this.BASE_CONFIG.gridPadding.top * multiplier,
      bottom: this.BASE_CONFIG.gridPadding.bottom * multiplier,
      left: this.BASE_CONFIG.gridPadding.left * multiplier,
      right: this.BASE_CONFIG.gridPadding.right * multiplier,
    };

    this.currentConfig.additionalPaddingLeft = this.BASE_CONFIG.additionalPaddingLeft.map(val => val * multiplier);
    this.currentConfig.additionalPaddingTop = this.BASE_CONFIG.additionalPaddingTop.map(val => val * multiplier);
  }

  resizeCanvas() {
    this.updateScreenState();

    const rect = this.canvas.getBoundingClientRect();
    // Если враппер скрыт (not-visible), rect может быть нулевым.
    if (rect.width === 0) return;

    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    const gridWidth = this.canvas.width - this.currentConfig.gridPadding.left - this.currentConfig.gridPadding.right;
    const gridHeight = this.canvas.height - this.currentConfig.gridPadding.top - this.currentConfig.gridPadding.bottom;

    this.bubbleW = gridWidth / this.currentConfig.cols;
    this.bubbleH = gridHeight / this.currentConfig.rows;

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.imgIntact, 0, 0, this.canvas.width, this.canvas.height);

    const scaleX = this.imgPopped.naturalWidth / this.canvas.width;
    const scaleY = this.imgPopped.naturalHeight / this.canvas.height;

    this.states.forEach((isPopped, index) => {
      const col = index % this.currentConfig.cols;
      const row = Math.floor(index / this.currentConfig.cols);

      const x = this.currentConfig.gridPadding.left +
        col * this.bubbleW +
        ((row % 2) * this.bubbleW / 2) +
        this.currentConfig.additionalPaddingLeft[row];

      const y = this.currentConfig.gridPadding.top +
        row * this.bubbleH +
        this.currentConfig.additionalPaddingTop[row];

      if (isPopped) {
        this.drawSoftBubble(x, y, scaleX, scaleY);
      }

      if (this.currentConfig.debugMode) {
        this.renderDebug(x, y, row, col);
      }
    });
  }

  drawSoftBubble(x, y, sx, sy) {
    const radius = Math.min(this.bubbleW, this.bubbleH) / 2;
    this.tempCanvas.width = this.bubbleW;
    this.tempCanvas.height = this.bubbleH;
    this.tctx.clearRect(0, 0, this.bubbleW, this.bubbleH);

    const centerX = this.bubbleW / 2;
    const centerY = this.bubbleH / 2;

    const gradient = this.tctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    this.tctx.fillStyle = gradient;
    this.tctx.beginPath();
    this.tctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.tctx.fill();

    this.tctx.globalCompositeOperation = 'source-in';
    this.tctx.drawImage(
      this.imgPopped,
      x * sx, y * sy, this.bubbleW * sx, this.bubbleH * sy,
      0, 0, this.bubbleW, this.bubbleH
    );

    this.ctx.drawImage(this.tempCanvas, x, y);
  }

  renderDebug(x, y, row, col) {
    this.ctx.strokeStyle = "rgba(255,0,0,0.5)";
    this.ctx.strokeRect(x, y, this.bubbleW, this.bubbleH);
    this.ctx.fillStyle = "blue";
    this.ctx.font = "8px Arial";
    this.ctx.fillText(`${row} ${col}`, x + 4, y + 12);
  }

  handleCanvasClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width === 0) return;

    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    const row = Math.floor((mouseY - this.currentConfig.gridPadding.top) / this.bubbleH);
    const rowOffset = (row % 2 === 1) ? (this.bubbleW / 2) : 0;
    const col = Math.floor((mouseX - this.currentConfig.gridPadding.left - rowOffset) / this.bubbleW);

    if (row >= 0 && row < this.currentConfig.rows && col >= 0 && col < this.currentConfig.cols) {
      const index = row * this.currentConfig.cols + col;
      if (!this.states[index]) {
        this.states[index] = true;
        this.draw();
        this.playPopSound()
      }
    }
  }

  toggleWrapper() {
    this.wrapper.classList.toggle(this.stateClasses.isActive);
  }

  playPopSound() {
    const randIndex = Math.round(Math.random() * 3)
    console.log(randIndex)
    this.popSoundElements[randIndex].play()
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());
    this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));

    if (this.button) {
      this.button.addEventListener('click', () => this.toggleWrapper());
    }
  }
}

new BubbleWrap();
export default BubbleWrap;