import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

export function Contact() {
  window.scrollTo(0, 0);
  return `
    ${Header()}
    
    <section class="content-section">
      <h2 class="section-title">Book an Appointment</h2>
      
      <!-- Book an Appointment Section -->
      <div class="contact-section">
      
        <p class="section-text">
          Kuscheltier Studio is open by appointment only, Monday to Saturday, with bookings available throughout the day and in the evenings.
          To book a visit, reach out on WhatsApp, send a text message, or email me. I'll get back to you as soon as possible.
        </p>
        
      </div>
      
      <!-- Contact Details Section -->
      <div class="contact-section">
       
      
        <div class="contact-info">
          <div class="contact-item">
            <p class="section-text">
              <strong>WhatsApp:</strong> <a href="https://wa.me/491627001514" class="contact-link" target="_blank" rel="noopener noreferrer">0162 700 1514</a><br>
              
            </p>
          </div>
              <div class="contact-item">
            <p class="section-text">
              <strong>Email:</strong> <a href="mailto:book@kuscheltier.studio" class="contact-link">book@kuscheltier.studio</a>
            </p>
          </div>
          <div class="contact-item">
            <p class="section-text">
              <strong>Instagram:</strong> <a href="https://www.instagram.com/kuscheltier.studio" class="contact-link" target="_blank" rel="noopener noreferrer">@kuscheltier.studio</a>
            </p>
          </div>
      
        </div>
      </div>
      
      
      <!-- Location Section -->
      <div class="contact-section">
      <img src="/KuschelTier.svg" alt="KuschelTier" class="logo_text" /> 
         <h2 class="section-title">Location</h2>
          
       
        <div class="map-container">
          <!-- Map  -->
         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663.1815130132127!2d11.565001576756178!3d48.12602285196505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ddf5d2f661115%3A0xca99b06feb8c0d03!2sAm%20Glockenbach%2011%2C%2080469%20M%C3%BCnchen%2C%20Germany!5e0!3m2!1sen!2spt!4v1769093003720!5m2!1sen!2spt" 
         width="100%" height="450" style="border:0;" scrolling="no" allowfullscreen="yes" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
         </iframe>
        </div>
      </div>
      
      <!-- Opening Hours Section -->
      <div class="contact-section">
        <h2 class="section-title">Opening Hours</h2>
        <div class="opening-hours">
          <div class="hours-item">
            <span class="hours-day">Monday:</span>
            <span class="hours-time">11:30 – 18:00</span>
          </div>
          <div class="hours-item">
            <span class="hours-day">Tuesday:</span>
            <span class="hours-time">08:30 – 15:00 & 18:00 – 21:00</span>
          </div>
          <div class="hours-item">
            <span class="hours-day">Wednesday:</span>
            <span class="hours-time">08:30 – 17:00</span>
          </div>
          <div class="hours-item">
            <span class="hours-day">Thursday:</span>
            <span class="hours-time">08:30 – 15:00 & 18:00 – 21:00</span>
          </div>
          <div class="hours-item">
            <span class="hours-day">Friday:</span>
            <span class="hours-time">08:30 – 17:00</span>
          </div>
          <div class="hours-item">
            <span class="hours-day">Saturday:</span>
            <span class="hours-time">09:00 – 16:00</span>
          </div>
          <div class="hours-item">
            <span class="hours-day">Sunday:</span>
            <span class="hours-time">Closed</span>
          </div>
        </div>
      </div>
  
    
    ${Footer()}
  `;
}
