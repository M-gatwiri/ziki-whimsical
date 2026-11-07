/**
 * main.js
 * Entry point for Ziki.dev Whimsical Assembly Line Prototype
 */

import { initAssemblyLine } from './assembly-line.js';
import { initStampMachine } from './stamp-machine.js';
import { initCardsDelight } from './cards-delight.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initFaqAccordion();
  
  // Whimsical modules
  initAssemblyLine();
  initStampMachine();
  initCardsDelight();

  console.log('⚙️ Ziki Whimsical Assembly Line running at 60fps.');
});

/**
 * Dark / Light Theme Toggle with persistence
 */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('ziki-theme') || 'light';

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ziki-theme', next);

    // Minor tactile rotation
    themeBtn.style.transform = 'rotate(180deg) scale(1.1)';
    setTimeout(() => {
      themeBtn.style.transform = '';
    }, 250);
  });
}

/**
 * Mobile Navigation Drawer
 */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-backdrop');

  const openDrawer = () => {
    drawer?.classList.add('open');
    backdrop?.classList.add('open');
    menuBtn?.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  };

  menuBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);
}

/**
 * Smooth FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.home-faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        // Optional: close other open items in the same column for clean reading
        const siblings = item.parentElement?.querySelectorAll('.home-faq-item');
        siblings?.forEach(sibling => {
          if (sibling !== item && sibling.open) {
            sibling.removeAttribute('open');
          }
        });
      }
    });
  });
}
