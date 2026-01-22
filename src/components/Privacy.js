import { Header } from './Header.js';
import { Footer } from './Footer.js';

export function Privacy() {
  return `
    ${Header()}
    
    <section class="content-section">
      <h2 class="section-title">Privacy Policy</h2>
      
      <div class="privacy-content">
        <div class="privacy-section">
          <h3 class="hero-text">1. Data Collection</h3>
          <p class="section-text">
            We collect information that you provide directly to us when booking appointments, including your name, 
            phone number, and information about your dog. This information is necessary to provide our grooming services.
          </p>
        </div>
        
        <div class="privacy-section">
          <h3 class="hero-text">2. Use of Information</h3>
          <p class="section-text">
            We use the information we collect to:
            <ul class="privacy-list">
              <li>Schedule and manage appointments</li>
              <li>Communicate with you about your appointments</li>
              <li>Provide personalized grooming services for your dog</li>
              <li>Improve our services</li>
            </ul>
          </p>
        </div>
        
        <div class="privacy-section">
          <h3 class="hero-text">3. Data Storage</h3>
          <p class="section-text">
            Your personal information is stored securely and is only accessible to authorized personnel. 
            We retain your information only for as long as necessary to provide our services and comply with legal obligations.
          </p>
        </div>
        
        <div class="privacy-section">
          <h3 class="hero-text">4. Data Sharing</h3>
          <p class="section-text">
            We do not sell, trade, or rent your personal information to third parties. We may share information 
            only when required by law or to protect our rights and safety.
          </p>
        </div>
        
        <div class="privacy-section">
          <h3 class="hero-text">5. Your Rights</h3>
          <p class="section-text">
            You have the right to:
            <ul class="privacy-list">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
            </ul>
          </p>
        </div>
        
        <div class="privacy-section">
          <h3 class="hero-text">6. Contact</h3>
          <p class="section-text">
            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            <br><br>
            Phone: <a href="tel:+491627001514" class="contact-link">+49 162 700 1514</a><br>
            Address: Am Glockenbach 11, 80469 München, Germany
          </p>
        </div>
        
        <div class="privacy-section">
          <h3 class="hero-text">7. Updates</h3>
          <p class="section-text">
            We may update this Privacy Policy from time to time. The most current version will always be available on this page.
            Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </section>
    
    ${Footer()}
  `;
}
