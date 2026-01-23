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

  function render(path) {
    // Clean up animations if leaving home page
    if (isHomePage && path !== "/") {
      destroyScrollAnimations();
      isHomePage = false;
    }

    const component = routes[path] || routes["/"];
    app.innerHTML = component();
    
    // Inject Info popup after component render (ensure it's always present)
    const existingInfoPopup = document.querySelector('.info-popup-overlay');
    if (!existingInfoPopup) {
      const infoPopupHTML = Info();
      document.body.insertAdjacentHTML('beforeend', infoPopupHTML);
      console.log('Info popup injected');
    }
    
    // Inject Location popup after component render (ensure it's always present)
    const existingLocationPopup = document.querySelector('.location-popup-overlay');
    if (!existingLocationPopup) {
      const locationPopupHTML = LocationPopup();
      document.body.insertAdjacentHTML('beforeend', locationPopupHTML);
      console.log('Location popup injected');
    }

    // Initialize animations for home page
    if (path === "/") {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        if (!isHomePage) {
          // First time loading home page or returning from another page
          if (isInitialLoad) {
            // Initial page load - use full preloader animation
            initScrollAnimations(false);
          } else {
            // SPA navigation to home - skip preloader
            initScrollAnimations(true);
          }
          isHomePage = true;
        } else {
          // If already initialized, just refresh animations for new elements
          initAnimations();
        }
      }, 0);
    } else {
      // For other pages, hide preloader and initialize animations
      setTimeout(() => {
        if (isInitialLoad) {
          // On initial load, wait for window load event
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
          // On SPA navigation, hide preloader immediately
          hidePreloader();
          initAnimations();
        }
      }, 0);
    }
    
    isInitialLoad = false;
  }

  // Set up event delegation once (event delegation works even after innerHTML changes)
  app.addEventListener("click", (e) => {
    // Info button functionality
    if (e.target.closest(".info-button")) {
      e.preventDefault();
      showInfoPopup();
      return;
    }

    // FAQ toggle functionality
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

    // Handle navigation links (only those with data-nav attribute)
    if (e.target.closest("a[data-nav]")) {
      const link = e.target.closest("a[data-nav]");
      const href = link.getAttribute("href");

      if (href && href.startsWith("/") && !href.startsWith("//")) {
        e.preventDefault();
        navigate(href);
      }
    }
  });

  // Set up Info popup event handlers (use capture phase for better reliability)
  document.addEventListener("click", (e) => {
    // Close Info popup when clicking close button
    const infoCloseButton = e.target.closest(".info-popup-close");
    if (infoCloseButton) {
      console.log('Info close button clicked');
      hideInfoPopup();
      return;
    }

    // Close Location popup when clicking close button
    const locationCloseButton = e.target.closest(".location-popup-close");
    if (locationCloseButton) {
      console.log('Location close button clicked');
      hideLocationPopup();
      return;
    }

    // Close Info popup when clicking overlay
    if (e.target.classList.contains("info-popup-overlay")) {
      console.log('Info overlay clicked');
      hideInfoPopup();
      return;
    }

    // Close Location popup when clicking overlay
    if (e.target.classList.contains("location-popup-overlay")) {
      console.log('Location overlay clicked');
      hideLocationPopup();
      return;
    }

    // Handle Info popup button actions
    const actionButton = e.target.closest(".info-popup-button");
    if (actionButton) {
      const action = actionButton.getAttribute("data-action");

      switch (action) {
        case "price":
          hideInfoPopup();
          // Scroll to services section or navigate to pricing
          if (window.location.pathname === "/") {
            // Find the services section and scroll to it
            setTimeout(() => {
              const servicesSection = document.querySelector(".horizontal-container-2");
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 300);
          } else {
            // Navigate to home page if not already there
            navigate("/");
            setTimeout(() => {
              const servicesSection = document.querySelector(".horizontal-container-2");
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 500);
          }
          break;

        case "call":
          hideInfoPopup();
          // Trigger phone call
          window.location.href = "tel:+491627001514";
          break;

        case "location":
          hideInfoPopup();
          // Show location popup with map
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

  // Handle initial load
  render(window.location.pathname);

  // Handle browser back/forward buttons
  window.addEventListener("popstate", () => {
    render(window.location.pathname);
  });

  return { navigate };
}
