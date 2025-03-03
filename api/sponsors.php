<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ColorStack UTA</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .sponsors-page {
            font-family: Arial, sans-serif;
            background-color: rgba(249, 249, 249, 0.8);
            color: #333;
            padding: 20px 40px; 
            max-width: 1500px; 
            margin: 0 auto; 
        }

        .sponsors-page h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            text-align: center;
        }

        .sponsors-page .sponsor-tier {
            margin-bottom: 40px;
            text-align: center;
        }

        .sponsors-page h2 {
            font-size: 2em;
            margin-bottom: 20px;
            color: #555;
        }

        .sponsors-page .sponsor-logos {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
        }

        .sponsors-page .sponsor-logos img {
            max-width: 150px;
            height: auto;
            margin: 10px;
        }

        /* Sponsor CTA Section */
        .sponsor-cta {
            background-color: #f9f9f9; 
            padding: 40px 20px;
            text-align: center;
            border-radius: 12px;
            margin: 40px 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
        }

        .sponsor-cta h2 {
            font-size: 2.2em;
            color: #fff;
            margin-bottom: 10px;
        }

        .cta-subtitle {
            font-size: 1.1em;
            color: #fff;
            margin-bottom: 30px;
        }

        .cta-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            max-width: 1000px;
            margin: 0 auto;
            gap: 40px;
            text-align: left;
        }

        .cta-benefits {
            flex: 1;
        }

.cta-benefits h3 {
    font-size: 1.5em;
    color: #fff;
    margin-bottom: 15px;
}

.cta-benefits ul {
    list-style: none;
    padding: 0;
}

.cta-benefits li {
    font-size: 1em;
    color: #fff;
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
}

.cta-benefits li::before {
    content: "•";
    color: #007BFF; 
    font-size: 1.5em;
    position: absolute;
    left: 0;
    top: -4px;
}

.cta-action {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
}

.cta-action p {
    font-size: 1em;
    color: #555;
    margin-bottom: 20px;
}

.cta-button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #007BFF;
    color: #fff;
    text-decoration: none;
    border-radius: 6px;
    font-size: 1em;
    transition: background-color 0.3s ease;
}

.cta-button:hover {
    background-color: #0056b3;
}

/* Sponsored Events and Brand Workshops Sections */
.sponsored-events, .brand-workshops {
    text-align: center;
    margin: 40px 0;
}

.sponsored-events h2, .brand-workshops h2 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #555;
}

.events-images, .workshops-images {
    display: flex;
    justify-content: center;
    gap: 20px; 
    overflow-x: auto; 
    padding: 10px 0;
}

.event, .workshop {
    max-width: 300px; 
    text-align: left;
}

.event img, .workshop img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.event h3, .workshop h3 {
    font-size: 1.5em;
    margin: 10px 0 5px;
    color: #333;
}

.event p, .workshop p {
    font-size: 1em;
    color: #666;
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

    <div class="sponsors-page">
        <h1>Our Sponsors</h1>

        <div class="sponsor-tier platinum">
            <h2>Platinum Sponsors</h2>
            <div class="sponsor-logos">
                <img src="placeholder.png" alt="Bloomberg">
                <img src="placeholder.png" alt="BNY Mellon">
                <img src="placeholder.png" alt="Capital One">
                <img src="placeholder.png" alt="SED">
                <img src="placeholder.png" alt="Raymond James">
            </div>
        </div>

        <div class="sponsor-tier platinum">
            <h2>Gold Sponsors</h2>
            <div class="sponsor-logos">
                <img src="placeholder.png" alt="Goldman Sachs">
                <img src="placeholder.png" alt="J.P. Morgan">
                <img src="placeholder.png" alt="Morgan Stanley">
                <img src="placeholder.png" alt="Citi">
                <img src="placeholder.png" alt="Wells Fargo">
            </div>
        </div>

        <div class="sponsor-tier platinum">
            <h2>Silver Sponsors</h2>
            <div class="sponsor-logos">
                <img src="placeholder.png" alt="American Express">
                <img src="placeholder.png" alt="Bank of America">
                <img src="placeholder.png" alt="HSBC">
                <img src="placeholder.png" alt="Barclays">
                <img src="placeholder.png" alt="UBS">
            </div>
        </div>

        <div class="sponsor-tier platinum">
            <h2>Bronze Sponsors</h2>
            <div class="sponsor-logos">
                <img src="placeholder.png" alt="TD Bank">
                <img src="placeholder.png" alt="PNC Financial Services">
                <img src="placeholder.png" alt="Credit Suisse">
                <img src="placeholder.png" alt="Deutsche Bank">
                <img src="placeholder.png" alt="Santander">
            </div>
        </div>

        <div class="sponsor-cta">
            <h2>Join Our Sponsor Program</h2>
            <p class="cta-subtitle">Partner with us to make a lasting impact on the future of Black and Latinx Computer Science students.</p>
                
            <div class="cta-content">
            <div class="cta-benefits">
                <h3>Why Partner With Us?</h3>
                <ul>
                    <li>Host engaging workshops and connect with talented students.</li>
                    <li>Sponsor events that showcase your brand and values.</li>
                    <li>Access exclusive networking opportunities with our community.</li>
                    <li>Support diversity and inclusion in tech through meaningful partnerships.</li>
                </ul>
            </div>
            <div class="cta-action">
                <p>Let’s work together to create opportunities and drive innovation. Fill out the form below, and we’ll get back to you with a customized proposal that fits your needs.</p>
                <a href="#sponsor-form" class="cta-button">Get in Touch to Learn More</a>
            </div>
        </div>
    </div>

        <div class="sponsored-events">
            <h2>Sponsored Events</h2>
            <div class="events-images">
                <div class="event">
                    <img src="colorstackimage.jpeg" alt="Event 1">
                    <h3>JP Morgan Recruiter Workshop</h3>
                    <p>Join us for an exclusive workshop with JP Morgan recruiters to learn about career opportunities and tips for success.</p>
                </div>
                <div class="event">
                    <img src="colorstackimage.jpeg" alt="Event 2">
                    <h3>Tech Conference 2023</h3>
                    <p>Explore the latest in technology and innovation at our annual tech conference.</p>
                </div>
                <div class="event">
                    <img src="colorstackimage.jpeg" alt="Event 3">
                    <h3>Innovation Summit</h3>
                    <p>Discover cutting-edge ideas and network with industry leaders at the Innovation Summit.</p>
                </div>
            </div>
        </div>

    <div class="brand-workshops">
        <h2>Brand Hosted Workshops</h2>
        <div class="workshops-images">
            <div class="workshop">
                <img src="colorstackimage.jpeg" alt="Workshop 1">
                <h3>Bloomberg Tech Lab</h3>
                <p>Hands-on sessions with Bloomberg engineers to dive deep into financial technology.</p>
            </div>
            <div class="workshop">
                <img src="colorstackimage.jpeg" alt="Workshop 2">
                <h3>Nvidia x Colorstack UF</h3>
                <p>Learn about GPU computing and AI from Nvidia experts in collaboration with Colorstack UF.</p>
            </div>
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

<script src="script.js"></script>
</body>
</html>