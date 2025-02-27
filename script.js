// Carousel Functionality
const slides = document.querySelectorAll('.slides img');
const dots = document.querySelectorAll('.dot');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let currentIndex = 0;

// Function to show the active slide and dot
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            dots[i].classList.add('active');
        }
    });
}

// Event listener for the next button
next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length; // Loop to the first slide
    showSlide(currentIndex);
});

// Event listener for the previous button
prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop to the last slide
    showSlide(currentIndex);
});

// Event listeners for dots
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentIndex = i;
        showSlide(currentIndex);
    });
});

// Auto-slide functionality (optional)
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length; // Cycle through slides
    showSlide(currentIndex);
}, 5000);


document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.events-slide');
    const dots = document.querySelectorAll('.events-dot');
    const prev = document.querySelector('.events-prev');
    const next = document.querySelector('.events-next');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'flex' : 'none';
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            showSlide(currentIndex);
        });
    });

    showSlide(currentIndex);
});