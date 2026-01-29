import { Home } from "./components/Home.js";
import { Contact } from "./components/Contact.js";
import { Privacy } from "./components/Privacy.js";
import { Legal } from "./components/Legal.js";
import { Info } from "./components/Info.js";
import { LocationPopup } from "./components/LocationPopup.js";
import {
  initScrollAnimations,
  destroyScrollAnimations,
  initAnimations,
  hidePreloader,
  showInfoPopup,
  hideInfoPopup,
  showLocationPopup,
  hideLocationPopup,
  getLenis,
} from "./animations.js";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/privacy": Privacy,
  "/legal": Legal,
};

export function router() {
  const app = document.querySelector("#app");
  let isHomePage = false;
  let isInitialLoad = true;

  window.scrollTo(0, 0);

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  function render(path) {
    if (isHomePage && path !== "/") {
      destroyScrollAnimations();
      isHomePage = false;
    }

    const component = routes[path] || routes["/"];
    app.innerHTML = component();
    
    window.scrollTo(0, 0);
    
    const existingInfoPopup = document.querySelector('.info-popup-overlay');
    if (!existingInfoPopup) {
      const infoPopupHTML = Info();
      document.body.insertAdjacentHTML('beforeend', infoPopupHTML);
      console.log('Info popup injected');
    }
    
    const existingLocationPopup = document.querySelector('.location-popup-overlay');
    if (!existingLocationPopup) {
      const locationPopupHTML = LocationPopup();
      document.body.insertAdjacentHTML('beforeend', locationPopupHTML);
      console.log('Location popup injected');
    }

    if (path === "/") {
      setTimeout(() => {
        if (!isHomePage) {
          if (isInitialLoad) {
            initScrollAnimations(false);
          } else {
            initScrollAnimations(true);
          }
          isHomePage = true;
        } else {
          initAnimations();
        }
      }, 0);
    } else {
      setTimeout(() => {
        if (isInitialLoad) {
          if (document.readyState === "complete") {
            hidePreloader();
            initAnimations();
          } else {
            window.addEventListener("load", () => {
              hidePreloader();
              initAnimations();
            }, { once: true });
          }
        } else {
          hidePreloader();
          initAnimations();
        }
      }, 0);
    }
    
    isInitialLoad = false;
  }

  app.addEventListener("click", (e) => {
    if (e.target.closest(".info-button")) {
      e.preventDefault();
      showInfoPopup();
      return;
    }

    if (e.target.closest(".faq-question")) {
      const question = e.target.closest(".faq-question");
      const faqItem = question.closest(".faq-item");
      const isActive = faqItem.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      if (!isActive) {
        faqItem.classList.add("active");
      }
    }

    if (e.target.closest("a[href^='#']")) {
      const link = e.target.closest("a[href^='#']");
      const href = link.getAttribute("href");
      const targetId = href.substring(1); 
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: -100, 
            duration: 1.5,
          });
        } else {
          targetElement.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          });
        }
      }
      return;
    }

    if (e.target.closest("a[data-nav]")) {
      const link = e.target.closest("a[data-nav]");
      const href = link.getAttribute("href");

      if (href && href.startsWith("/") && !href.startsWith("//")) {
        e.preventDefault();
        
        const [path, hash] = href.split('#');
        
        if (hash) {
          navigate(path || '/');
          
          setTimeout(() => {
            const targetElement = document.getElementById(hash);
            if (targetElement) {
              const lenis = getLenis();
              if (lenis) {
                lenis.scrollTo(targetElement, {
                  offset: -100, 
                  duration: 1.5,
                });
              } else {
                targetElement.scrollIntoView({ 
                  behavior: "smooth",
                  block: "start"
                });
              }
            }
          }, 300);
        } else {
          navigate(href);
        }
      }
    }
  });

  document.addEventListener("click", (e) => {
    const infoCloseButton = e.target.closest(".info-popup-close");
    if (infoCloseButton) {
      console.log('Info close button clicked');
      hideInfoPopup();
      return;
    }

    const locationCloseButton = e.target.closest(".location-popup-close");
    if (locationCloseButton) {
      console.log('Location close button clicked');
      hideLocationPopup();
      return;
    }

    if (e.target.classList.contains("info-popup-overlay")) {
      console.log('Info overlay clicked');
      hideInfoPopup();
      return;
    }

    if (e.target.classList.contains("location-popup-overlay")) {
      console.log('Location overlay clicked');
      hideLocationPopup();
      return;
    }

    const actionButton = e.target.closest(".info-popup-button");
    if (actionButton) {
      const action = actionButton.getAttribute("data-action");

      switch (action) {
        case "price":
          hideInfoPopup();
          if (window.location.pathname === "/") {
            setTimeout(() => {
              const servicesSection = document.querySelector(".horizontal-container-2");
              if (servicesSection) {
                const lenis = getLenis();
                if (lenis) {
                  lenis.scrollTo(servicesSection, {
                    offset: -100,
                    duration: 1.5,
                  });
                } else {
                  servicesSection.scrollIntoView({ behavior: "smooth" });
                }
              }
            }, 300);
          } else {
            navigate("/");
            setTimeout(() => {
              const servicesSection = document.querySelector(".horizontal-container-2");
              if (servicesSection) {
                const lenis = getLenis();
                if (lenis) {
                  lenis.scrollTo(servicesSection, {
                    offset: -100,
                    duration: 1.5,
                  });
                } else {
                  servicesSection.scrollIntoView({ behavior: "smooth" });
                }
              }
            }, 500);
          }
          break;

        case "call":
          hideInfoPopup();
          window.location.href = "tel:+491627001514";
          break;

        case "location":
          hideInfoPopup();
          setTimeout(() => {
            showLocationPopup();
          }, 300);
          break;
      }
    }
  });

  function navigate(path) {
    window.history.pushState({}, "", path);
    render(path);
  }

  render(window.location.pathname);

  window.addEventListener("popstate", () => {
    render(window.location.pathname);
  });

  return { navigate };
}
