/**
 * LOGIQUE DE NAVIGATION DE NOVA360
 */

function navigateToPage(pageId) {
  // Fermer le menu mobile
  toggleMobileMenu(false);
  
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Masquer toutes les sections
  pages.forEach(p => p.classList.remove('active'));
  
  // Gérer l'état actif des liens
  navLinks.forEach(l => {
    l.classList.remove('active');
    const linkText = l.innerText.toLowerCase();
    
    if (pageId === 'home' && linkText.includes('accueil')) l.classList.add('active');
    if (pageId === 'categories' && linkText.includes('catégories')) l.classList.add('active');
    if (pageId === 'demo' && linkText.includes('démonstrations')) l.classList.add('active');
    if (pageId === 'about' && linkText.includes('vision')) l.classList.add('active');
    if (pageId === 'contact' && linkText.includes('contact')) l.classList.add('active');
  });
  
  // Afficher la page cible
  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (pageId === 'home') {
    document.getElementById('page-home').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Mettre à jour l'URL sans rechargement
  history.pushState(null, null, `#${pageId}`);
}

function toggleMobileMenu(forceState = null) {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  if (forceState === false) {
    menu.style.display = 'none';
  } else {
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
  }
}

function mobileNav(id) {
  navigateToPage(id);
}

// Initialisation au chargement
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToPage(hash);
});

// Bouton retour navigateur
window.addEventListener('popstate', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToPage(hash);
});
