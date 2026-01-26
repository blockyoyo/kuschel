import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

export function Home() {
  window.scrollTo(0, 0);
  return `
    ${Header()}
    
    <!-- Hero Section -->
    <section class="hero-content" id="hero-initial-content">
      <br>
      <br>

      

      <p class="hero-text">
        Making a difference.
      </p>
      <h2 class="section-title-hero words-slide-from-right">
        <span class="word">One</span> <span class="word">Dog</span> <span class="word">at</span> 
        <span class="word">a</span> <span class="word">Time.</span>
      </h2>
       <p class="hero-text-location">
        Located in Am Glockenbach 11, in the heart of Munich. <br>
        Kuscheltier is a calm, grooming space designed to feel safe, <br>
        quiet, and comfortable for every dog.
      </p>
    </section>

    <!-- Full Screen Image 1 -->
    <section class="fullscreen-image">
      <img src="/1.webp" alt="Dog grooming" />
    </section>

    <!-- Content After Image -->
    <section class="hero-content hero-content-after" id="content-after-image">
      <p class="hero-text">
        A full service means your dog receives my full attention from start to finish. <br>
        No overlap, no waiting, no distractions.
      </p>
      <h2 class="section-title">
        Unhurried, Gentle Pace.
      </h2>
      <p class="hero-text">
        I take my time. There's no rush during bathing, drying, or grooming.<br>
        We bond throughout the whole process.
      </p>
    </section>

    <!-- Shelter Section -->
    <section class="content-section shelter-content" id="appointments">
      <h2 class="section-title">Support for Shelter Dogs</h2>
      <p class="section-text">
       With every appointment, you help a shelter dog: 5% of each service is donated to help shelters/rescues. And if you've adopted from a shelter, your dog's first grooming 
       is free with extra time, gentle care and a calm start.
      </p>
      <button class="cta-button-large">Book your appointment</button>
    </section>

    <!-- Full Screen Image 2 -->
    <section class="fullscreen-image">
      <img src="/2.webp" alt="Dog grooming" />
    </section>

    <!-- Services Section -->
    <section class="content-section" id="services">
      <h2 class="section-title">Services</h2>
       <h2 class="hero-text">
        Full Grooming
      </h2>
      <p class="section-text">
        Complete care including washing, drying, grooming, and ear cleaning. <br> 
        Nail trimming is offered only if the dog is comfortable — never forced.
      </p>
      <h2 class="hero-text">
      Duration: 3 hours (+30 minutes for Königspudel)
      </h2>
      <p class="section-text">
        <b>Small dogs — 120 €</b> <br> Yorkshire Terrier, Long-haired Dachshund, Pomeranian, Toy Poodle
      </p>
      <p class="section-text">
        <b>Medium dogs — 150 €</b> <br> Havanese, Maltese, West Highland White Terrier, Jack Russell Terrier, Border Terrier
      </p>
      <p class="section-text">
        <b>Large dogs — 180 €</b> <br> Goldendoodle, Lagotto Romagnolo, similar curly or long-coat types <br> Königspudel: <b>+20 €</b>
      </p>
    </section>

    <!-- Maintenance Section -->
    <section class="content-section">
      <h2 class="section-title">Maintenance</h2>
      <p class="section-text">
        A service between full grooming sessions.Includes washing, drying, <br> 
        and clean-ups around the eyes, under the paws, and the genital area.<br>
        <br>
        <b>Duration: 1.5 hours </b>  
        <br>
        <b>Prices:</b>
        <br>
        Small dogs — 40 € 
        <br>
        Medium dogs — 60 €
        <br>
        Large dogs — 80 €
        <br>
      </p>
    <p class="section-text">Königspudel +30 minutes</p>
     
      <button class="cta-button-large">See how it works</button>
    </section>

    <!-- Puppy Love Section -->
     <section class="content-section">
      <h2 class="section-title">Puppy Love</h2>
      <p class="section-text">
        A calm introduction to grooming: new sounds, tools, short handling exercises. <br> 
        Designed to create positive associations and build confidence.
        <br>
        <br>
        <b>Duration: 1 hour</b>  
        <br>
        Price: 60 €
      
        <br>
        <br>
        Best timing: come in right after the last vaccinations. The earlier we start, <br>
        the easier it is to avoid matting and build a relaxed routine.
      </p>
    </section>

  <!-- Full Screen Image 3 -->
    <section class="fullscreen-image">
      <img src="/3.webp" alt="Dog grooming" />
    </section>

  <!-- Features Grid -->
  <section class="features-section" data-animate="staggerReveal">
    <h2 class="section-title">What you get:</h2>
    <div class="features-grid">
      <div class="feature-card">
        <h3>Gentle, Patient Care</h3>
        <p>Your dog receives undivided<br>attention in a calm, stress-free environment.</p>
      </div>
      <div class="feature-card">
        <h3>Trust & Comfort</h3>
        <p>Building positive associations<br>through unhurried, respectful handling.</p>
      </div>
      <div class="feature-card">
        <h3>Expert Grooming</h3>
        <p>Professional care tailored to<br>your dog's individual needs and comfort level.</p>
      </div>
    </div>
    
  

  <!-- Full Screen Image 4 -->
    <section class="fullscreen-image">
      <img src="/4.webp" alt="Dog grooming" />
    </section>

  <!-- FAQ Section -->
  <section class="faq-section" id="faq">
    <h2 class="section-title">FAQ</h2>
    <div class="faq-container">
      <div class="faq-item">
        <button class="faq-question">
          <span>Why does Full Grooming take so much time?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>I groom one dog at a time and adjust the pace to the dog's comfort. Washing, drying, and grooming can be stressful for some dogs, 
          so I slow down when needed to reduce tension and keep the experience calm. The extended duration ensures the process stays safe, comfortable, and unhurried.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Why are Maintenance visits important?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Regular Maintenance visits prevent matting, keep the coat healthy, and reduce stress during Full Grooming sessions. 
          They also include removing fur around the eyes and under the paws, which helps the dog stay comfortable between full appointments.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Do you groom anxious or sensitive dogs?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Yes. My approach is designed for dogs who need more time, calm handling, and a gentle pace.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Can I stay with my dog during grooming?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>I prefer not. Most dogs become more distracted or anxious when their owner is present, which makes the process harder for them. 
          I also need to build trust and focus directly with the dog and when the owner is nearby, the dog looks for contact with them instead of connecting with me. 
          This increases stress and often makes the session longer and less comfortable for the dog.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Why is the studio door locked while you're grooming?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>To avoid distractions. I groom one dog at a time, and both the dog and I need to stay focused and connected throughout the session. 
          Unexpected entries interrupt this process and make it harder for the dog to remain calm and present.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>What if my dog doesn't tolerate nail trimming?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>I never force nail trimming. If the dog is stressed or resisting, I skip this step and try again in a future session when trust is stronger.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>How often should my dog be groomed?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Every 8-12 weeks for most breeds. Some long or curly coats benefit from more frequent visits with Maintenance sessions in between.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>When should I bring my puppy for the first grooming visit?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>As early as possible — ideally after all required vaccinations. Beginning young helps the puppy build positive associations with grooming and 
          makes future sessions much easier. My Puppy Adaptation session is designed exactly for this purpose.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Do I need to prepare my dog before the visit?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Regular brushing at home helps prevent matting and makes the grooming process much more comfortable for your dog. If you brush your dog 
          consistently, there's nothing additional you need to prepare before the appointment.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Should I bring my dog's treats?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Yes. I work with positive reinforcement, so treats are often part of the grooming process or given afterward, depending on the dog's needs. 
          I also provide treats at the studio—just let me know if your dog has any allergies.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>How can I pay for my appointment?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>You can pay by card or in cash at the studio.</p>
        </div>
      </div>
    </div>
  </section>

  ${Footer()}
  `;
}
