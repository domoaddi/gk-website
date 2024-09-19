const gallery = document.getElementById('gallery');

function scrollRight() {
    gallery.scrollBy({ left: 300, behavior: 'smooth' }); // Scrolls right
}

function scrollLeft() {
    gallery.scrollBy({ left: -300, behavior: 'smooth' }); // Scrolls left
}