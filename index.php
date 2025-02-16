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
        <nav class="navbar"> 
            <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Sponsors</a></li>
                <li><a href="#">Students</a></li>
                <li><a href="https://linktr.ee/colorstack_uta?fbclid=PAZXh0bgNhZW0CMTEAAaZ-huB0wubsKaEg9kR0V3_GwR79Zqmw8kz2f6BWWCVpCqx7j9ne0BhsfVI_aem_pxaAwxBnGLBBDUjBh71cog" class="join-now">Become a Member</a></li>
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

<!-- Features Section -->
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

<!-- Upcoming Events -->
<section class="upcoming-events">
    <h2 class="section-title">Upcoming Events</h2>
    <div class="events-container">
        
        <!-- Next Event (Large Feature Card) -->
        <div class="featured-event">
            <div class="event-card large">
                <div class="event-date">
                    <span class="month">MAR</span>
                    <span class="day">10</span>
                </div>
                <div class="event-image">
                    <img src="Events.jpeg" alt="Career Fair Prep">
                </div>
                <div class="event-details">
                    <h3 class="event-title">Career Fair Prep</h3>
                    <p class="event-category professional">Professional Development</p>
                    <div class="event-time">
                        <i class="clock-icon">⏰</i> 2:00 PM - 4:00 PM
                    </div>
                    <p class="event-description">Prepare for the upcoming Career Fair with resume reviews, mock interviews, and networking strategies.</p>
                    <a href="#" class="event-cta">Reserve Your Spot</a>
                </div>
            </div>
        </div>

        <!-- Other Events (Grid Layout) -->
        <div class="other-events">
            <div class="event-card small">
                <div class="event-date">
                    <span class="month">MAR</span>
                    <span class="day">15</span>
                </div>
                <div class="event-image">
                    <img src="Events.jpeg" alt="Game Night">
                </div>
                <div class="event-details">
                    <h3 class="event-title">Team Building Game Night</h3>
                    <p class="event-category social">Social</p>
                    <div class="event-time">
                        <i class="clock-icon">⏰</i> 6:00 PM - 9:00 PM
                    </div>
                    <a href="#" class="event-cta">Join Us</a>
                </div>
            </div>

            <div class="event-card small">
                <div class="event-date">
                    <span class="month">MAR</span>
                    <span class="day">22</span>
                </div>
                <div class="event-image">
                    <img src="Events.jpeg" alt="Networking Workshop">
                </div>
                <div class="event-details">
                    <h3 class="event-title">Job Networking Workshop</h3>
                    <p class="event-category professional">Professional Development</p>
                    <div class="event-time">
                        <i class="clock-icon">⏰</i> 3:00 PM - 5:00 PM
                    </div>
                    <a href="#" class="event-cta">Sign Up</a>
                </div>
            </div>

            <div class="event-card small">
                <div class="event-date">
                    <span class="month">MAR</span>
                    <span class="day">22</span>
                </div>
                <div class="event-image">
                    <img src="Events.jpeg" alt="Networking Workshop">
                </div>
                <div class="event-details">
                    <h3 class="event-title">Resume Building Workshop</h3>
                    <p class="event-category professional">Professional Development</p>
                    <div class="event-time">
                        <i class="clock-icon">⏰</i> 3:00 PM - 5:00 PM
                    </div>
                    <a href="#" class="event-cta">Sign Up</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Instagram Section -->
<section class="instagram-section">
    <h2 class="section-title">Follow Our Socials!</h2>
    <div class="card-container">
        <!-- Card 1 -->
        <div class="card">
            <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DF5p1WUJbwm/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DF5p1WUJbwm/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DF5p1WUJbwm/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by ColorStack @ The University of Texas at Arlington (@colorstackuta)</a></p></div></blockquote><script async src="//www.instagram.com/embed.js"></script>                
            </blockquote>
            <script async src="//www.instagram.com/embed.js"></script>
        </div>

        <!-- Card 2 -->
        <div class="card">
            <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DF5pNkYpHJf/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DF5pNkYpHJf/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DF5pNkYpHJf/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by ColorStack @ The University of Texas at Arlington (@colorstackuta)</a></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>            
            </blockquote>
            <script async src="//www.instagram.com/embed.js"></script>
        </div>

        <!-- Card 3 -->
        <div class="card">
            <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DFnnrDIJGgp/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DFnnrDIJGgp/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DFnnrDIJGgp/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by ColorStack @ The University of Texas at Arlington (@colorstackuta)</a></p></div></blockquote><script async src="//www.instagram.com/embed.js"></script>            
            </blockquote>
            <script async src="//www.instagram.com/embed.js"></script>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="cta-section">
    <div class="cta-content">
        <h2>Join ColorStack UTA Today!</h2>
        <p>Be part of a thriving community of Black and Latinx Computer Science students. Gain access to exclusive events, academic support, and career opportunities. Take the next step in your journey with us!</p>
        <a href="https://linktr.ee/colorstack_uta?fbclid=PAZXh0bgNhZW0CMTEAAaZ-huB0wubsKaEg9kR0V3_GwR79Zqmw8kz2f6BWWCVpCqx7j9ne0BhsfVI_aem_pxaAwxBnGLBBDUjBh71cog" class="cta-button">Become a Member</a>
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
