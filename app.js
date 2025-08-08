/* ---------- Smooth scroll sin cambiar la URL ---------- */
const menu = document.getElementById('menu');
const links = Array.from(menu.querySelectorAll('a'));
const sections = links
  .map(l => document.querySelector(l.getAttribute('href')))
  .filter(Boolean);

function scrollToSection(target) {
  const headerH = document.querySelector('.navbar').offsetHeight || 0;
  const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* Hace visible la pestaña activa moviendo lo JUSTO la barra horizontal */
function ensureVisible(link){
  if(!link || !menu) return;
  // si no hay overflow, no hacemos nada
  if(menu.scrollWidth <= menu.clientWidth) return;

  const parentLeft  = menu.scrollLeft;
  const parentRight = parentLeft + menu.clientWidth;

  const linkLeft  = link.offsetLeft;
  const linkRight = linkLeft + link.offsetWidth;

  let newScrollLeft = null;

  if (linkLeft < parentLeft) {
    newScrollLeft = linkLeft - 8; // pequeño margen
  } else if (linkRight > parentRight) {
    newScrollLeft = linkRight - menu.clientWidth + 8;
  }

  if (newScrollLeft !== null) {
    menu.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  }
}

links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    setActive(target.id);
    ensureVisible(a);            // ← mostrar pestaña sin centrarla
    scrollToSection(target);
  }, { passive: true });
});

/* ---------- Scrollspy (resalta categoría activa, sin mover la barra salvo lo justo) ---------- */
function setActive(id){
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
}

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.id;
      const activeLink = menu.querySelector(`a[href="#${id}"]`);
      setActive(id);
      ensureVisible(activeLink); // ← solo si queda fuera del viewport del menú
    }
  });
}, { root: null, rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });

sections.forEach(sec => io.observe(sec));

/* ---------- Año automático ---------- */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
