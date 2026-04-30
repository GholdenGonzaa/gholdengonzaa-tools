(function() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top-btn';
  btn.innerHTML = '↑';
  btn.title = 'Subir al inicio';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
