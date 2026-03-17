
document.addEventListener('DOMContentLoaded', () => {
  // 4. Initialize PI2 Dynamic Animations (GSAP)
  setTimeout(() => {
    initGSAPAnimations();
  }, 100);
});

/* ═══════════════════════════════════════════
   4. PI2 - GSAP & THREE.JS ANIMATIONS (DAVID)
   ═══════════════════════════════════════════ */

/**
 * Initializes GSAP ScrollTrigger animations
 */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded.');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);

  // 4.1. Fade and slide up sections on scroll
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    gsap.fromTo(sec, 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // 4.2. Animate statistics counter
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(num => {
    const text = num.innerText;
    // Basic extraction
    const match = text.match(/^([^\d]*)(\d+)([^\d]*)$/);
    
    if (match && match[2]) {
      const prefix = match[1] || '';
      const targetVal = parseInt(match[2], 10);
      const suffix = match[3] || '';

      gsap.fromTo(num, 
        { innerHTML: 0 }, 
        {
          innerHTML: targetVal,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%',
          },
          onUpdate: function() {
            num.innerHTML = prefix + Math.floor(this.targets()[0].innerHTML) + suffix;
          }
        }
      );
    }
  });

  // 4.3. Stagger animate Area Cards
  gsap.from('.area-card', {
    scrollTrigger: {
      trigger: '.areas-grid',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.2)'
  });
}
