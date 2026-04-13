import { HeroCarousel } from './modules/HeroCarousel.js';
import { ScrollManager } from './modules/ScrollManager.js';
import { TiltEffect } from './modules/TiltEffect.js';
import { ContactForm } from './modules/ContactForm.js';
import { NewsletterManager } from './modules/NewsletterManager.js';
import { AnimationManager } from './modules/Animations.js';
import { ChartManager } from './modules/ChartManager.js';

/**
 * Main application file.
 * Responsible for initializing all modules.
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Application started successfully (Modularized).');

  // 1. Initialize Scroll to Top Button (Adriano)
  new ScrollManager('scrollTopBtn');

  // 2. Initialize 3D Tilt Effect on Cards (Adriano)
  new TiltEffect('.area-card');

  // 3. Initialize Hero Carousel (Adriano)
  new HeroCarousel('.hero-carousel', [
    'assets/images/caca-1',
    'assets/images/caca-2'
  ]);

  // 4. Initialize Contact Form (Iulia)
  new ContactForm('#contactForm');

  // 5. Initialize Newsletter Form (Iulia) - With IndexedDB Persistence
  new NewsletterManager('#newsletterForm');

  // 6. Initialize Animations (David)
  // Small delay to ensure DOM is ready and layout stabilized
  setTimeout(() => {
    new AnimationManager();
    new ChartManager('investmentChart'); // Initialize Chart with optimization
  }, 100);
});
