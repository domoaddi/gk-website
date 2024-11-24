// Debug loading
console.log('Script loaded');

// Image data for each house
const houseImages = {
    house1: {
        images: [
            './images/house1.jpg',
            './images/house1/6251.jpg',
            './images/house1/6252.jpg',
            './images/house1/6252-2.jpg',
            './images/house1/6252-3.jpg',
            './images/house1/6253.jpg',
            './images/house1/6254.jpg',
            './images/house1/6255.jpg',
            './images/house1/6256.jpg',
            './images/house1/6256-1.jpg',
            './images/house1/6256-2.jpg',
            './images/house1/6256-3.jpg',
            './images/house1/6257.jpg',
            './images/house1/6258.jpg'
        ],
        tourLink: 'https://www.hommati.com/3DTour-AerialVideo/625-N-Ethlyn-Rd-Gk-Homes-Winfield-Mo-63389--HPI32865132/3d-tour'
    },
    house2: {
        images: [
            './images/house2.jpg',
            './images/house2/AR01.jpg',
            './images/house2/AR02.jpg',
            './images/house2/AR03.jpg',
            './images/house2/AR04.jpg',
            './images/house2/AR05.jpg',
            './images/house2/AR06.jpg',
            './images/house2/AR07.jpg',
            './images/house2/AR08.jpg',
            './images/house2/AR09.jpg',
            './images/house2/AR10.jpg',
            './images/house2/AR11.jpg',
            './images/house2/AR12.jpg',
            './images/house2/AR13.jpg',
            './images/house2/AR14.jpg'
        ],
        tourLink: 'https://my.matterport.com/show/?m=AbzYZRe9Qp7'
    },
    house3: {
        images: [
            './images/house3.JPG',
            './images/house3/NEthlyn1.jpg',
            './images/house3/NEthlyn2.jpg',
            './images/house3/NEthlyn3.jpg',
            './images/house3/NEthlyn4.jpg',
            './images/house3/NEthlyn5.jpg',
            './images/house3/NEthlyn6.jpg',
            './images/house3/NEthlyn7.jpg',
            './images/house3/NEthlyn8.jpg',
            './images/house3/NEthlyn9.jpg',
            './images/house3/NEthlyn10.jpg',
            './images/house3/NEthlyn11.jpg',
            './images/house3/NEthlyn12.jpg',
            './images/house3/NEthlyn13.jpg',
            './images/house3/NEthlyn14.jpg'
        ],
        tourLink: 'https://my.matterport.com/show/?m=oJqkTYXpqgX'
    },
    house4: {
        images: [
            './images/house4.jpg',
            './images/house4/EthlynRoad1.jpg',
            './images/house4/EthlynRoad2.jpg',
            './images/house4/EthlynRoad3.jpg',
            './images/house4/EthlynRoad4.jpg',
            './images/house4/EthlynRoad5.jpg',
            './images/house4/EthlynRoad6.jpg',
            './images/house4/EthlynRoad7.jpg',
            './images/house4/EthlynRoad8.jpg',
            './images/house4/EthlynRoad9.jpg',
            './images/house4/EthlynRoad10.jpg',
            './images/house4/EthlynRoad11.jpg',
            './images/house4/EthlynRoad12.jpg'
        ],
        tourLink: 'https://my.matterport.com/show/?m=DQEA5qRRt7g&mls=1'
    },
    house5: {
        images: [
            './images/house5.JPG',
            './images/house5/1.jpg',
            './images/house5/2.jpg',
            './images/house5/3.jpg',
            './images/house5/4.jpg'
        ],
        tourLink: 'https://my.matterport.com/show/?m=7NLsogYh32i'
    },
    house6: {
        images: [
            './images/house6.jpg',
            './images/house6/1.jpg',
            './images/house6/2.jpg',
            './images/house6/3.jpg',
            './images/house6/4.jpg'
        ],
        tourLink: 'https://my.matterport.com/show/?m=oNgK8xNbR15'
    }
};

// Initialize variables
let currentHouse = '';
let currentImageIndex = 0;

function initializeSlideshow() {
    const modal = document.getElementById('slideshowModal');
    modal.style.display = 'none';
    currentHouse = '';
    currentImageIndex = 0;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Initialize slideshow
    initializeSlideshow();
    
    // Get DOM elements
    const modal = document.getElementById('slideshowModal');
    const modalImage = document.getElementById('slideshowImage');
    const tourLink = document.getElementById('virtualTourLink');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    // Force modal to be hidden initially
    modal.style.display = 'none';
    
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = 'Loading...';
    modal.appendChild(loadingIndicator);

    // Add click event to "View Photos" buttons
    document.querySelectorAll('.portfolio-item .view-photos-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const house = e.target.closest('.portfolio-item').dataset.house;
            currentHouse = house;
            currentImageIndex = 0;
            openSlideshow(currentHouse);
        });
    });

    // Functions
    function preloadImages(house) {
        houseImages[house].images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    function openSlideshow(house) {
        console.log('Opening slideshow for:', house);
        console.log('Modal element:', modal);
        modal.style.display = 'block';
        loadingIndicator.style.display = 'block';
        updateSlideshow();
        preloadImages(house);
        tourLink.href = houseImages[house].tourLink;
    }

    function updateSlideshow() {
        loadingIndicator.style.display = 'block';
        modalImage.style.opacity = '0';
        
        const img = new Image();
        img.src = houseImages[currentHouse].images[currentImageIndex];
        
        img.onload = function() {
            modalImage.src = img.src;
            modalImage.style.opacity = '1';
            loadingIndicator.style.display = 'none';
        };

        img.onerror = function() {
            console.error('Error loading image:', img.src);
            loadingIndicator.style.display = 'none';
            modalImage.src = './images/placeholder.jpg';
        };
    }

    // Event Listeners
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prevButton.addEventListener('click', () => {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = houseImages[currentHouse].images.length - 1;
        }
        updateSlideshow();
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex++;
        if (currentImageIndex >= houseImages[currentHouse].images.length) {
            currentImageIndex = 0;
        }
        updateSlideshow();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.style.display || modal.style.display === 'none') return;
        
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        } else if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
});

// Add loading indicator styles
const style = document.createElement('style');
style.textContent = `
    .loading-indicator {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 20px;
        z-index: 1002;
    }
`;
document.head.appendChild(style);