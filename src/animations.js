import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  // Header animation (Osmo-style)
  const headerItems = document.querySelectorAll(".header-animate-item");
  if (headerItems.length > 0) {
    // Set initial state - header items start below (hidden) and make visible
    gsap.set(headerItems, { 
      yPercent: 100,
      visibility: "visible",
    });

    // Animate header items immediately (header is always in view)
    gsap.to(headerItems, {
      yPercent: 0,
      duration: 1.25,
      ease: "expo.out",
      stagger: 0.05,
      delay: 0.2, // Small delay after preloader
    });
  }

  // Hero text zoom-in animation
  const heroTexts = document.querySelectorAll("#hero-initial-content .hero-text");
  if (heroTexts.length > 0) {
    // Animate hero text zoom in slowly
    gsap.to(heroTexts, {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: "power2.out",
      stagger: 0.3,
      delay: 0.5, // Delay after header animation
    });
  }

  // Location text fade-in animation (last to appear)
  const locationText = document.querySelector("#hero-initial-content .hero-text-location");
  if (locationText) {
    // Calculate delay to ensure it fades in after all other hero animations
    // Header: 0.2s delay + 1.25s duration = ~1.45s
    // Hero text: 0.5s delay + 2s duration = ~2.5s
    // Words: ~1.5-2s after start
    // So location should start around 2.5-3s
    gsap.to(locationText, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      delay: 2.8, // Fade in after other hero elements
    });
  }

  // Word slide from right animation (Osmo-style)
  const wordsSlideFromRightElements = document.querySelectorAll(
    ".words-slide-from-right",
  );
  wordsSlideFromRightElements.forEach((element) => {
    const words = element.querySelectorAll(".word");

    if (words.length === 0) return;

    // Set initial state - words start below (hidden) and make visible
    gsap.set(words, { 
      yPercent: 100,
      visibility: "visible",
    });

    // Create and play animation immediately if in view
    const rect = element.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
      // Element is in view, animate immediately
      gsap.to(words, {
        yPercent: 0,
        duration: 1.25,
        ease: "expo.out",
        stagger: 0.025,
      });
    } else {
      // Element is out of view, use ScrollTrigger
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => {
          gsap.to(words, {
            yPercent: 0,
            duration: 1.25,
            ease: "expo.out",
            stagger: 0.025,
          });
        },
        once: true,
      });
    }
  });

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
}

export function initHorizontalScroll() {
  const sections = gsap.utils.toArray(".horizontal-sections .panel");

  if (sections.length === 0) return;

  return gsap.to(sections, {
    xPercent: -150 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-container",
      pin: true,
      scrub: 0.1,
      end: "+=3000",
      scroller: document.body,
    },
  });
}

export function initHorizontalScroll2() {
  const sections = gsap.utils.toArray(".horizontal-sections-2 .panel-2");

  if (sections.length === 0) return;

  return gsap.to(sections, {
    xPercent: -145 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-container-2",
      pin: true,
      scrub: 0.1,
      end: "+=3000",
      scroller: document.body,
    },
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
          initHorizontalScroll();
          initHorizontalScroll2();
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
    initHorizontalScroll();
    initHorizontalScroll2();
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
      initHorizontalScroll();
      initHorizontalScroll2();
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
