// Wedding Website JavaScript

// Password Protection
const PASSWORD = 'ForeverTogether2026'; // Change this to your desired password

function checkPassword() {
    const input = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const modal = document.getElementById('password-modal');
    const mainContent = document.getElementById('main-content');
    
    if (input.value === PASSWORD) {
        modal.style.display = 'none';
        mainContent.style.display = 'block';
        // Store password in session storage to remember for the session
        sessionStorage.setItem('wedding-access', 'granted');
        startCountdown();
        initializeAnimations();
    } else {
        errorMessage.textContent = 'Incorrect password. Please try again.';
        input.value = '';
    }
}

// Check if user has already entered password
window.addEventListener('load', function() {
    if (sessionStorage.getItem('wedding-access') === 'granted') {
        document.getElementById('password-modal').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        startCountdown();
        initializeAnimations();
    }
});

// Allow Enter key to submit password
document.getElementById('password-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

// Countdown Timer
function startCountdown() {
    const weddingDate = new Date('June 20, 2026 16:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(3, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Wedding day has arrived!
            document.getElementById('countdown').innerHTML = '<h3 style="color: var(--primary-color); font-family: Dancing Script, cursive; font-size: 2rem;">It\'s Our Wedding Day! 💕</h3>';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navigation Bar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.detail-card, .photo-item, section h2');
    animateElements.forEach(el => observer.observe(el));
}

// RSVP Form Integration (Google Forms)
// Replace YOUR_FORM_ID in the HTML with your actual Google Form ID
// The form will be embedded directly in the iframe

// Photo Gallery Placeholder Management
function createPhotoPlaceholders() {
    const photoItems = document.querySelectorAll('.photo-item img');
    
    photoItems.forEach((img, index) => {
        // Create placeholder for missing images
        img.addEventListener('error', function() {
            this.src = `https://via.placeholder.com/400x300/d4a574/ffffff?text=Photo+${index + 1}`;
            this.alt = `Wedding Photo Placeholder ${index + 1}`;
        });
        
        // Add loading animation
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Initialize photo management when DOM is loaded
document.addEventListener('DOMContentLoaded', createPhotoPlaceholders);

// Mobile Menu Toggle (for future enhancement)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Contact Form Validation (if adding a contact form later)
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Local Storage for User Preferences
function saveUserPreference(key, value) {
    localStorage.setItem(`wedding-site-${key}`, value);
}

function getUserPreference(key) {
    return localStorage.getItem(`wedding-site-${key}`);
}

// Analytics Integration (placeholder for Google Analytics or similar)
function trackEvent(eventName, parameters = {}) {
    // Placeholder for analytics tracking
    console.log(`Event tracked: ${eventName}`, parameters);
    
    // Example: gtag('event', eventName, parameters);
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track password success
    const originalCheckPassword = checkPassword;
    checkPassword = function() {
        const result = originalCheckPassword();
        if (sessionStorage.getItem('wedding-access') === 'granted') {
            trackEvent('password_success');
        }
        return result;
    };
    
    // Track RSVP section visits
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
        const rsvpObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('rsvp_section_viewed');
                    rsvpObserver.unobserve(entry.target);
                }
            });
        });
        rsvpObserver.observe(rsvpSection);
    }
});

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Website error:', event.error);
    // You could send this to an error tracking service
});

// Accessibility Improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation support
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    // Ensure modal traps focus
    const modal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Keep focus within modal
            if (document.activeElement === passwordInput && !e.shiftKey) {
                e.preventDefault();
                document.querySelector('.modal-content button').focus();
            }
        }
    });
});

console.log('Wedding website loaded successfully! 💕');