export function Footer() {
  return `
    <footer class="footer">
      <div class="footer-column footer-column-address">
        <p class="footer-text">
          Am Glockenbach 11<br>
          80469 München
        </p>
        <p class="footer-text">
          Tel: +49 162 700 1514<br>
          www.kuscheltier.studio
        </p>
      </div>
      
      <div class="footer-column footer-column-links">
        <a href="/contact" class="footer-link" data-nav>Contact</a>
        <a href="/legal" class="footer-link" data-nav>Legal</a>
        <a href="/privacy" class="footer-link" data-nav>Privacy Policy</a>
      </div>
      
      <div class="footer-column footer-column-logo">
        <img src="/KuschelTier_logo.png" alt="KuschelTier Logo" class="footer-logo-img" />
      </div>
    </footer>
  `;
}
