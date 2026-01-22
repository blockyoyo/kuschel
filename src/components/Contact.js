import { Header } from './Header.js';
import { Footer } from './Footer.js';

export function Contact() {
  return `
    ${Header()}
    
    <section class="content-section">
      <h2 class="section-title">Book an Appointment</h2>
      
      <!-- Book an Appointment Section -->
      <div class="contact-section">
      
        <p class="section-text">
          Your grooming visit can be booked online through the booking system.
        </p>
        
        <p class="section-text">
          If none of the available time slots suit you, feel free to contact me directly — I'll do my best to find an alternative.
        </p>
      </div>
      
      <!-- Contact Details Section -->
      <div class="contact-section">
       
      
        <div class="contact-info">
          <div class="contact-item">
            <p class="section-text">
              <strong>Phone:</strong> <a href="tel:+491627001514" class="contact-link">0162 700 1514</a><br>
              <span class="small-text">Available also on WhatsApp</span>
            </p>
          </div>
          <div class="contact-item">
            <p class="section-text">
              <strong>Instagram:</strong> <a href="https://www.instagram.com/kuscheltier.studio" class="contact-link" target="_blank" rel="noopener noreferrer">@kuscheltier.studio</a>
            </p>
          </div>
          <div class="contact-item">
            <p class="section-text">
              <strong>Email:</strong> <a href="mailto:book@kuscheltier.studio" class="contact-link">book@kuscheltier.studio</a>
            </p>
          </div>
        </div>
      </div>
      
      <!-- About Me Section -->
      <div class="contact-section">
        <h2 class="section-title">About Me</h2>
        <p class="section-text">
          I'm Małgorzata Leszkiewicz (Gosia), founder of Kuscheltier Studio. Born in Warsaw, I came to grooming after years in advertising and project management. I'm also Franka's human – you may meet her at the studio from time to time.
        </p>
        <p class="section-text">
          My goal is simple: to support happy, healthy dogs—with calm, gentle grooming and by encouraging adoption. That's why 5% of every service is donated to dog shelters, and the first grooming visit is free for dogs adopted from shelters.
        </p>
        <div class="about-photos">
          <div class="photo-container">
            <img src="/about-gosia.jpg" alt="Małgorzata Leszkiewicz" class="about-photo" />
          </div>
          <div class="photo-container">
            <img src="/about-gosia-franka.jpg" alt="Gosia with Franka" class="about-photo" />
          </div>
        </div>
      </div>
      
      <!-- Location Section -->
      <div class="contact-section">
         <h2 class="section-title">Location</h2>
          <img src="/KuschelTier.png" alt="KuschelTier" class="logo_text" /> 
       
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
    </section>
      <!-- Section 3 -->
      <section class="content-section" >
        <h2 class="section-title">First Grooming for Adopted Dogs</h2>
        <p class="section-text">
          A dedicated first grooming visit for dogs adopted from shelters within the past 30 days, <br>
          with extra time to build trust and introduce the process calmly. Limited availability.
        </p>
        <p class="section-text">
          Free
        </p>
        <p class="section-text">
          <b>Duration: up to 4 hours</b>
        </p>
    
  </section>
    
    ${Footer()}
  `;
}
