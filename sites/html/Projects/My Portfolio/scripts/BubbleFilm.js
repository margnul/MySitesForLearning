const canvas = document.getElementById('bubbleWrap');
const ctx = canvas.getContext('2d');
const wrapper = document.querySelector('[data-js-hero-canvas-wrapper]')
const button = document.querySelector('[data-js-hero-canvas-button]')

const DEBUG_MODE = true;

const rows = 14;
const cols = 12;


const gridPaddingTop = 17;
const gridPaddingBottom = 24;
const gridPaddingLeft = 20;
const gridPaddingRight = 26;

const additionalPaddingLeft = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -4,
  -3,
  -5,
  -4,
  -6,
  -8,
  -8,
]




const additionalPaddingTop = [
  0,
  0,
  0,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
]

let bubbleW = 0;
let bubbleH = 0;

const imgIntact = new Image();
const imgPopped = new Image();

imgIntact.src = '../images/bubble-film/bubbleFilm1-2.png';
imgPopped.src = '../images/bubble-film/bubbleFilm2-2.png';

let imagesLoaded = 0;
const states = Array(rows * cols).fill(false);


function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width;
  canvas.height = rect.height;

  const gridWidth =
    canvas.width - gridPaddingLeft - gridPaddingRight;

  const gridHeight =
    canvas.height - gridPaddingTop - gridPaddingBottom;

  bubbleW = gridWidth / cols;
  bubbleH = gridHeight / rows;

  draw();
}

window.addEventListener('resize', resizeCanvas);


imgIntact.onload = onImageLoad;
imgPopped.onload = onImageLoad;

function onImageLoad() {
  imagesLoaded++;
  if (imagesLoaded === 2) {
    resizeCanvas();
    wrapper.classList.add('is-active')
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    imgIntact,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const scaleX = imgPopped.naturalWidth / canvas.width;
  const scaleY = imgPopped.naturalHeight / canvas.height;

  states.forEach((isPopped, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);

    const x = gridPaddingLeft + col * bubbleW + ((row % 2) * bubbleW / 2) + additionalPaddingLeft[row];
    const y = gridPaddingTop + row * bubbleH + additionalPaddingTop[row];

    if (isPopped) {
      drawSoftBubble(x, y, scaleX, scaleY);
    }

    if (DEBUG_MODE) {
      ctx.strokeStyle = "rgba(255,0,0,0.5)";
      ctx.strokeRect(x, y, bubbleW, bubbleH);

      ctx.fillStyle = "red";
      ctx.font = "10px Arial";
      ctx.fillText((Math.floor(index / cols)).toString() + " " + (index % cols).toString(), x + 4, y + 12);
    }
  });
}


const tempCanvas = document.createElement('canvas');
const tctx = tempCanvas.getContext('2d');

function drawSoftBubble(x, y, sx, sy) {
  const radius = Math.min(bubbleW, bubbleH) / 2;

  tempCanvas.width = bubbleW;
  tempCanvas.height = bubbleH;
  tctx.clearRect(0, 0, bubbleW, bubbleH);

  const centerX = bubbleW / 2;
  const centerY = bubbleH / 2;

  const gradient = tctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, radius
  );
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.6, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  tctx.fillStyle = gradient;
  tctx.beginPath();
  tctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  tctx.fill();

  tctx.globalCompositeOperation = 'source-in';

  tctx.drawImage(
    imgPopped,
    x * sx, y * sy, bubbleW * sx, bubbleH * sy,
    0, 0, bubbleW, bubbleH
  );

  ctx.drawImage(tempCanvas, x, y);
}

function toggleWrapper() {
  wrapper.classList.toggle('is-active')
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const mouseX = (e.clientX - rect.left) * scaleX;
  const mouseY = (e.clientY - rect.top) * scaleY;

  const row = Math.floor((mouseY - gridPaddingTop) / bubbleH);

  const rowOffset = (row % 2 === 1) ? (bubbleW / 2) : 0;

  const col = Math.floor((mouseX - gridPaddingLeft - rowOffset) / bubbleW);

  if (row >= 0 && row < rows && col >= 0 && col < cols) {
    const index = row * cols + col;

    if (!states[index]) {
      states[index] = true;
      console.log(`Лопнули пузырек: ряд ${row}, колонка ${col}, индекс ${index}`);
      draw();
    }
  }
});

button.addEventListener('click', toggleWrapper)
