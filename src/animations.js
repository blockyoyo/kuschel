import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis;
let scrollTriggerRefresh;
let isInitialized = false;

// Export function to get lenis instance
export function getLenis() {
  return lenis;
}

export function initLenis() {
  if (lenis) {
    return lenis;
  }

  lenis = new Lenis({
    duration: 1.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  scrollTriggerRefresh = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener("resize", scrollTriggerRefresh);

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
    pinType: document.body.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => {
    if (lenis) {
      lenis.resize();
    }
  });

  ScrollTrigger.refresh();
}

export function initAnimations() {
  // Kill existing stagger animations
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars &&
      trigger.vars.trigger &&
      trigger.vars.trigger.getAttribute?.("data-animate") === "staggerReveal"
    ) {
      trigger.kill();
    }
  });

  // Staggered reveal for feature cards
  const staggerElements = document.querySelectorAll(
    '[data-animate="staggerReveal"]',
  );
  staggerElements.forEach((element) => {
    const children =
      element.children.length > 0 ? Array.from(element.children) : [element];

    gsap.set(children, { opacity: 0, y: 30 });

    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        scroller: document.body,
      },
    });
  });

  // Header logo animation (rotation and jump)
  const headerLogo = document.querySelector(".header-logo-animate");
  if (headerLogo) {
    const tl = gsap.timeline({ 
      delay: 0,
      defaults: { duration: 0.1 }
    });

    // 1. Rotate and slide in logo from left
    tl.fromTo(
      headerLogo,
      { 
        rotation: 180, 
        x: -1000, 
        opacity: 0,
        transformOrigin: "center center"
      },
      { 
        rotation: 720, 
        x: 0, 
        opacity: 1, 
        duration: 0.75,
        transformOrigin: "center center"
      },
      0
    );

    // 2. Logo jump 
    tl.fromTo(
      headerLogo,
      { y: 0 },
      { y: -15, duration: 0.5, ease: "elastic.out(1, 0.3)" },
      ">"
    );
  }

  // Logo text animation (fly in from right)
  const logoText = document.querySelector(".logo-text-animate");
  if (logoText) {
    gsap.fromTo(
      logoText,
      { 
        x: 1000, 
        opacity: 0 
      },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power2.out",
        delay: 0.3
      }
    );
  }

  // Header navigation fade-in (after other animations finish)
  const headerNav = document.querySelector(".header-nav-animate");
  if (headerNav) {
    gsap.fromTo(
      headerNav,
      { 
        opacity: 0,
        y: -10
      },
      { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.4 // After logo and text animations complete
      }
    );
  }

  ScrollTrigger.sort();
}

export function initFullscreenImageAnimations() {
  const fullscreenImages = document.querySelectorAll(".fullscreen-image img");
  
  fullscreenImages.forEach((img) => {
    // Set initial scale
    gsap.set(img, { scale: 1.0 });
    
    // Create scroll-triggered scale animation
    gsap.to(img, {
      scale: 1.05, // Scale up by 5%
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement, // Use the .fullscreen-image container
        start: "top bottom",
        end: "bottom top",
        scrub: true, // Smooth scrubbing tied to scroll position
        scroller: document.body,
      },
    });
  });

  // Animate overlay text on images
  const overlayTexts = document.querySelectorAll(".image-overlay-text");
  
  overlayTexts.forEach((text) => {
    // Set initial state: off screen to the right
    gsap.set(text, { x: 200, opacity: 0 });
    
    // Animate in from right when scrolled into view
    gsap.to(text, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: text.parentElement,
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play none none reverse",
        scroller: document.body,
      },
    });
  });
}


export function initPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;

  const tl = gsap.timeline();

  // Wait for page to load, then animate preloader out
  window.addEventListener("load", () => {
    tl.to(".preloader", {
      yPercent: 100,
      duration: 2,
      ease: "power4.inOut",
      onComplete: () => {
        preloader.style.display = "none";
        // Start animations after preloader finishes
        setTimeout(() => {
          initAnimations();
          initFullscreenImageAnimations();
        }, 0);
      },
    });
  });
}

// Show preloader (for SPA navigation back to home)
export function showPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;
  
  // Reset preloader to visible state
  preloader.style.display = "block";
  gsap.set(".preloader", { yPercent: 0 });
}

// Hide preloader immediately (for SPA navigations or non-home pages)
export function hidePreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;
  
  // If preloader is already hidden, return
  if (preloader.style.display === "none") return;
  
  // Kill any existing preloader animations
  gsap.killTweensOf(".preloader");
  
  // Hide preloader immediately for SPA navigations
  gsap.to(".preloader", {
    yPercent: 100,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      preloader.style.display = "none";
    },
  });
}

export function initScrollAnimations(skipPreloader = false) {
  if (isInitialized) {
    initAnimations();
    initFullscreenImageAnimations();
    return;
  }

  if (!skipPreloader) {
    initPreloader();
  } else {
    // If skipping preloader, immediately hide it and start animations
    hidePreloader();
    setTimeout(() => {
      initAnimations();
      initFullscreenImageAnimations();
    }, 0);
  }
  
  initLenis();
  setupScrollTrigger();

  isInitialized = true;
}

export function destroyScrollAnimations() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  if (scrollTriggerRefresh) {
    window.removeEventListener("resize", scrollTriggerRefresh);
    scrollTriggerRefresh = null;
  }

  isInitialized = false;
}

// Info Popup Animation
export function showInfoPopup() {
  const overlay = document.querySelector('.info-popup-overlay');
  const container = document.querySelector('.info-popup-container');
  const logo = document.querySelector('.info-logo');
  const content = document.querySelector('.info-content');
  const buttons = document.querySelectorAll('.info-popup-button');
  const closeButton = document.querySelector('.info-popup-close');

  console.log('showInfoPopup called', { overlay, container, closeButton });
  
  if (!overlay || !container) {
    console.error('Popup elements not found');
    return;
  }

  // Make overlay visible
  overlay.classList.add('active');

  // Create timeline for popup animation
  const tl = gsap.timeline({ 
    defaults: { duration: 0.75, ease: "power3.inOut" }
  });

  // 1. Scale in container (elastic bounce effect)
  tl.fromTo(
    container,
    { scale: 0.2, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
  );

  // 2. Slide in content from right
  tl.fromTo(
    content,
    { x: 300, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.75 },
    "<0.3"
  );

  // 3. Rotate and slide in logo
  tl.fromTo(
    logo,
    { rotation: 180, x: -100, opacity: 0 },
    { rotation: 360, x: 0, opacity: 1, duration: 0.75 },
    "<"
  );

  // 4. Logo jump
  tl.fromTo(
    logo,
    { y: 0 },
    { y: -15, duration: 0.5, ease: "elastic.out(1, 0.3)" },
    "<0.5"
  );

  // 5. Stagger buttons
  tl.fromTo(
    buttons,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
    "<0.2"
  );

  // 6. Fade in close button
  if (closeButton) {
    tl.fromTo(
      closeButton,
      { scale: 0, opacity: 0, rotation: -90 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.3 },
      "<0.1"
    );
  }

  return tl;
}

export function hideInfoPopup() {
  const overlay = document.querySelector('.info-popup-overlay');
  const container = document.querySelector('.info-popup-container');

  console.log('hideInfoPopup called', { overlay, container });
  
  if (!overlay || !container) {
    console.error('Popup elements not found for hiding');
    return;
  }

  // Animate out
  gsap.to(container, {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      overlay.classList.remove('active');
      // Reset for next time
      gsap.set(container, { scale: 0.2, opacity: 0 });
    }
  });
}

// Location Popup Animation
export function showLocationPopup() {
  const overlay = document.querySelector('.location-popup-overlay');
  const container = document.querySelector('.location-popup-container');
  const content = document.querySelector('.location-popup-content');
  const closeButton = document.querySelector('.location-popup-close');

  console.log('showLocationPopup called', { overlay, container, closeButton });
  
  if (!overlay || !container) {
    console.error('Location popup elements not found');
    return;
  }

  // Make overlay visible
  overlay.classList.add('active');

  // Create timeline for popup animation
  const tl = gsap.timeline({ 
    defaults: { duration: 0.75, ease: "power3.inOut" }
  });

  // 1. Scale in container (elastic bounce effect)
  tl.fromTo(
    container,
    { scale: 0.2, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
  );

  // 2. Fade in content
  if (content) {
    tl.fromTo(
      content,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "<0.3"
    );
  }

  // 3. Fade in close button
  if (closeButton) {
    tl.fromTo(
      closeButton,
      { scale: 0, opacity: 0, rotation: -90 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.3 },
      "<0.1"
    );
  }

  return tl;
}

export function hideLocationPopup() {
  const overlay = document.querySelector('.location-popup-overlay');
  const container = document.querySelector('.location-popup-container');

  console.log('hideLocationPopup called', { overlay, container });
  
  if (!overlay || !container) {
    console.error('Location popup elements not found for hiding');
    return;
  }

  // Animate out
  gsap.to(container, {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      overlay.classList.remove('active');
      // Reset for next time
      gsap.set(container, { scale: 0.2, opacity: 0 });
    }
  });
}
