function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
}

window.addEventListener('load', () => {
  loadScript('./scripts/BubbleFilm3.js?v=1.1.11');
});

window.addEventListener('scroll', () => {
  loadScript('./scripts/CasesPreview.js?v=1.1.11');
}, { once: true });
