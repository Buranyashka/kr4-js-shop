(function () {
  const openBtn = document.getElementById('open-filters-btn');
  const closeBtn = document.getElementById('close-filters-btn');
  const filtersPanel = document.getElementById('catalog-filters');
  const backdrop = document.getElementById('catalog-backdrop');

  if (!openBtn || !filtersPanel) return;

  function openFilters() {
    filtersPanel.classList.add('is-open');
    backdrop.classList.add('is-open');
    filtersPanel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeFilters() {
    filtersPanel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    filtersPanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  // Открытие
  openBtn.addEventListener('click', openFilters);

  // Закрытие по крестику
  if (closeBtn) {
    closeBtn.addEventListener('click', closeFilters);
  }

  // Закрытие по клику на фон
  if (backdrop) {
    backdrop.addEventListener('click', closeFilters);
  }

  // Закрытие по клавише Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filtersPanel.classList.contains('is-open')) {
      closeFilters();
    }
  });

  /* =========================================
     СВАЙП ВЛЕВО ДЛЯ ЗАКРЫТИЯ (Touch-устройства)
     ========================================= */

  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;
  const swipeThreshold = 60; // Минимальное расстояние свайпа в пикселях для закрытия

  filtersPanel.addEventListener('touchstart', (e) => {
    // Реагируем только если панель открыта
    if (!filtersPanel.classList.contains('is-open')) return;
    
    // Игнорируем свайп, если он начался на кнопках или полях ввода
    if (e.target.closest('button, input, select, textarea')) return;

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = false;
  }, { passive: true });

  filtersPanel.addEventListener('touchmove', (e) => {
    if (!touchStartX) return;

    const deltaX = e.touches[0].clientX - touchStartX;
    const deltaY = e.touches[0].clientY - touchStartY;

    // Нас интересует только свайп влево (deltaX < 0), 
    // и чтобы горизонтальное движение было больше вертикального
    if (deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (!isDragging) {
        isDragging = true;
        // Отключаем плавную анимацию, чтобы панель двигалась четко за пальцем
        filtersPanel.style.transition = 'none';
      }

      // Ограничиваем сдвиг шириной панели
      const dragX = Math.max(-filtersPanel.offsetWidth, deltaX);
      filtersPanel.style.transform = `translateX(${dragX}px)`;
      
      // Предотвращаем стандартное поведение (например, скролл)
      e.preventDefault(); 
    }
  }, { passive: false });

  filtersPanel.addEventListener('touchend', (e) => {
    if (!touchStartX) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX;

    // Возвращаем стандартную анимацию из CSS
    filtersPanel.style.transition = '';
    filtersPanel.style.transform = ''; // Сбрасываем инлайн-стиль

    if (isDragging) {
      // Если свайпнули влево достаточно далеко — закрываем
      if (deltaX < -swipeThreshold) {
        closeFilters();
      }
      // Иначе панель сама вернется обратно за счет CSS-перехода
    }

    // Сбрасываем переменные
    touchStartX = 0;
    touchStartY = 0;
    isDragging = false;
  }, { passive: true });
})();