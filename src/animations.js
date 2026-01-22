import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

let lenis;
let scrollTriggerRefresh;
let isInitialized = false;


export function initLenis() {
  if (lenis) {
    return lenis;
  }

  lenis = new Lenis({
    duration: 1.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  scrollTriggerRefresh = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener('resize', scrollTriggerRefresh);

  return lenis;
}


export function setupScrollTrigger() {
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (lenis) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      }
      return 0;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.body.style.transform ? 'transform' : 'fixed',
  });

  ScrollTrigger.addEventListener('refresh', () => {
    if (lenis) {
      lenis.resize();
    }
  });

  ScrollTrigger.refresh();
}


export function initAnimations() {
  const existingElements = document.querySelectorAll('[data-animate]');
  existingElements.forEach((element) => {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars && trigger.vars.trigger === element) {
        trigger.kill();
      }
    });
  });

  // Setup parallax effects for elements with data-parallax attribute
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach((element) => {
    // Kill existing parallax triggers for this element
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars && trigger.vars.trigger === element && trigger.vars.scrub) {
        trigger.kill();
      }
    });
    
    const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
    createParallax(element, speed);
  });

  const animationPresets = {
    // Parallax reveal with rotation
    parallaxReveal: {
      from: { opacity: 0, y: 100, x: -1000, rotation: -1, scale: 0.9 },
      to: { 
        opacity: 1, 
        y: 0, 
        x: 0,
        rotation: 0, 
        scale: 1, 
        duration: 1.2, 
        ease: 'power3.out' 
      },
    },
    
    // Dynamic scale with rotation
    scaleRotate: {
      from: { opacity: 0, scale: 0.5, rotation: -15 },
      to: { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 1, 
        ease: 'back.out(1.4)' 
      },
    },
    
    // Slide with blur effect
    slideBlur: {
      from: { opacity: 0, x: -150, filter: 'blur(10px)' },
      to: { 
        opacity: 1, 
        x: 0, 
        filter: 'blur(0px)', 
        duration: 1.1, 
        ease: 'power3.out' 
      },
    },
    
    // Vertical slide with scale
    slideScaleUp: {
      from: { opacity: 0, y: 80, scale: 0.85 },
      to: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.2, 
        ease: 'expo.out' 
      },
    },
    
    // 3D flip effect
    flip3D: {
      from: { 
        opacity: 0, 
        rotationX: -90, 
        transformPerspective: 1000,
        transformOrigin: 'center center'
      },
      to: { 
        opacity: 1, 
        rotationX: 0, 
        duration: 1, 
        ease: 'power2.out' 
      },
    },
    
    // Staggered reveal (for child elements)
    staggerReveal: {
      from: { opacity: 0, y: 30 },
      to: { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        stagger: 0.15
      },
    },
    
    // Zoom with rotation
    zoomRotate: {
      from: { opacity: 0, scale: 0.3, rotation: 180 },
      to: { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 1.3, 
        ease: 'elastic.out(1, 0.5)' 
      },
    },
    
    // Slide from right with skew
    slideSkew: {
      from: { opacity: 0, x: 200, skewX: -15 },
      to: { 
        opacity: 1, 
        x: 0, 
        skewX: 0, 
        duration: 1, 
        ease: 'power3.out' 
      },
    },
    
    // Fade with parallax movement
    parallaxFade: {
      from: { opacity: 0, y: 60, x: -30 },
      to: { 
        opacity: 1, 
        y: 0, 
        x: 0, 
        duration: 1.4, 
        ease: 'power2.out' 
      },
    },
    
    // Scale with bounce and rotation
    bounceRotate: {
      from: { opacity: 0, scale: 0.4, rotation: -25 },
      to: { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 1.1, 
        ease: 'bounce.out' 
      },
    },
    
    // Split reveal (horizontal)
    splitHorizontal: {
      from: { opacity: 0, x: -100, scaleX: 0 },
      to: { 
        opacity: 1, 
        x: 0, 
        scaleX: 1, 
        duration: 1, 
        ease: 'power3.out' 
      },
    },
    
    // Vertical split reveal
    splitVertical: {
      from: { opacity: 0, y: -100, scaleY: 0 },
      to: { 
        opacity: 1, 
        y: 0, 
        scaleY: 1, 
        duration: 1, 
        ease: 'power3.out' 
      },
    },
    
    // Rotating reveal
    rotateReveal: {
      from: { opacity: 0, rotation: 45, scale: 0.7 },
      to: { 
        opacity: 1, 
        rotation: 0, 
        scale: 1, 
        duration: 1.2, 
        ease: 'power2.out' 
      },
    },
    
    // Elastic scale
    elasticScale: {
      from: { opacity: 0, scale: 0.2 },
      to: { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: 'elastic.out(1, 0.3)' 
      },
    },
    
    // Slide up with rotation and scale
    slideUpRotate: {
      from: { opacity: 0, y: 120, rotation: 10, scale: 0.8 },
      to: { 
        opacity: 1, 
        y: 0, 
        rotation: 0, 
        scale: 1, 
        duration: 1.3, 
        ease: 'power3.out' 
      },
    },
    
    // Fade in (kept for simple cases)
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1, duration: 1, ease: 'power2.out' },
    },
  };

  // Setup all data-animate elements (in DOM order)
  const animatedElements = document.querySelectorAll('[data-animate]');

  animatedElements.forEach((element) => {
    const animationType = element.getAttribute('data-animate');
    
    const preset = animationPresets[animationType];

    if (!preset) {
      console.warn(`Animation preset "${animationType}" not found`);
      return;
    }

    // Handle stagger animations for child elements
    if (animationType === 'staggerReveal') {
      const children = element.children.length > 0 
        ? Array.from(element.children) 
        : [element];
      
      gsap.set(children, preset.from);

      gsap.to(children, {
        ...preset.to,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          scroller: document.body,
        },
      });
    } else {
      // Regular animation
      gsap.set(element, preset.from);

      gsap.to(element, {
        ...preset.to,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          scroller: document.body,
        },
      });
    }
  });

  // Sort all ScrollTriggers by their start position to ensure correct order
  ScrollTrigger.sort();
}

/**
 * Create a parallax effect for an element
 * @param {string|Element} selector - CSS selector or DOM element
 * @param {number} speed - Parallax speed multiplier (positive = slower, negative = faster)
 * @param {object} options - Additional options
 */
export function createParallax(selector, speed = 0.5, options = {}) {
  const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
  
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }

  const { start = 'top bottom', end = 'bottom top', scroller = document.body } = options;

  return gsap.to(element, {
    y: () => {
      const rect = element.getBoundingClientRect();
      return (window.innerHeight + rect.height) * speed;
    },
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
      scroller,
    },
  });
}

/**
 * Create a scroll-scrubbed animation
 * @param {string|Element} selector - CSS selector or DOM element
 * @param {object} animationConfig - GSAP animation configuration
 * @param {object} scrollTriggerConfig - ScrollTrigger configuration
 */
export function createScrubAnimation(selector, animationConfig, scrollTriggerConfig = {}) {
  const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
  
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }

  const defaultScrollTrigger = {
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    scroller: document.body,
  };

  return gsap.to(element, {
    ...animationConfig,
    ease: 'none',
    scrollTrigger: {
      ...defaultScrollTrigger,
      ...scrollTriggerConfig,
    },
  });
}

/**
 * Custom animation function for advanced use cases
 * @param {string|Element} selector - CSS selector or DOM element
 * @param {object} animationConfig - GSAP animation configuration
 * @param {object} scrollTriggerConfig - ScrollTrigger configuration
 */
export function animateElement(selector, animationConfig, scrollTriggerConfig = {}) {
  const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
  
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }

  const defaultScrollTrigger = {
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    scroller: document.body,
  };

  return gsap.to(element, {
    ...animationConfig,
    scrollTrigger: {
      ...defaultScrollTrigger,
      ...scrollTriggerConfig,
    },
  });
}


export function initScrollAnimations() {
  if (isInitialized) {
    initAnimations();
    return;
  }

  initLenis();

  setupScrollTrigger();

  initAnimations();

  isInitialized = true;
}


export function destroyScrollAnimations() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  
  if (scrollTriggerRefresh) {
    window.removeEventListener('resize', scrollTriggerRefresh);
    scrollTriggerRefresh = null;
  }

  isInitialized = false;
}
