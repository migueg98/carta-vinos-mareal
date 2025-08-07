/* Burger menu para móviles */
const burger = document.getElementById('burger');
const menu   = document.getElementById('menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('open');
  burger.classList.toggle('is-active');
});

/* Año dinámico en el footer */
document.getElementById('year').textContent = new Date().getFullYear();
