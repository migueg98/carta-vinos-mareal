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
  if(menu.scrollWidth <= menu.clientWidth) return;

  const parentLeft  = menu.scrollLeft;
  const parentRight = parentLeft + menu.clientWidth;

  const linkLeft  = link.offsetLeft;
  const linkRight = linkLeft + link.offsetWidth;

  let newScrollLeft = null;
  if (linkLeft < parentLeft) newScrollLeft = linkLeft - 8;
  else if (linkRight > parentRight) newScrollLeft = linkRight - menu.clientWidth + 8;

  if (newScrollLeft !== null) menu.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
}

links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    setActive(target.id);
    ensureVisible(a);
    scrollToSection(target);
  });
});

/* ---------- Scrollspy (resalta categoría activa) ---------- */
function setActive(id){
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
}

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.id;
      const activeLink = menu.querySelector(`a[href="#${id}"]`);
      setActive(id);
      ensureVisible(activeLink); // solo lo justo, sin centrar
    }
  });
}, { root: null, rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });

sections.forEach(sec => io.observe(sec));

/* ---------- Lightbox de botellas (popup sin cambiar URL) ---------- */
(function setupLightbox(){
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML = '<img alt="">';
  document.body.appendChild(overlay);

  const body  = document.body;
  const imgEl = overlay.querySelector('img');

  function openLightbox(src, alt){
    imgEl.src = src;
    imgEl.alt = alt || '';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    body.classList.add('no-scroll');
  }
  function closeLightbox(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    imgEl.src = '';
    body.classList.remove('no-scroll');
  }

  // Cerrar tocando en cualquier sitio del overlay o con Esc
  overlay.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

  // Abrir tocando la imagen de la botella
  document.addEventListener('click', (e)=>{
    const img = e.target.closest('.vino .media img');
    if(!img) return;
    e.preventDefault();
    openLightbox(img.currentSrc || img.src, img.alt || '');
  });
})();

/* ---------- Año automático ---------- */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
