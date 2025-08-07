/* ---------- Burger ---------- */
const burger = document.getElementById('burger');
const menu   = document.getElementById('menu');

burger.addEventListener('click',()=>{
  menu.classList.toggle('open');
});

/* ---------- Smooth scroll SIN cambiar la URL ---------- */
document.querySelectorAll('.menu a').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();                         // evita que aparezca el #
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){
      target.scrollIntoView({behavior:'smooth',block:'start'});
      menu.classList.remove('open');            // cierra menú en móvil
    }
  });
});

/* ---------- Año automático ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
