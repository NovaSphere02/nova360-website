/**
 * LOGIQUE DE NAVIGATION DE NOVA360
 * Gère le changement de page, les onglets actifs et le menu mobile.
 */

/**
 * Fonction principale pour changer de page
 * @param {string} pageId - L'ID de la section à afficher (ex: 'home', 'categories', 'demo', etc.)
 */
function navigateToPage(pageId) {
  // 1. Fermer systématiquement le menu mobile après un clic
  toggleMobileMenu(false);
  
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // 2. Masquer toutes les sections
  pages.forEach(p => p.classList.remove('active'));
  
  // 3. Gérer l'état "actif" des liens de navigation (Desktop et Mobile)
  navLinks.forEach(l => {
    l.classList.remove('active');
    const linkText = l.innerText.toLowerCase();
    
    // Comparaison flexible pour activer l'onglet visuel
    if (pageId === 'home' && linkText.includes('accueil')) l.classList.add('active');
    if (pageId === 'categories' && linkText.includes('catégories')) l.classList.add('active');
    if (pageId === 'demo' && linkText.includes('démonstrations')) l.classList.add('active');
    if (pageId === 'about' && linkText.includes('vision')) l.classList.add('active');
    if (pageId === 'contact' && linkText.includes('contact')) l.classList.add('active');
  });
  
  // 4. Affichage de la page cible
  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Si l'ID n'est pas trouvé ou est 'home', on affiche la page d'accueil par défaut
    const homePage = document.getElementById('page-home');
    if (homePage) {
        homePage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  // 5. Mise à jour de l'URL sans rechargement pour permettre le partage de lien direct
  if (window.location.hash !== `#${pageId}`) {
    history.pushState(null, null, `#${pageId}`);
  }
}

/**
 * Gère l'ouverture et la fermeture du menu mobile
 * @param {boolean|null} forceState - Permet de forcer l'état (false pour fermer)
 */
function toggleMobileMenu(forceState = null) {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  
  if (forceState === false) {
    menu.style.display = 'none';
  } else {
    // Inverse l'état actuel
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
  }
}

/**
 * Fonction dédiée aux liens du menu mobile
 * @param {string} id - L'ID de la page
 */
function mobileNav(id) {
  navigateToPage(id);
}

// --- INITIALISATION AU CHARGEMENT ---

window.addEventListener('load', () => {
  // Récupère la page dans l'URL (ex: #categories) ou défaut vers 'home'
  const hash = window.location.hash.substring(1) || 'home';
  navigateToPage(hash);
});

// --- GESTION DU BOUTON RETOUR DU NAVIGATEUR ---

window.addEventListener('popstate', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToPage(hash);
});
