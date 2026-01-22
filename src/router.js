import { Home } from './components/Home.js';
import { Contact } from './components/Contact.js';
import { Privacy } from './components/Privacy.js';
import { Legal } from './components/Legal.js';

const routes = {
  '/': Home,
  '/contact': Contact,
  '/privacy': Privacy,
  '/legal': Legal,
};

export function router() {
  const app = document.querySelector('#app');
  
  function render(path) {
    const component = routes[path] || routes['/'];
    app.innerHTML = component();
  }
  
  // Set up event delegation once (event delegation works even after innerHTML changes)
  app.addEventListener('click', (e) => {
    // FAQ toggle functionality
    if (e.target.closest('.faq-question')) {
      const question = e.target.closest('.faq-question');
      const faqItem = question.closest('.faq-item');
      const isActive = faqItem.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      if (!isActive) {
        faqItem.classList.add('active');
      }
    }
    
    // Handle navigation links (only those with data-nav attribute)
    if (e.target.closest('a[data-nav]')) {
      const link = e.target.closest('a[data-nav]');
      const href = link.getAttribute('href');
      
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        navigate(href);
      }
    }
  });
  
  function navigate(path) {
    window.history.pushState({}, '', path);
    render(path);
  }
  
  // Handle initial load
  render(window.location.pathname);
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    render(window.location.pathname);
  });
  
  return { navigate };
}
