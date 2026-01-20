(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();document.querySelector("#app").innerHTML=`
  <!-- Header -->
  <header class="header">

    <div >
    <img src="/KuschelTier_logo.png" alt="KuschelTier Logo" class="logo" />
    </div>
    <button class="cta-button">BOOK A SLOT</button>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    
    <img src="/KuschelTier.png" alt="KuschelTier" class="logo_text" /> 
    <br>
    <br>
    
    <p class="hero-text">
      Located in Am Glockenbach 11, in the heart of Munich. <br>
      It’s a calm, grooming space designed to feel safe, <br>
      quiet, and comfortable for every dog.
    </p>
     <p class="hero-text">
      Making a difference.
    </p>
    <h2 class="section-title">
      One Dog at a Time.
    </h2>
    <p class="hero-text">
      A full service means your dog receives my full attention from start to finish. <br>
      No overlap, no waiting, no distractions.
    </p>
    <h2 class="section-title">
      Unhurried, Gentle Pace.
    </h2>
     <p class="hero-text">
      I take my time. There’s no rush during bathing, drying, or grooming.<br>
      We bond throughout the whole process.
    </p>
    <svg class="illustration" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M 100 50 Q 80 80 90 120 Q 100 140 110 120 Q 120 80 100 50" stroke="#4338ca" stroke-width="2" fill="none"/>
      <ellipse cx="100" cy="140" rx="40" ry="25" stroke="#4338ca" stroke-width="2" fill="none" transform="rotate(-10 100 140)"/>
      <path d="M 100 165 Q 90 200 100 240" stroke="#4338ca" stroke-width="2" fill="none"/>
      <ellipse cx="100" cy="260" rx="35" ry="20" stroke="#4338ca" stroke-width="2" fill="none" transform="rotate(15 100 260)"/>
    </svg>
  </section>

  <!-- Section 1 -->
  <section class="content-section">
    <h2 class="section-title">Support for Shelter Dogs</h2>
    <p class="section-text">
     With every appointment, you help a shelter dog: 5% of each service is donated to help shelters/rescues. And if you’ve adopted from a shelter, your dog’s first grooming is free—extra time, gentle care, and a calm start.
    </p>
    <button class="cta-button-large">Book your appointment now</button>
    <svg class="illustration" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M 100 50 L 100 280 M 80 100 Q 100 120 120 100 M 70 180 Q 100 200 130 180" stroke="#4338ca" stroke-width="2" fill="none"/>
      <path d="M 90 240 Q 100 250 110 240 Q 120 230 110 220" stroke="#4338ca" stroke-width="2" fill="none"/>
    </svg>
  </section>

  <!-- Section 2 -->
  <section class="content-section">
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
      <b>Large dogs — 180 €</b> <br> Goldendoodle, Lagotto Romagnolo, similar curly or long-coat types Königspudel: <b>+20 €</b>
    </p>
    <svg class="illustration" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M 100 50 Q 120 100 100 150 Q 80 200 100 250" stroke="#4338ca" stroke-width="2" fill="none"/>
      <circle cx="100" cy="150" r="30" stroke="#4338ca" stroke-width="2" fill="none"/>
      <path d="M 80 120 L 120 180 M 120 120 L 80 180" stroke="#4338ca" stroke-width="2"/>
    </svg>
  </section>

  <!-- Section 3 -->
  <section class="content-section">
    <h2 class="section-title">First Grooming for Adopted Dogs</h2>
    <p class="section-text">
      A dedicated first grooming visit for dogs adopted from shelters, with extra time to build trust and introduce the process calmly.
Price: 50% discount on the standard Full Grooming rate\u2028Duration: up to 4 hours
    </p>
    <svg class="illustration" viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M 100 50 Q 80 100 90 150 Q 100 200 110 250 Q 90 300 100 350" stroke="#4338ca" stroke-width="2" fill="none"/>
      <circle cx="100" cy="150" r="25" stroke="#4338ca" stroke-width="2" fill="none"/>
      <circle cx="100" cy="250" r="30" stroke="#4338ca" stroke-width="2" fill="none"/>
      <path d="M 70 100 L 130 100 M 75 200 L 125 200 M 80 300 L 120 300" stroke="#4338ca" stroke-width="2"/>
    </svg>
  </section>

  <!-- Section 4 -->
  <section class="content-section">
    <h2 class="section-title">Maintenance</h2>
    <p class="section-text">
      A service between full grooming sessions.\u2028Includes washing, drying, <br> 
      and clean-ups around the eyes, under the paws, and the genital area.<br>
      <br>
      <b>Duration: 1.5 hours (+30 minutes for Königspudel)</b>  
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
    <svg class="illustration-large" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <g id="scribble">
        <path d="M 50 50 Q 80 80 60 120 Q 40 160 70 180 Q 100 200 80 240" stroke="#4338ca" stroke-width="2" fill="none"/>
        <path d="M 100 60 Q 130 90 110 130 Q 90 170 120 190 Q 150 210 130 250" stroke="#4338ca" stroke-width="2" fill="none"/>
        <path d="M 70 100 Q 100 130 80 170 Q 60 210 90 230" stroke="#4338ca" stroke-width="2" fill="none"/>
        <path d="M 120 80 Q 140 110 130 150 Q 120 190 140 220" stroke="#4338ca" stroke-width="2" fill="none"/>
        <circle cx="100" cy="150" r="60" stroke="#4338ca" stroke-width="2" fill="none" opacity="0.3"/>
        <path d="M 60 120 L 140 180 M 140 120 L 60 180" stroke="#4338ca" stroke-width="3" opacity="0.5"/>
      </g>
    </svg>
    <button class="cta-button-large">See how it works</button>
  </section>

  <!-- Section 5 -->
   <section class="content-section">
    <h2 class="section-title">Puppy Adaptation</h2>
    <p class="section-text">
      A calm introduction to grooming: new sounds, tools, short handling exercises. <br> 
      Designed to create positive associations and build confidence.
      <br>
      <b>Duration: 1 hour</b>  
      
      <br>
      
      Price — 60 €
    
      <br>
      Best timing: come in right after the last vaccinations. The earlier we start, <br>
      the easier it is to avoid matting and build a relaxed routine.
    </p>
    <svg class="illustration-large" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <g id="scribble">
        <path d="M 50 50 Q 80 80 60 120 Q 40 160 70 180 Q 100 200 80 240" stroke="#4338ca" stroke-width="2" fill="none"/>
        <path d="M 100 60 Q 130 90 110 130 Q 90 170 120 190 Q 150 210 130 250" stroke="#4338ca" stroke-width="2" fill="none"/>
        <path d="M 70 100 Q 100 130 80 170 Q 60 210 90 230" stroke="#4338ca" stroke-width="2" fill="none"/>
        <path d="M 120 80 Q 140 110 130 150 Q 120 190 140 220" stroke="#4338ca" stroke-width="2" fill="none"/>
        <circle cx="100" cy="150" r="60" stroke="#4338ca" stroke-width="2" fill="none" opacity="0.3"/>
        <path d="M 60 120 L 140 180 M 140 120 L 60 180" stroke="#4338ca" stroke-width="3" opacity="0.5"/>
      </g>
    </svg>
    
  </section>

  <!-- Features Grid -->
  <section class="features-section">
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
    
    <!-- Customer Reviews -->
    <div class="email-screenshots">
      <div class="blob blob-purple"></div>
      <div class="blob blob-blue"></div>
      <div class="screenshot-grid">
        <div class="email-card">
          <div class="email-header">
            <div class="avatar"></div>
            <div class="email-meta">
              <strong>Sarah M.</strong>
              <p>First time visit with Max...</p>
            </div>
          </div>
          <div class="email-content">
            <p>Max was so anxious about grooming, but the calm atmosphere and one-on-one attention made all the difference. He came home relaxed and beautiful. Thank you!</p>
          </div>
          
        </div>
        <div class="email-card">
          <div class="email-header">
            <div class="avatar"></div>
            <div class="email-meta">
              <strong>Thomas K.</strong>
              <p>Our rescue dog's first grooming...</p>
            </div>
          </div>
          <div class="email-content">
            <p>Luna came from a shelter and was terrified. The extra time and gentle approach helped her trust the process. The free first grooming was such a kind gesture!</p>
          </div>
          
        </div>
        <div class="email-card">
          <div class="email-header">
            <div class="avatar"></div>
            <div class="email-meta">
              <strong>Maria L.</strong>
              <p>Best grooming experience ever...</p>
            </div>
          </div>
          <div class="email-content">
            <p>No rushing, no stress. My Golden Retriever actually enjoys coming here now. The unhurried pace and full attention make such a difference. Highly recommend!</p>
          </div>
          
        </div>
        <div class="email-card">
          <div class="email-header">
            <div class="avatar"></div>
            <div class="email-meta">
              <strong>David R.</strong>
              <p>Puppy adaptation session...</p>
            </div>
          </div>
          <div class="email-content">
            <p>Brought our 4-month-old puppy for the adaptation session. Perfect timing after vaccinations! She's now completely comfortable with grooming. Worth every euro.</p>
          </div>
          
        </div>
        <div class="email-card">
          <div class="email-header">
            <div class="avatar"></div>
            <div class="email-meta">
              <strong>Anna B.</strong>
              <p>Regular maintenance visits...</p>
            </div>
          </div>
          <div class="email-content">
            <p>The maintenance service keeps my Havanese looking perfect between full grooms. Quick, gentle, and always professional. My dog loves the calm environment.</p>
          </div>
          
        </div>
        <div class="email-card">
          <div class="email-header">
            <div class="avatar"></div>
            <div class="email-meta">
              <strong>Michael H.</strong>
              <p>Königspudel grooming...</p>
            </div>
          </div>
          <div class="email-content">
            <p>Finally found someone who understands the needs of my Königspudel. The extra time and expertise show. My dog looks amazing and is so much happier!</p>
          </div>
         
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="faq-section">
    <h2 class="section-title">FAQ</h2>
    <div class="faq-container">
      <div class="faq-item">
        <button class="faq-question">
          <span>Why does Full Grooming take so much time?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>I groom one dog at a time and adjust the pace to the dog's comfort. Washing, drying, and grooming can be stressful for some dogs, so I slow down when needed to reduce tension and keep the experience calm. The extended duration ensures the process stays safe, comfortable, and unhurried.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Why are Maintenance visits important?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Regular Maintenance visits prevent matting, keep the coat healthy, and reduce stress during Full Grooming sessions. They also include removing fur around the eyes and under the paws, which helps the dog stay comfortable between full appointments.</p>
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
          <p>I prefer not. Most dogs become more distracted or anxious when their owner is present, which makes the process harder for them. I also need to build trust and focus directly with the dog and when the owner is nearby, the dog looks for contact with them instead of connecting with me. This increases stress and often makes the session longer and less comfortable for the dog.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Why is the studio door locked while you're grooming?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>To avoid distractions. I groom one dog at a time, and both the dog and I need to stay focused and connected throughout the session. Unexpected entries interrupt this process and make it harder for the dog to remain calm and present.</p>
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
          <p>As early as possible — ideally after all required vaccinations. Beginning young helps the puppy build positive associations with grooming and makes future sessions much easier. My Puppy Adaptation session is designed exactly for this purpose.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Do I need to prepare my dog before the visit?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Regular brushing at home helps prevent matting and makes the grooming process much more comfortable for your dog. If you brush your dog consistently, there's nothing additional you need to prepare before the appointment.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Should I bring my dog's treats?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Yes. I work with positive reinforcement, so treats are often part of the grooming process or given afterward, depending on the dog's needs. I also provide treats at the studio—just let me know if your dog has any allergies.</p>
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

  <!-- Footer -->
  <footer class="footer">
   
    <img src="/KuschelTier_logo.png" alt="KuschelTier Logo" class="logo" />
    
    <p class="footer-text">
    Am Glockenbach 11, 
    80469 München
    </p>
    <p class="footer-text">
    +49 162 700 1514 
    www.kuscheltier.studio 
    </p>
  </footer>
`;const r=document.querySelector("#app");r.addEventListener("click",a=>{if(a.target.closest(".faq-question")){const o=a.target.closest(".faq-question").closest(".faq-item"),i=o.classList.contains("active");document.querySelectorAll(".faq-item").forEach(e=>{e.classList.remove("active")}),i||o.classList.add("active")}});
