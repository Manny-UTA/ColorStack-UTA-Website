<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ColorStack UTA</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Header -->
    <header>
        <div class="container">
        <a href="home.php"> 
            <img src="ColorStackUTAlogo.png" alt="ColorStack UTA Logo" class="logo-image">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        </a>
            <nav class='navbar'> 
                <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Meet the Team</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#" class="join-now">Become a Member</a></li>
                </ul>
            </nav>
        </div>
    </header>


    <!-- Hero Section -->
    <section class="what-we-do">
        <div class="container">
            <div class="text-content">
                <h2>What We Do</h2>
                <p>At ColorStack UTA, we’re committed to increasing the number of Black and Latinx Computer Science graduates by building a supportive, inclusive tech community.</p>
                <a href="#" class="btn-primary">Become a Member</a>
            </div>

            <!-- Carousel -->
            <div class="carousel-container">
                <div class="slides">
                    <img src="img1.jpeg" alt="Slide 1" class="active">
                    <img src="img2.jpeg" alt="Slide 2">
                    <img src="img3.jpeg" alt="Slide 3">
                </div>
                <span class="prev">&#10094;</span>
                <span class="next">&#10095;</span>
                <div class="dotsContainer">
                    <span class="dot active" data-slide="0"></span>
                    <span class="dot" data-slide="1"></span>
                    <span class="dot" data-slide="2"></span>
                </div>
            </div>
        </div>
    </section>

<!-- Pillar Section -->
<section class="features-section">
    <h2 class="section-title">Our Pillars</h2>
    <div class="features-container">
        <div class="feature">
            <div class="circle-background">
                <i class="fa-solid fa-users feature-icon"></i>
            </div>
            <h3>Community</h3>
            <p>
                <strong>Find your life-long support system and experience a truly safe space for Black and Latinx CS students.</strong>
            </p>
        </div>
        
        <div class="feature">
            <div class="circle-background">
            <i class="fa-solid fa-graduation-cap feature-icon"></i>
            </div>
            <h3>Academic</h3>
            <p>
                <strong>Get help with homework and advice in our Slack workspace and make friends with ColorStack members through social activities.</strong>
            </p>
        </div>

        <div class="feature">
            <div class="circle-background">
                <i class="fa-solid fa-suitcase feature-icon"></i>
            </div>
            <h3>Career</h3>
            <p>
                <strong>Submit your resume to our partner companies and apply to programs/events in collaboration with our partners.</strong>
            </p>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="cta-section">
    <div class="cta-content">
        <h2>Join ColorStack UTA Today!</h2>
        <p>Be part of a thriving community of Black and Latinx Computer Science students. Gain access to exclusive events, academic support, and career opportunities. Take the next step in your journey with us!</p>
        <a href="join.php" class="cta-button">Become a Member</a>
    </div>
</section>

<!-- Upcoming Events -->
<section class="upcoming-events">
    <h2 class="section-title">Upcoming Events</h2>
    <div class="events-container">
        <!-- Most Upcoming Event -->
        <div class="right-events">
            <div class="event-card small">
                <div class="event-date">
                    <span class="month">MAR</span>
                    <span class="day">10</span>
                </div>
                <div class="event-image">
                    <img src="Events.jpeg" alt="Event 2 Image">
                </div>
                <div class="event-details">
                    <h3 class="event-title">Career Fair Prep</h3>
                    <p class="event-category">Professional Development</p>
                    <div class="event-time">
                        <i class="clock-icon">⏰</i> 2:00 PM - 4:00 PM
                    </div>
                </div>
            </div>

        <!-- Other Events -->
        <div class="right-events">
            <div class="event-card small">
                <div class="event-date">
                    <span class="month">MAR</span>
                    <span class="day">10</span>
                </div>
                <div class="event-image">
                    <img src="Events.jpeg" alt="Event 2 Image">
                </div>
                <div class="event-details">
                    <h3 class="event-title">Career Fair Prep</h3>
                    <p class="event-category">Professional Development</p>
                    <div class="event-time">
                        <i class="clock-icon">⏰</i> 2:00 PM - 4:00 PM
                    </div>
                </div>
            </div>
            <div class="event-card small">
                <div class="event-date">
                    <span class="month">MAR</span>
                    <span class="day">15</span>
                </div>
                <div class="event-image">
                    <img src="Events.jpeg" alt="Event 3 Image">
                </div>
                <div class="event-details">
                    <h3 class="event-title">Team Building Game Night</h3>
                    <p class="event-category">Social</p>
                    <div class="event-time">
                        <i class="clock-icon">⏰</i> 6:00 PM - 9:00 PM
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Our Sponsors -->
<section class="sponsors-section">
    <h2 class="sponsors-heading">Our Sponsors</h2>

    <div class="sponsor-tier platinum">
        <h3><span class="medal">🥇</span> Platinum</h3>
        <div class="sponsor-logos">
            <img src="jpmorgan.jpeg" alt="Bloomberg">
            <img src="jpmorgan.jpeg" alt="BNY">
            <img src="jpmorgan.jpeg" alt="NVIDIA">
        </div>
    </div>

    <div class="sponsor-tier gold">
        <h3><span class="medal">🥈</span> Gold</h3>
        <div class="sponsor-logos">
            <img src="jpmorgan.jpeg" alt="Capital One">
            <img src="jpmorgan.jpeg" alt="Cisco">
            <img src="jpmorgan.jpeg" alt="SEO">
            <img src="jpmorgan.jpeg" alt="NextEra">
            <img src="jpmorgan.jpeg" alt="Raymond James">
        </div>
    </div>

    <div class="sponsor-tier silver">
        <h3><span class="medal">🥉</span> Silver</h3>
        <div class="sponsor-logos">
            <img src="jpmorgan.jpeg" alt="UKG">
        </div>
    </div>

    <div class="sponsor-cta">
    <h3>Empower the Next Generation of CS Leaders</h3>
    <p>Your sponsorship helps create opportunities for Black and Latinx CS students to excel academically, socially, and professionally.  
    Join an exclusive network of visionary companies driving meaningful change in tech.</p>
    <a href="#" class="cta-button">Learn About Sponsorship Tiers</a>
    </div>
</section>

<!-- Follow our Socials! -->
<section class="social-media-section">
  <div class="container">
    <h2 class="section-title">Follow Our Socials!</h2>
    <div class="social-grid">
      <!-- Large Instagram Post on the Left -->
      <div class="large-post">
        <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DFnnrDIJGgp/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14"></blockquote>
      </div>

      <!-- Smaller Instagram Posts on the Right -->
      <div class="small-posts">
        <div class="small-post">
          <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DFnnrDIJGgp/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14"></blockquote>
        </div>
        <div class="small-post">
          <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DFnnrDIJGgp/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14"></blockquote>
        </div>
        <div class="small-post">
          <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DFnnrDIJGgp/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14"></blockquote>
        </div>
        <div class="small-post">
          <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DFnnrDIJGgp/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14"></blockquote>
        </div>
      </div>
    </div>
  </div>
  <script async src="//www.instagram.com/embed.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</section>


<!--FAQ-->
<section class="faq-section">
    <h2 class="faq-heading">Frequently Asked Questions</h2>
    <div class="accordion-container">
        <ul id="accordion">

            <li class="faq-item">
                <input type="radio" name="accordion" id="faq1">
                <label for="faq1" class="faq-label">
                    <span class="question">What does ColorStack do?</span>
                    <span class="arrow">&#x3e;</span>
                </label>
                <div class="content">
                    <p>ColorStack increases the number of Black & Latinx computer science students who start rewarding technical careers.</p>
                </div>
            </li>

            <li class="faq-item">
                <input type="radio" name="accordion" id="faq2">
                <label for="faq2" class="faq-label">
                    <span class="question">Do I have to be Black or Latinx to join?</span>
                    <span class="arrow">&#x3e;</span>
                </label>
                <div class="content">
                    <p>While you must be Black or Latinx to become a member of the national organization, the chapter is open to everyone committed to our mission.</p>
                </div>
            </li>

            <li class="faq-item">
                <input type="radio" name="accordion" id="faq3">
                <label for="faq3" class="faq-label">
                    <span class="question">If I join ColorStack UF, am I automatically in ColorStack National?</span>
                    <span class="arrow">&#x3e;</span>
                </label>
                <div class="content">
                    <p>No, you still need to apply to become a member of the ColorStack national chapter at <a href="https://www.colorstack.org" target="_blank">www.colorstack.org</a>.</p>
                </div>
            </li>

        </ul>
    </div>
</section>

<!-- Footer -->
<footer>
    <p>&copy; 2025 ColorStack UTA. All rights reserved.</p>
</footer>

<script src="script.js"></script>
</body>
</html>
