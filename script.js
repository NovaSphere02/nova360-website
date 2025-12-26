/**
 * LOGIQUE DE NAVIGATION ET D'INTERACTION DE NOVA360
 */

let currentDemoUrl = 'https://filedn.eu/ltnoVzjomRBHzYirJIqOwRu/NovaVisio/D%C3%A9mos/Actif/11100%20-%20Tandoori%20Flame/output/index.html';

/**
 * Fonction principale de navigation entre les pages
 * @param {string} pageId - L'ID de la section à afficher
 */
function navigateToPage(pageId) {
  toggleMobileMenu(false);
  
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');
  const mainNav = document.getElementById('main-nav');
  const footer = document.getElementById('main-footer');
  const frame = document.getElementById('demo-frame');
  
  // Désactiver le mode immersion par défaut
  toggleImmersion(false);
  
  // Masquer toutes les pages
  pages.forEach(p => p.classList.remove('active'));
  
  // Gérer l'état actif des liens de navigation
  navLinks.forEach(l => {
    l.classList.remove('active');
    // On vérifie soit l'attribut data, soit le hash, soit le texte
    if(l.dataset.page === pageId || l.getAttribute('onclick')?.includes(pageId)) {
        l.classList.add('active');
    }
  });
  
  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Logique spécifique pour la page démonstration
    if (pageId === 'demo') {
      mainNav.style.display = 'none';
      footer.style.display = 'none';
      document.body.style.overflow = 'hidden';
      openDemoModal();
      if (frame && frame.src === "about:blank") frame.src = currentDemoUrl;
    } else {
      mainNav.style.display = 'flex';
      footer.style.display = 'block';
      document.body.style.overflow = 'auto';
      if (frame) frame.src = "about:blank";
    }
  }
  
  // Mettre à jour l'URL sans recharger
  history.pushState(null, null, `#${pageId}`);
}

/**
 * Menu mobile : Ouvrir/Fermer
 */
function toggleMobileMenu(forceClose = null) {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  
  if (forceClose === false || menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
  }
}

/**
 * Navigation simplifiée pour le mobile
 */
function mobileNav(id) {
  navigateToPage(id);
}

/**
 * Changer la visite virtuelle en cours
 */
function changeDemo(url, btn) {
  const frame = document.getElementById('demo-frame');
  currentDemoUrl = url;
  if (frame) frame.src = url;
  document.querySelectorAll('.demo-item-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/**
 * Passer en plein écran / immersion
 */
function toggleImmersion(active) {
  const demoPage = document.getElementById('page-demo');
  if (!demoPage) return;
  if (active) {
    demoPage.classList.add('immersion-mode');
  } else {
    demoPage.classList.remove('immersion-mode');
  }
}

/**
 * Gestion du modal d'accueil démo
 */
function openDemoModal() {
  const modal = document.getElementById('demo-modal');
  const content = document.getElementById('modal-content');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => {
    content.classList.remove('scale-95', 'opacity-0');
    content.classList.add('scale-100', 'opacity-100');
  }, 50);
}

function closeDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) modal.classList.add('hidden');
}

// --- INITIALISATION ---

window.addEventListener('popstate', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToPage(hash);
});

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToPage(hash);
});
