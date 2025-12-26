/**
 * LOGIQUE DE NAVIGATION ET D'INTERACTION DE NOVA360
 */

/**
 * Gère le changement de page fluide
 * @param {string} pageId - L'identifiant de la page cible
 */
function navigateToPage(pageId) {
  // 1. Fermer le menu mobile au cas où il est ouvert
  toggleMobileMenu(false);
  
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // 2. Masquer toutes les pages avec une transition
  pages.forEach(p => p.classList.remove('active'));
  
  // 3. Réinitialiser les liens de navigation
  navLinks.forEach(l => {
    l.classList.remove('active');
    // On active le lien dont le texte correspond à la page demandée
    const linkText = l.innerText.toLowerCase();
    if (pageId === 'home' && (linkText.includes('accueil'))) l.classList.add('active');
    if (pageId === 'categories' && linkText.includes('catégories')) l.classList.add('active');
    if (pageId === 'demo' && linkText.includes('démonstrations')) l.classList.add('active');
    if (pageId === 'about' && linkText.includes('vision')) l.classList.add('active');
    if (pageId === 'contact' && linkText.includes('contact')) l.classList.add('active');
  });
  
  // 4. Afficher la page cible
  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (pageId === 'home') {
    // Fallback pour la page d'accueil
    document.getElementById('page-home').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // 5. Mettre à jour l'URL (le hash) sans recharger la page
  history.pushState(null, null, `#${pageId}`);
}

/**
 * Gère l'affichage de l'overlay menu mobile
 * @param {boolean|null} forceState - Force l'état (true=ouvert, false=fermé)
 */
function toggleMobileMenu(forceState = null) {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;

  if (forceState === false) {
    menu.style.display = 'none';
  } else {
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
  }
}

/**
 * Fonction raccourcie pour la navigation mobile
 */
function mobileNav(id) {
  navigateToPage(id);
}

// --- INITIALISATION ---

// Gestion du chargement initial via l'URL (ex: site.com/#vision)
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToPage(hash);
});

// Gestion du bouton "Retour" du navigateur
window.addEventListener('popstate', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToPage(hash);
});
