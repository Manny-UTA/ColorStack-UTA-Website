<?php
session_start(); 

/////HEADER/////
$Header = "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>GymBuddy</title>
    <link rel='stylesheet' href='style.css' type='text/css'>
</head>
<body>
";

/////NAVIGATION/////
$Nav = "
<header class='header'>
    <div class='logo'>GymBuddy</div>
    <nav class='nav-links'>
        <a href='index.php#home'>Home</a>
        <a href='index.php#about'>About</a>
        <a href='index.php#features'>Features</a>
        <a href='index.php#community'>Community</a>
        <a href='index.php#signup'>Sign Up</a>
    </nav>
";
    
if (isset($_SESSION['username'])) {
    $username = htmlspecialchars($_SESSION['username']);
    $Nav .= "
    <div class='user-menu'>
        <span class='user-icon'>👤</span>
        <span class='username'>Hello, $username</span>
        <div class='dropdown'>
            <a href='logout.php'>Logout</a> 
        </div>
    </div>
    ";
} else {
    /////SHOWS LOG IN BUTTON IF NOT LOGGED IN/////
    $Nav .= "<a href='login.php' class='cta-button'>Log In</a>";
}

$Nav .= "</header>";

/////FOOTER/////
$Footer = "
<footer class='footer'>
    <div class='footer-content'>
        <div class='footer-section logo-section'>
            <div class='footer-logo'>GymBuddy</div>
            <p class='tagline'>Find Your Fitness Match</p>
        </div>
        <div class='footer-section links-section'>
            <a href='index.php#home'>Home</a>
            <a href='index.php#about'>About</a>
            <a href='index.php#privacy'>Privacy Policy</a>
            <a href='index.php#careers'>Careers</a>
        </div>
        <div class='footer-section social-section'>
            <a href='https://www.instagram.com/' target='_blank' class='social-icon'>Instagram</a>
            <a href='https://www.twitter.com/' target='_blank' class='social-icon'>Twitter</a>
            <a href='https://www.facebook.com/' target='_blank' class='social-icon'>Facebook</a>
        </div>
    </div>
    <div class='footer-bottom'>
        <p>© 2024 GymBuddy. All rights reserved. | Class project for CTEC 4321</p>
    </div>
</footer>
";
?>