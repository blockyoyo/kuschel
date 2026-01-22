import { Header } from './Header.js';
import { Footer } from './Footer.js';

export function Legal() {
  return `
    ${Header()}
    
    <section class="content-section">
      <h2 class="section-title">Legal</h2>
      
      <div class="legal-content">
        <div class="legal-section">
          <h3 class="hero-text">Terms of Service</h3>
          <p class="section-text">
            By booking an appointment with Kuscheltier, you agree to the following terms:
            <ul class="legal-list">
              <li>Appointments must be cancelled at least 24 hours in advance</li>
              <li>Payment is due at the time of service</li>
              <li>We reserve the right to refuse service if a dog poses a safety risk</li>
              <li>All dogs must be up to date on vaccinations</li>
            </ul>
          </p>
        </div>
        
        <div class="legal-section">
          <h3 class="hero-text">Liability</h3>
          <p class="section-text">
            While we take every precaution to ensure the safety and comfort of your dog, 
            Kuscheltier is not liable for any injuries or incidents that may occur during 
            the grooming process. By using our services, you acknowledge and accept this risk.
          </p>
        </div>
        
        <div class="legal-section">
          <h3 class="hero-text">Cancellation Policy</h3>
          <p class="section-text">
            Cancellations made less than 24 hours before the appointment may be subject to 
            a cancellation fee. No-shows will be charged the full service fee.
          </p>
        </div>
        
        <div class="legal-section">
          <h3 class="hero-text">Contact</h3>
          <p class="section-text">
            For questions about these terms, please contact us at:
            <br><br>
            Phone: <a href="tel:+491627001514" class="contact-link">+49 162 700 1514</a><br>
            Address: Am Glockenbach 11, 80469 München, Germany
          </p>
        </div>
      </div>
    </section>
    
    ${Footer()}
  `;
}
