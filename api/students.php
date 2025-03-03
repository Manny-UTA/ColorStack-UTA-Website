<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ColorStack UTA</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Students Page Styles */
        .students-page {
            padding: 4rem 1rem;
            background-color: #f6f2ec; 
        }

        .students-intro {
            text-align: center;
            padding: 4rem 0;
            background-color: #0b0f24; 
            color: #f6f2ec; 
        }

        .students-intro h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .students-intro p {
            font-size: 1.25rem;
            max-width: 800px;
            margin: 0 auto;
        }

        .officer-opportunities {
            padding: 4rem 0;
            background-color: #f6f2ec; 
            color: #0b0f24; 
        }

        .officer-opportunities h2 {
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 1.5rem;
        }

        .officer-opportunities p {
            font-size: 1.25rem;
            text-align: center;
            max-width: 800px;
            margin: 0 auto 2rem;
        }

        .officer-opportunities ul {
            list-style: none;
            padding: 0;
            max-width: 800px;
            margin: 0 auto 2rem;
        }

        .officer-opportunities li {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            padding-left: 1.5rem;
            position: relative;
        }

        .officer-opportunities li::before {
            content: "•";
            color: #fd9739; 
            font-size: 1.5rem;
            position: absolute;
            left: 0;
            top: -0.2rem;
        }

        .company-logos {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            margin: 2rem 0;
        }

        .company-logos img {
            max-width: 30%;
            height: auto;
            transition: filter 0.3s ease;
            object-fit: contain;
        }

        .company-logos img:hover {
            filter: grayscale(0%);
        }

        .calendar-subscribe {
            padding: 4rem 0;
            background-color: #0b0f24; 
            color: #f6f2ec; 
            text-align: center;
        }

        .calendar-subscribe h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .calendar-subscribe p {
            font-size: 1.25rem;
            max-width: 800px;
            margin: 0 auto 2rem;
        }

        .calendar-subscribe .cta-button {
            background-color: #fd9739; 
            color: #fff;
            padding: 1rem 2rem;
            text-transform: uppercase;
            font-weight: bold;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }

        .calendar-subscribe .cta-button:hover {
            background-color: #e68a33; 
        }

        .calendar-display {
            padding: 4rem 0;
            background-color: #f6f2ec; 
            color: #0b0f24; 
            text-align: center;
        }

        .calendar-display h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
        }

        .calendar-display iframe {
            width: 100%;
            max-width: 800px;
            height: 400px;
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
        <a href="index.php"> 
            <img src="ColorStackUTAlogo.png" alt="ColorStack UTA Logo" class="logo-image">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        </a>
        <nav class="navbar"> 
            <ul>
                <li><a href="about.php">About</a></li>
                <li><a href="sponsors.php">Sponsors</a></li>
                <li><a href="students.php">Students</a></li>
                <li><a href="https://linktr.ee/colorstack_uta?fbclid=PAZXh0bgNhZW0CMTEAAaZ-huB0wubsKaEg9kR0V3_GwR79Zqmw8kz2f6BWWCVpCqx7j9ne0BhsfVI_aem_pxaAwxBnGLBBDUjBh71cog" class="join-now">Become a Member</a></li>
            </ul>
        </nav>
    </div>
    </header>

    <!-- Students Page Content -->
    <div class="students-page">
        <div class="students-intro">
            <h1>Welcome to ColorStack UTA</h1>
            <p>We are a community of Black and Latinx Computer Science students dedicated to supporting each other’s growth, networking, and career success. Through our partnerships with top companies and exclusive opportunities, we help you build the future you deserve.</p>
        </div>

        <div class="officer-opportunities">
            <h2>Why Become an Officer?</h2>
            <p>As an officer, you’ll gain access to exclusive opportunities, including:</p>
            <ul>
                <li><strong>Close Networking:</strong> Work directly with other officers to review resumes, portfolios, and prepare for interviews.</li>
                <li><strong>Behind-the-Scenes Access:</strong> Collaborate with recruiters from top companies to organize events and workshops.</li>
                <li><strong>Career Advancement:</strong> Many of our officers have gone on to work at leading companies like:</li>
            </ul>
            <div class="company-logos">
                <img src="adobeofficers.png" alt="Adobe">
                <img src="microsoftofficers.png" alt="Microsoft">
                <img src="amazonofficers.png" alt="Amazon">
                <img src="chaseofficers.png" alt="Chase">
                <img src="jpmorganofficers.png" alt="J.P. Morgan">
            </div>
            <p>Ready to take your leadership and career to the next level? <a href="#officer-application" class="cta-button">Apply to be an officer today!</a></p>
        </div>

        <div class="calendar-subscribe">
            <h2>Stay Updated</h2>
            <p>Don’t miss out on our workshops, networking events, and career fairs. Subscribe to our calendar to stay in the loop!</p>
            <a href="#subscribe" class="cta-button">Subscribe to Our Calendar</a>
        </div>

        <div class="calendar-display">
            <h2>Upcoming Events</h2>
            <iframe src="https://calendar.google.com/calendar/embed?src=your-calendar-id-here" style="border: 0" width="100%" height="400px" frameborder="0" scrolling="no"></iframe>
        </div>
    </div>


<!-- Footer -->
<footer>
    <div class="footer-container">
        <div class="footer-column">
            <h3>Join Our Community</h3>
            <p>Be part of a thriving network of Black and Latinx Computer Science students. Together, we grow, learn, and succeed.</p>
            <a href="https://linktr.ee/colorstack_uta?fbclid=PAZXh0bgNhZW0CMTEAAaZ-huB0wubsKaEg9kR0V3_GwR79Zqmw8kz2f6BWWCVpCqx7j9ne0BhsfVI_aem_pxaAwxBnGLBBDUjBh71cog" class="footer-cta">Become a Member</a>
        </div>

        <div class="footer-column">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">Sponsors</a></li>
                <li><a href="#">FAQs</a></li>
            </ul>
        </div>

        <div class="footer-column">
            <h3>Follow Us</h3>
            <div class="social-icons">
                <a href="https://www.instagram.com/colorstackuta?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="https://www.linkedin.com/in/colorstack-uta-118929326/" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
            </div>
            <p>Stay connected for updates, events, and more!</p>
        </div>

        <div class="footer-column">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get the latest news, events, and opportunities delivered to your inbox.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Enter your email" required>
                <button type="submit">Subscribe</button>
            </form>
        </div>
    </div>

    <div class="footer-bottom">
        <p>&copy; 2025 ColorStack UTA. All rights reserved.</p>
    </div>
</footer>
    </footer>
</body>
</html>