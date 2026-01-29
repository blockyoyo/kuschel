import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis;
let scrollTriggerRefresh;
let isInitialized = false;

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
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars &&
      trigger.vars.trigger &&
      trigger.vars.trigger.getAttribute?.("data-animate") === "staggerReveal"
    ) {
      trigger.kill();
    }
  });

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

  const headerLogo = document.querySelector(".header-logo-animate");
  if (headerLogo) {
    const tl = gsap.timeline({ 
      delay: 0,
      defaults: { duration: 0.1 }
    });

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

    tl.fromTo(
      headerLogo,
      { y: 0 },
      { y: -15, duration: 0.5, ease: "elastic.out(1, 0.3)" },
      ">"
    );
  }

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
        delay: 1.4 
      }
    );
  }

  ScrollTrigger.sort();
}

export function initFullscreenImageAnimations() {
  const fullscreenImages = document.querySelectorAll(".fullscreen-image img");
  
  fullscreenImages.forEach((img) => {
    gsap.set(img, { scale: 1.0 });
    
    gsap.to(img, {
      scale: 1.05, 
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement, 
        start: "top bottom",
        end: "bottom top",
        scrub: true, 
        scroller: document.body,
      },
    });
  });
}


export function initPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;

  const tl = gsap.timeline();

  window.addEventListener("load", () => {
    tl.to(".preloader", {
      yPercent: 100,
      duration: 2,
      ease: "power4.inOut",
      onComplete: () => {
        preloader.style.display = "none";
        setTimeout(() => {
          initAnimations();
          initFullscreenImageAnimations();
        }, 0);
      },
    });
  });
}

export function showPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;
  
  preloader.style.display = "block";
  gsap.set(".preloader", { yPercent: 0 });
}

export function hidePreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;
  
  if (preloader.style.display === "none") return;
  
  gsap.killTweensOf(".preloader");
  
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

