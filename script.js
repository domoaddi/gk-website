const gallery = document.querySelector('.portfolio-gallery');

// Calculate the width of one image plus margin (make sure images have margins in CSS)
const scrollAmount = document.querySelector('.portfolio-gallery img').offsetWidth + 10;

function scrollRight() {
    gallery.scrollBy({
        left: scrollAmount, // Move right by one image width
        behavior: 'smooth'
    });
}

function scrollLeft() {
    gallery.scrollBy({
        left: -scrollAmount, // Move left by one image width
        behavior: 'smooth'
    });
}