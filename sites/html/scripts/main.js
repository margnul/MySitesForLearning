// Загружаем канвас-эффект только после полной загрузки страницы
window.addEventListener('load', () => {
  import('./BubbleFilm3.js?v=1.1.10')
    .then(module => {
      // Скрипт загружен и выполнен
    });
});

// Загружаем скрипт кейсов только при скролле (или тоже по событию load)
window.addEventListener('scroll', () => {
  import('./CasesPreview.js?v=1.1.10');
}, { once: true }); // Сработает только один раз при первом скролле