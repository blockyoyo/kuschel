export function Info() {
  return `
    <div class="info-popup-overlay">
      <div class="info-popup-container">
        <button class="info-popup-close" aria-label="Close popup">&times;</button>
        <div class="info-logo">
          <img src="/KuschelTier_logo.png" alt="KuschelTier Logo" />
        </div>
        <div class="info-content">
          <h2 class="section-title">Quick Info</h2>
          <div class="info-buttons">
            <button class="info-popup-button" data-action="price">Prices and Services</button>
            <button class="info-popup-button" data-action="call">Call</button>
            <button class="info-popup-button" data-action="location">Location</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
