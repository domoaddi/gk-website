// States array for dropdown
const states = [
    ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'],
    ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'],
    ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'],
    ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'],
    ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'],
    ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'],
    ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'],
    ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'],
    ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'], ['OK', 'Oklahoma'],
    ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'],
    ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'],
    ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'],
    ['WI', 'Wisconsin'], ['WY', 'Wyoming']
];

// Slideshow functionality
let slideIndex = 0;
let slides;
let dots;
let autoSlideInterval;

function initializeSlideshow() {
    slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slideshow-dots');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    
    // Clear existing dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.onclick = () => showSlide(index);
            dotsContainer.appendChild(dot);
        });
        
        dots = document.querySelectorAll('.dot');
    }
    
    // Add button listeners
    if (prevButton && nextButton) {
        prevButton.onclick = () => {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            showSlide(slideIndex);
            restartAutoSlide();
        };
        
        nextButton.onclick = () => {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
            restartAutoSlide();
        };
    }
    
    showSlide(0);
    startAutoSlide();
}

function showSlide(index) {
    slideIndex = index;
    const slidesContainer = document.querySelector('.review-slides');
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    if (dots) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function restartAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    startAutoSlide();
}

// Load approved reviews
async function loadApprovedReviews() {
    try {
        console.log('Starting to load reviews...');
        const response = await fetch('./admin/load_reviews.php');
        const responseText = await response.text();
        console.log('Server response:', responseText);
        
        const reviews = JSON.parse(responseText);
        console.log('Parsed reviews:', reviews);
        
        const reviewsContainer = document.querySelector('.review-slides');
        if (!reviewsContainer) {
            console.error('Reviews container not found!');
            return;
        }
        
        if (Array.isArray(reviews) && reviews.length > 0) {
            reviews.forEach(review => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'slide dynamic-review';
                slideDiv.innerHTML = `
                    <div class="review-content">
                        <p>${review.review_text}</p>
                        <p class="review-location">
                            ${review.is_anonymous ? 'Anonymous' : (review.reviewer_name || 'Anonymous')}<br>
                            ${review.city}, ${review.state}
                        </p>
                    </div>
                `;
                reviewsContainer.appendChild(slideDiv);
            });
            
            if (typeof initializeSlideshow === 'function') {
                initializeSlideshow();
            }
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

// Handle anonymous checkbox
const anonymousCheckbox = document.getElementById('isAnonymous');
const nameInput = document.getElementById('reviewerName');

if (anonymousCheckbox && nameInput) {
    anonymousCheckbox.addEventListener('change', function() {
        if (this.checked) {
            nameInput.value = '';
            nameInput.disabled = true;
            nameInput.style.opacity = '0.5';
        } else {
            nameInput.disabled = false;
            nameInput.style.opacity = '1';
        }
    });
}


// Form submission handling 
document.getElementById('reviewForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    try {
        const formData = new FormData(this);
        formData.append('isAnonymous', document.getElementById('isAnonymous').checked);
        
        const response = await fetch('./admin/submit_review.php', {
            method: 'POST',
            body: formData
        });
        
        console.log('Form submitted, checking response...');
        const responseText = await response.text();
        console.log('Raw response:', responseText);
        
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse response:', responseText);
            throw new Error('Server returned invalid response');
        }
        
        if (result.success) {
            this.reset();
            alert('Thank you! Your review has been submitted!');
        } else {
            throw new Error(result.error || 'Failed to submit review');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('Error submitting review. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Review';
    }
});

// Initialize state dropdown
function initializeStateDropdown() {
    const stateSelect = document.getElementById('state');
    if (!stateSelect) return;
    
    stateSelect.innerHTML = '';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select State';
    stateSelect.appendChild(defaultOption);
    
    states.forEach(([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = name;
        stateSelect.appendChild(option);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeStateDropdown();
    initializeSlideshow();
    loadApprovedReviews();
});