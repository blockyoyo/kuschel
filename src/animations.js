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

  // Word slide from right animation
  const wordsSlideFromRightElements = document.querySelectorAll(
    ".words-slide-from-right",
  );
  wordsSlideFromRightElements.forEach((element) => {
    const words = element.querySelectorAll(".word");

    // Set initial state immediately so words start invisible
    gsap.set(words, { 
      opacity: 0, 
      x: "2em", 
      rotationX: 50,
      rotationZ: 45,
      force3D: true 
    });

    // Create and play animation immediately if in view
    const rect = element.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
      // Element is in view, animate immediately
      gsap.to(words, {
        opacity: 1,
        x: 0,
        rotationX: 0,
        rotationZ: 0,
        duration: 3,
        ease: "power2.out",
        stagger: { amount: 1 },
        force3D: true,
      });
    } else {
      // Element is out of view, use ScrollTrigger
      ScrollTrigger.create({
        trigger: element,
        onEnter: () => {
          gsap.to(words, {
            opacity: 1,
            x: 0,
            rotationX: 0,
            rotationZ: 0,
            duration: 3,
            ease: "power2.out",
            stagger: { amount: 1 },
            force3D: true,
          });
        },
        once: true,
      });
    }
  });

  ScrollTrigger.sort();
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
          initHorizontalScroll();
          initHorizontalScroll2();
        }, 0);
      },
    });
  });
}

export function initScrollAnimations() {
  if (isInitialized) {
    initAnimations();
    initHorizontalScroll();
    initHorizontalScroll2();
    return;
  }

  initPreloader();
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
