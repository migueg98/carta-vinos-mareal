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

links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    setActive(target.id);
    centerActive(a);
    scrollToSection(target);
  }, { passive: true });
});

/* ---------- Scrollspy + auto-centrado del tab activo ---------- */
function setActive(id){
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
}

function centerActive(link){
  if(!link) return;
  const navRect = menu.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const offset = (linkRect.left + linkRect.width/2) - (navRect.left + navRect.width/2);
  menu.scrollBy({ left: offset, behavior: 'smooth' });
}

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.id;
      const activeLink = menu.querySelector(`a[href="#${id}"]`);
      setActive(id);
      centerActive(activeLink);
    }
  });
}, { root: null, rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });

sections.forEach(sec => io.observe(sec));

/* ---------- Año automático en el footer ---------- */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
