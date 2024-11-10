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

// Add this JavaScript to handle form submission and display reviews
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const reviewText = document.getElementById('reviewText').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    
    // Create new review element
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-item';
    reviewElement.innerHTML = `
        <div class="review-content">
            <p>${reviewText}</p>
            <p class="review-location">- ${city}, ${state}</p>
        </div>
        <hr>
    `;
    
    // Add review to display section
    document.getElementById('reviewsDisplay').prepend(reviewElement);
    
    // Clear form
    this.reset();
});