// Wedding Website JavaScript - Netlify Secure Authentication

// Authentication Configuration
const AUTH_CONFIG = {
    // Determine environment and API endpoint
    isDevelopment: location.hostname === 'localhost' || location.hostname === '127.0.0.1',
    
    // Get the appropriate auth endpoint
    getAuthEndpoint() {
        if (this.isDevelopment) {
            return 'http://localhost:8888/.netlify/functions/auth';
        } else {
            return '/.netlify/functions/auth';
        }
    },
    
    // Development fallback password (for local testing without Netlify CLI)
    developmentPassword: 'ForeverTogether2026'
};

// NO PASSWORDS STORED IN CLIENT CODE - ALL VALIDATION IS SERVER-SIDE!

// Secure server-side password validation using Netlify Functions
async function checkPassword() {
    const input = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const modal = document.getElementById('password-modal');
    const mainContent = document.getElementById('main-content');
    const submitBtn = document.querySelector('#password-modal button');
    
    // Clear previous errors
    errorMessage.textContent = '';
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Verifying...';
    submitBtn.disabled = true;
    
    try {
        let isValid = false;
        let serverToken = null;
        
        if (AUTH_CONFIG.isDevelopment && !location.port) {
            // Development fallback when Netlify CLI is not available
            isValid = input.value === AUTH_CONFIG.developmentPassword;
            if (isValid) {
                serverToken = generateClientToken();
            }
        } else {
            // Use serverless function for validation
            const result = await validatePasswordServerSide(input.value);
            isValid = result.success;
            serverToken = result.token;
        }
        
        if (isValid) {
            // Store authentication state
            sessionStorage.setItem('wedding-access', 'granted');
            sessionStorage.setItem('wedding-token', serverToken);
            sessionStorage.setItem('wedding-auth-time', Date.now().toString());
            
            // Clear password input for security
            input.value = '';
            
            // Show authenticated content
            modal.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Initialize site features
            startCountdown();
            initializeAnimations();
            
            console.log('🔐 Authentication successful');
        } else {
            errorMessage.textContent = 'Incorrect password. Please try again.';
            input.value = '';
        }
    } catch (error) {
        console.error('Authentication error:', error);
        errorMessage.textContent = 'Authentication service unavailable. Please try again.';
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Validate password using Netlify serverless function
async function validatePasswordServerSide(password) {
    try {
        const response = await fetch(AUTH_CONFIG.getAuthEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            return {
                success: true,
                token: result.token
            };
        } else {
            console.log('Authentication failed:', result.message);
            return {
                success: false,
                message: result.message
            };
        }
    } catch (error) {
        console.error('Network error during authentication:', error);
        throw error;
    }
}

// Generate client-side token (fallback for development)
function generateClientToken() {
    const timestamp = Date.now();
    const random = crypto.getRandomValues(new Uint32Array(2));
    return btoa(JSON.stringify({
        authenticated: true,
        timestamp,
        sessionId: Array.from(random).join(''),
        expires: timestamp + (24 * 60 * 60 * 1000) // 24 hours
    }));
}

// Check if user has valid authentication session
window.addEventListener('load', function() {
    const hasAccess = sessionStorage.getItem('wedding-access') === 'granted';
    const token = sessionStorage.getItem('wedding-token');
    const authTime = sessionStorage.getItem('wedding-auth-time');
    
    if (hasAccess && token && authTime && isValidSession(token, authTime)) {
        document.getElementById('password-modal').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        startCountdown();
        initializeAnimations();
    } else {
        // Clear invalid session data
        clearAuthSession();
    }
});

// Validate session token and timing
function isValidSession(token, authTimeStr) {
    try {
        const authData = JSON.parse(atob(token));
        const authTime = parseInt(authTimeStr);
        const now = Date.now();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        return (
            authData.authenticated === true &&
            authData.timestamp === authTime &&
            (now - authTime) < maxAge &&
            authData.expires > now
        );
    } catch (error) {
        console.warn('Invalid session token');
        return false;
    }
}

// Clear authentication session
function clearAuthSession() {
    sessionStorage.removeItem('wedding-access');
    sessionStorage.removeItem('wedding-token');
    sessionStorage.removeItem('wedding-auth-time');
}

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
    const animateElements = document.querySelectorAll('.detail-card, .photo-item, .story-item, section h2');
    animateElements.forEach(el => observer.observe(el));
}

// RSVP Form Integration and Management
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse';

// Toggle guest count visibility based on attendance
function toggleGuestCount() {
    const attendance = document.getElementById('attendance').value;
    const guestCountGroup = document.getElementById('guest-count-group');
    const additionalGuests = document.getElementById('additional-guests');
    const guestCountSelect = document.getElementById('guest-count');
    
    if (attendance === 'yes') {
        guestCountGroup.style.display = 'block';
        guestCountSelect.required = true;
        
        // Show additional guests field when more than 1 guest
        guestCountSelect.addEventListener('change', function() {
            if (parseInt(this.value) > 1) {
                additionalGuests.style.display = 'block';
                document.getElementById('plus-one-names').required = true;
            } else {
                additionalGuests.style.display = 'none';
                document.getElementById('plus-one-names').required = false;
            }
        });
    } else {
        guestCountGroup.style.display = 'none';
        additionalGuests.style.display = 'none';
        guestCountSelect.required = false;
        document.getElementById('plus-one-names').required = false;
    }
}

// Handle RSVP form submission
function handleRSVPSubmission(event) {
    event.preventDefault();
    
    const form = document.getElementById('rsvp-form');
    const submitBtn = form.querySelector('.rsvp-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const successMessage = document.getElementById('rsvp-success');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: document.getElementById('guest-name').value,
        email: document.getElementById('guest-email').value,
        attendance: document.getElementById('attendance').value,
        guestCount: document.getElementById('guest-count').value || '0',
        additionalGuests: document.getElementById('plus-one-names').value,
        dietaryRestrictions: document.getElementById('dietary-restrictions').value,
        songRequests: document.getElementById('song-requests').value,
        specialMessage: document.getElementById('special-message').value,
        submissionDate: new Date().toISOString()
    };
    
    // Store RSVP locally for display
    storeRSVP(formData);
    
    // Submit to Google Forms (you'll need to set up the actual form)
    submitToGoogleForms(formData)
        .then(() => {
            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Track successful RSVP
            trackEvent('rsvp_submitted', {
                attendance: formData.attendance,
                guest_count: formData.guestCount
            });
            
            // Send confirmation email (if you have email service)
            // sendConfirmationEmail(formData);
        })
        .catch((error) => {
            console.error('RSVP submission error:', error);
            alert('Sorry, there was an error submitting your RSVP. Please try again or contact us directly.');
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        });
}

// Submit form data to Google Forms
async function submitToGoogleForms(formData) {
    // This is a placeholder - you'll need to replace with your actual Google Form field IDs
    const googleFormData = new FormData();
    
    // Map your form fields to Google Forms field IDs (found in the form HTML)
    // Example mappings - replace with your actual field IDs:
    googleFormData.append('entry.123456789', formData.name); // Name field
    googleFormData.append('entry.987654321', formData.email); // Email field
    googleFormData.append('entry.456789123', formData.attendance); // Attendance field
    googleFormData.append('entry.789123456', formData.guestCount); // Guest count field
    googleFormData.append('entry.321654987', formData.additionalGuests); // Additional guests
    googleFormData.append('entry.654987321', formData.dietaryRestrictions); // Dietary restrictions
    googleFormData.append('entry.159753468', formData.songRequests); // Song requests
    googleFormData.append('entry.468135792', formData.specialMessage); // Special message
    
    try {
        // Submit to Google Forms
        await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: googleFormData
        });
        
        return true;
    } catch (error) {
        throw error;
    }
}

// Store RSVP data locally for easy viewing
function storeRSVP(formData) {
    let rsvps = JSON.parse(localStorage.getItem('wedding-rsvps')) || [];
    rsvps.push(formData);
    localStorage.setItem('wedding-rsvps', JSON.stringify(rsvps));
}

// Get all stored RSVPs (for couple to view)
function getAllRSVPs() {
    return JSON.parse(localStorage.getItem('wedding-rsvps')) || [];
}

// Display RSVPs in a nice format (admin function)
function displayRSVPList() {
    const rsvps = getAllRSVPs();
    const attending = rsvps.filter(rsvp => rsvp.attendance === 'yes');
    const notAttending = rsvps.filter(rsvp => rsvp.attendance === 'no');
    
    console.log('=== WEDDING RSVP SUMMARY ===');
    console.log(`Total Responses: ${rsvps.length}`);
    console.log(`Attending: ${attending.length}`);
    console.log(`Not Attending: ${notAttending.length}`);
    console.log(`Total Guests Coming: ${attending.reduce((sum, rsvp) => sum + parseInt(rsvp.guestCount || 1), 0)}`);
    
    console.log('\n=== ATTENDING GUESTS ===');
    attending.forEach((rsvp, index) => {
        console.log(`${index + 1}. ${rsvp.name} (${rsvp.guestCount} guests)`);
        if (rsvp.additionalGuests) {
            console.log(`   Additional: ${rsvp.additionalGuests}`);
        }
        if (rsvp.dietaryRestrictions) {
            console.log(`   Dietary: ${rsvp.dietaryRestrictions}`);
        }
        if (rsvp.songRequests) {
            console.log(`   Song Request: ${rsvp.songRequests}`);
        }
        console.log(`   Email: ${rsvp.email}`);
        console.log('---');
    });
    
    return { rsvps, attending, notAttending };
}

// Initialize RSVP form when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', handleRSVPSubmission);
    }
});

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

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Close mobile menu when clicking on links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
});

// Accommodation Card Toggle
function toggleAccommodation(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Close all other cards
    const allCards = document.querySelectorAll('.accommodation-card');
    allCards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('expanded');
        }
    });
    
    // Toggle the clicked card
    if (isExpanded) {
        card.classList.remove('expanded');
    } else {
        card.classList.add('expanded');
    }
}

// Close accommodation cards when clicking outside
document.addEventListener('click', function(event) {
    const accommodationSection = document.querySelector('#accommodations');
    if (accommodationSection && !accommodationSection.contains(event.target)) {
        const allCards = document.querySelectorAll('.accommodation-card');
        allCards.forEach(card => {
            card.classList.remove('expanded');
        });
    }
});

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

console.log('Wedding website loaded successfully! 💕🎉');