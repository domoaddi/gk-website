// States array
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

// Populate state dropdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state');
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select State';
    stateSelect.appendChild(defaultOption);
    
    // Add all states
    states.forEach(([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = name;
        stateSelect.appendChild(option);
    });
});

// Review form handling
document.getElementById('reviewForm').addEventListener('submit', async function(e) {
    e.preventDefault();
   
    // Get form values
    const reviewText = document.getElementById('reviewText').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
   
    // Create form data
    const formData = new FormData();
    formData.append('reviewText', reviewText);
    formData.append('city', city);
    formData.append('state', state);
   
    try {
        // Send data to PHP endpoint
        const response = await fetch('submit_review.php', {
            method: 'POST',
            body: formData
        });
       
        const result = await response.json();
       
        if (result.success) {
            // Create new review element (temporary visual feedback)
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';
            reviewElement.innerHTML = `
                <div class="review-content">
                    <p>${reviewText}</p>
                    <p class="review-location">- ${city}, ${state}</p>
                </div>
                <hr>
            `;
           
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            successMessage.textContent = 'Thank you! Your review has been submitted for approval.';
           
            // Clear form
            this.reset();
           
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
           
        } else {
            alert('Error submitting review. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting review. Please try again.');
    }
});