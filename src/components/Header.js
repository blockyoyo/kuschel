export function Header() {
  return `
    <header class="header">
      <div class="">
        <a href="/" class="logo-link" data-nav>
          <img src="/KuschelTier_logo.svg" alt="KuschelTier Logo" class="logo header-logo-animate" />
        </a>
      </div>
      
      <div class="header-right header-nav-animate">
        <a href="/#services" class="nav-link" data-nav>Services</a>
        <a href="/contact" class="nav-link" data-nav>Appointments</a>
        <a href="/#faq" class="nav-link" data-nav>FAQ</a>
      </div>
      <img src="/KuschelTier.svg" alt="KuschelTier" class="logo_text logo-text-animate" /> 

    </header>
  `;
}
