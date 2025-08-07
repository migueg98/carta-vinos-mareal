// Burger para móvil
const burger = document.getElementById('burger');
const menu   = document.getElementById('menu');
burger.addEventListener('click', () => {
  menu.classList.toggle('open');
  burger.classList.toggle('is-active');
});

// Año automático
document.getElementById('year').textContent = new Date().getFullYear();
