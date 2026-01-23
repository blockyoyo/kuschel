export function LocationPopup() {
  return `
    <div class="location-popup-overlay">
      <div class="location-popup-container">
        <button class="location-popup-close" aria-label="Close popup">&times;</button>
        <div class="location-popup-content">
          <h2 class="section-title">Our Location</h2>
          <p class="section-text">Am Glockenbach 11, 80469 München</p>
          <div class="location-map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663.1815130132127!2d11.565001576756178!3d48.12602285196505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ddf5d2f661115%3A0xca99b06feb8c0d03!2sAm%20Glockenbach%2011%2C%2080469%20M%C3%BCnchen%2C%20Germany!5e0!3m2!1sen!2spt!4v1769093003720!5m2!1sen!2spt" 
              width="100%" 
              height="450" 
              style="border:0; border-radius: 12px;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  `;
}
