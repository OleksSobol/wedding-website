// Wedding Website JavaScript - Google Apps Script Version 2.0 (October 2025)
//console.logg('🔄 Script Version: Google Apps Script v2.0 - October 2, 2025');

// TEMP: Bypass password protection (set to false to re-enable auth)
window.BYPASS_AUTH = true;

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
    
    // Development fallback password (for local testing only)
    // In production, this is overridden by server-side validation
    developmentPassword: 'dev-fallback'
};

// --- GitHub Pages/osobol.com override ---
(function() {
    // Detect GitHub Pages or osobol.com/wedding-website
    const isGitHubPages = location.hostname.endsWith('.github.io');
    const isOsobolWedding = location.hostname === 'osobol.com' && location.pathname.startsWith('/wedding-website');
    if (isGitHubPages || isOsobolWedding) {
        AUTH_CONFIG.password = 'dev-github';
    }
})();

// Password validation using Netlify serverless function
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
        
        const isGitHubPages = location.hostname.endsWith('.github.io');
        const isOsobolWedding = location.hostname === 'osobol.com' && location.pathname.startsWith('/wedding-website');
        if (isGitHubPages || isOsobolWedding) {
            isValid = input.value === AUTH_CONFIG.password;
            if (isValid) {
                serverToken = generateClientToken();
            }
        } else if (AUTH_CONFIG.isDevelopment) {
            // Development fallback when not using Netlify serverless functions
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
            
            // console.log('🔐 Authentication successful');
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
            //console.logg('Authentication failed:', result.message);
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
    // Bypass authentication: show content immediately
    if (window.BYPASS_AUTH === true) {
        try {
            const modal = document.getElementById('password-modal');
            const mainContent = document.getElementById('main-content');
            if (modal) modal.style.display = 'none';
            if (mainContent) mainContent.style.display = 'block';

            // Seed a temporary session so other code paths work as expected
            if (!sessionStorage.getItem('wedding-access')) {
                sessionStorage.setItem('wedding-access', 'granted');
                sessionStorage.setItem('wedding-token', generateClientToken());
                sessionStorage.setItem('wedding-auth-time', Date.now().toString());
            }

            // Initialize site features
            startCountdown();
            initializeAnimations();

            // Animate hero content in after load (if visible)
            setTimeout(function() {
                var heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.classList.add('animate-in');
                }
            }, 100);
        } catch (e) {
            console.warn('Bypass auth initialization error:', e);
        }
        return; // Skip normal auth flow
    }
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
            // Animate hero content in after load (if visible)
            setTimeout(function() {
                var heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.classList.add('animate-in');
                }
            }, 100);
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

// Countdown Timer with Marriage Celebration
function startCountdown() {
    const weddingDate = new Date('June 20, 2026 16:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        if (timeLeft > 0) {
            // Countdown to wedding
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(3, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Wedding day has passed - start counting up!
            startCountUp();
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Count Up Timer - Celebrating Time Since Marriage
function startCountUp() {
    const weddingDate = new Date('June 20, 2026 16:00:00').getTime();

    function updateCountUp() {
        const now = new Date().getTime();
        const timeElapsed = now - weddingDate;

        const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);

        // Replace the countdown display with marriage celebration
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="married-celebration">
                    <h3 style="color: var(--primary-color); font-family: 'Dancing Script', cursive; font-size: 2.5rem; margin-bottom: 1rem;">
                        We are married now! 💕
                    </h3>
                    <p style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--text-secondary);">
                        Time since we said "I do":
                    </p>
                    <div class="count-up-display" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        <span class="time-unit">
                            <span style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">${days.toString().padStart(3, '0')}</span>
                            <label style="display: block; font-size: 0.9rem;">days</label>
                        </span>
                        <span class="time-unit">
                            <span style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">${hours.toString().padStart(2, '0')}</span>
                            <label style="display: block; font-size: 0.9rem;">hours</label>
                        </span>
                        <span class="time-unit">
                            <span style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">${minutes.toString().padStart(2, '0')}</span>
                            <label style="display: block; font-size: 0.9rem;">minutes</label>
                        </span>
                        <span class="time-unit">
                            <span style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">${seconds.toString().padStart(2, '0')}</span>
                            <label style="display: block; font-size: 0.9rem;">seconds</label>
                        </span>
                    </div>
                </div>
            `;
        }
    }

    updateCountUp();
    setInterval(updateCountUp, 1000);
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
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile: hide navbar at top, show when scrolling
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-visible');
            navbar.style.transform = 'translateY(0)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('navbar-visible');
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    } else {
        // On desktop: always show, just change style
        navbar.style.transform = 'translateY(0)';
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
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

// Toggle guest count visibility based on attendance
function toggleGuestCount() {
    const attendance = document.getElementById('attendance').value;
    const guestCountGroup = document.getElementById('guest-count-group');
    const additionalGuests = document.getElementById('additional-guests');
    const dietaryGroup = document.getElementById('dietary-restrictions-group');
    const songRequestsGroup = document.getElementById('song-requests-group');
    const specialMessageGroup = document.getElementById('special-message-group');
    const guestCountSelect = document.getElementById('guest-count');
    
    if (attendance === 'yes') {
        guestCountGroup.style.display = 'block';
        dietaryGroup.style.display = 'block';
        songRequestsGroup.style.display = 'block';
        specialMessageGroup.style.display = 'block';
        guestCountSelect.required = true;
        
        // Show additional guest field when 2 guests selected
        guestCountSelect.addEventListener('change', function() {
            if (this.value === '2') {
                additionalGuests.style.display = 'block';
                document.getElementById('plus-one-name').required = true;
            } else {
                additionalGuests.style.display = 'none';
                document.getElementById('plus-one-name').required = false;
                document.getElementById('plus-one-name').value = '';
            }
        });
    } else if (attendance === 'no') {
        // Hide all conditional fields for "no" attendance
        guestCountGroup.style.display = 'none';
        additionalGuests.style.display = 'none';
        dietaryGroup.style.display = 'none';
        songRequestsGroup.style.display = 'none';
        specialMessageGroup.style.display = 'block'; // Keep message field for well wishes
        
        // Clear and reset requirements
        guestCountSelect.required = false;
        document.getElementById('plus-one-name').required = false;
        
        // Clear values
        guestCountSelect.value = '';
        document.getElementById('plus-one-name').value = '';
        clearDietaryRestrictions();
        document.getElementById('song-requests').value = '';
    } else {
        // Hide all when no selection
        guestCountGroup.style.display = 'none';
        additionalGuests.style.display = 'none';
        dietaryGroup.style.display = 'none';
        songRequestsGroup.style.display = 'none';
        specialMessageGroup.style.display = 'none';
        guestCountSelect.required = false;
        document.getElementById('plus-one-name').required = false;
    }
}

// Toggle other dietary input field
function toggleOtherDietary() {
    const otherCheckbox = document.getElementById('other-dietary');
    const otherInput = document.getElementById('other-dietary-input');
    const otherText = document.getElementById('other-dietary-text');
    
    if (otherCheckbox.checked) {
        otherInput.style.display = 'block';
        otherText.required = true;
    } else {
        otherInput.style.display = 'none';
        otherText.required = false;
        otherText.value = '';
    }
}

// Clear all dietary restriction checkboxes
function clearDietaryRestrictions() {
    const checkboxes = document.querySelectorAll('input[name="dietary[]"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    document.getElementById('other-dietary-text').value = '';
    document.getElementById('other-dietary-input').style.display = 'none';
}

// Handle RSVP form submission
function handleRSVPSubmission(event) {
    const form = document.getElementById('rsvp-form');
    const submitBtn = form.querySelector('.rsvp-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Collect dietary restrictions and populate hidden field
    const dietaryRestrictions = [];
    const dietaryCheckboxes = document.querySelectorAll('input[name="dietary[]"]:checked');
    dietaryCheckboxes.forEach(checkbox => {
        if (checkbox.value === 'Other') {
            const otherText = document.getElementById('other-dietary-text').value;
            if (otherText.trim()) {
                dietaryRestrictions.push(`Other: ${otherText.trim()}`);
            }
        } else {
            dietaryRestrictions.push(checkbox.value);
        }
    });
    
    // Populate hidden fields before submission
    document.getElementById('dietary-restrictions-hidden').value = dietaryRestrictions.join(', ');
    document.getElementById('timestamp-hidden').value = new Date().toISOString();
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    submitBtn.disabled = true;
    
    // For local testing, prevent submission and show success
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (isLocal) {
        event.preventDefault();
        
        //console.logg('🏠 LOCAL TESTING MODE: Form would submit to Google Apps Script...');
        //console.logg('📋 Form action:', form.action);
        //console.logg('📋 Form data that would be submitted:');
        
        const formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            //console.logg(`  ${key}: ${value}`);
        }
        
        // Simulate success after delay
        setTimeout(() => {
            const successMessage = document.getElementById('rsvp-success');
            const successTitle = successMessage.querySelector('h3');
            const successTexts = successMessage.querySelectorAll('p');
            
            // Customize message based on attendance for local testing too
            const attendance = document.getElementById('attendance').value;
            
            if (attendance === 'no') {
                // "No" response - disappointed but understanding
                successTitle.textContent = '💔 We\'ll Miss You!';
                successTexts[0].textContent = 'Thank you for letting us know. We understand you can\'t make it, but we\'ll definitely miss celebrating with you!';
                successTexts[1].textContent = 'We\'ll be sure to share photos and stories from the big day. ❤️';
            } else {
                // "Yes" response - excited message
                successTitle.textContent = '🎉 Thank You!';
                successTexts[0].textContent = 'Your RSVP has been received! We\'re so excited to celebrate with you in Montana.';
                successTexts[1].textContent = 'You should receive a confirmation email shortly.';
            }
            
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            //console.logg('✅ LOCAL TEST: Form submission simulated successfully!');
            //console.logg('💡 To test actual submission, deploy to your domain');
        }, 1000);
        
        return;
    }
    
    // Store RSVP locally for display (before submission)
    const formDataObj = {
        name: document.getElementById('guest-name').value,
        email: document.getElementById('guest-email').value,
        attendance: document.getElementById('attendance').value,
        guestCount: document.getElementById('guest-count').value || '0',
        additionalGuest: document.getElementById('plus-one-name').value,
        dietaryRestrictions: dietaryRestrictions.join(', '),
        songRequests: document.getElementById('song-requests').value,
        specialMessage: document.getElementById('special-message').value,
        submissionDate: new Date().toISOString()
    };
    storeRSVP(formDataObj);
    
    // Track the submission attempt
    trackEvent('rsvp_submitted', {
        attendance: formDataObj.attendance,
        guest_count: formDataObj.guestCount
    });
    
    // Let the form submit to hidden iframe (stays on current page)
    //console.logg('🚀 Submitting RSVP form to Google Apps Script via hidden iframe...');
    //console.logg('📋 Form will POST to:', form.action);
    
    // Show success message after a brief delay (assuming submission succeeds)
    setTimeout(() => {
        const successMessage = document.getElementById('rsvp-success');
        const successTitle = successMessage.querySelector('h3');
        const successTexts = successMessage.querySelectorAll('p');
        
        // Customize message based on attendance
        const attendance = document.getElementById('attendance').value;
        
        if (attendance === 'no') {
            // "No" response - disappointed but understanding
            successTitle.textContent = '💔 We\'ll Miss You!';
            successTexts[0].textContent = 'Thank you for letting us know. We understand you can\'t make it, but we\'ll definitely miss celebrating with you!';
            successTexts[1].textContent = 'We\'ll be sure to share photos and stories from the big day. ❤️';
        } else {
            // "Yes" response - excited message
            successTitle.textContent = '🎉 Thank You!';
            successTexts[0].textContent = 'Your RSVP has been received! We\'re so excited to celebrate with you in Montana.';
            successTexts[1].textContent = 'You should receive a confirmation email shortly.';
        }
        
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        console.log('✅ RSVP submitted successfully!');
        
        // Reset button state in case user wants to go back
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }, 2000); // 2 second delay to allow form submission to complete
}

// Google Apps Script Web App Configuration (for reference)
const GOOGLE_SCRIPT_CONFIG = {
    WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbxkb6-TGPpg6eVDkDZ7UoqKIaKZVhndoJZ2VOxcjcLjFK_mA5Fu8INJvEM4rYQB5kLd/exec'
};

// Note: Form now submits directly to Google Apps Script URL (no CORS issues!)
// The form action attribute handles the submission instead of JavaScript fetch()               

// Submit form data via Google Apps Script (most reliable method!)
async function submitToGoogleSheets(formData) {
    try {
        //console.logg('🚀 USING GOOGLE APPS SCRIPT VERSION (NOT OLD API!)');
        //console.logg('🎯 Web App URL:', GOOGLE_SCRIPT_CONFIG.WEB_APP_URL);
        
        // Prepare data for Google Apps Script
        const submissionData = {
            timestamp: new Date().toISOString(),
            name: formData.name || '',
            email: formData.email || '',
            attendance: formData.attendance || '',
            guestCount: formData.guestCount || '',
            additionalGuest: formData.additionalGuest || '',
            dietaryRestrictions: formData.dietaryRestrictions || '',
            songRequests: formData.songRequests || '',
            specialMessage: formData.specialMessage || ''
        };
        
        //console.logg('📊 Submitting RSVP via Google Apps Script...');
        //console.logg('📋 Data being submitted:', submissionData);
        
        const response = await fetch(GOOGLE_SCRIPT_CONFIG.WEB_APP_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            //console.logg('✅ Successfully submitted RSVP to Google Sheets!');
            //console.logg('📊 Response:', result);
            return true;
        } else {
            throw new Error(result.error || 'Unknown error from Google Apps Script');
        }
        
    } catch (error) {
        console.error('❌ Google Apps Script submission error:', error);
        throw error;
    }
}

// Main submission function - now uses Google Apps Script instead of Forms scraping
async function submitToGoogleForms(formData) {
    // Check if we're running locally
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    
    if (isLocal) {
        //console.logg('🏠 LOCAL TESTING MODE: Simulating Google Apps Script submission...');
        //console.logg('📋 Form data that would be submitted:', formData);
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        //console.logg('✅ LOCAL TEST: RSVP data would be submitted successfully!');
        //console.logg('💡 To test actual submission, deploy to your domain with Google Apps Script URL');
        return true;
    }
    
    // Use Google Apps Script for reliable submission
    return await submitToGoogleSheets(formData);
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
        if (rsvp.additionalGuest) {
            console.log(`   Plus One: ${rsvp.additionalGuest}`);
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
    
    // Summary of dietary restrictions
    const dietaryStats = {};
    attending.forEach(rsvp => {
        if (rsvp.dietaryRestrictions) {
            const restrictions = rsvp.dietaryRestrictions.split(', ');
            restrictions.forEach(restriction => {
                dietaryStats[restriction] = (dietaryStats[restriction] || 0) + 1;
            });
        }
    });
    
    if (Object.keys(dietaryStats).length > 0) {
        console.log('\n=== DIETARY RESTRICTIONS SUMMARY ===');
        Object.entries(dietaryStats).forEach(([restriction, count]) => {
            console.log(`${restriction}: ${count} guests`);
        });
    }
    
    return { rsvps, attending, notAttending, dietaryStats };
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
        
        // If image already loaded (from cache), show it immediately
        if (img.complete && img.naturalWidth > 0) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
        }
        // Ensure transition is set only once
        if (!img.style.transition) {
            img.style.transition = 'opacity 0.3s ease';
        }
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

// Initialize GLightbox
const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    descPosition: 'bottom',
    skin: 'modern'
});

// ================================
// STORY TIMELINE SCROLL ANIMATIONS
// ================================
function initStoryAnimations() {
    const storyItems = document.querySelectorAll('.story-item');
    
    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };
    
    // Callback function when elements intersect
    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight stagger delay based on element position
                const delay = 100; // milliseconds
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, delay);
                
                // Stop observing this element once animated
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe each story item
    storyItems.forEach((item) => {
        observer.observe(item);
    });
    
    //console.logg(`📜 Story timeline animations initialized for ${storyItems.length} items`);
}

// Initialize story animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoryAnimations);
} else {
    initStoryAnimations();
}

// ================================
// DRESS CODE MODAL FUNCTIONALITY
// ================================
function openDressModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        //console.logg(`👔 Opened ${type} dress code modal`);
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
    //console.logg('✖️ Closed all modals');
}

function closeModal(event) {
    if (event.target.classList.contains('modal-overlay')) {
        closeAllModals();
    }
}

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            closeAllModals();
        }
    }
});

// Optional: Intersection Observer for detail card scroll animations
function initDetailsAnimations() {
    const detailCards = document.querySelectorAll('.detail-card');
    
    if (detailCards.length === 0) {
        return;
    }

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    detailCards.forEach(card => {
        observer.observe(card);
    });

    //console.logg(`💍 Detail card animations initialized for ${detailCards.length} cards`);
}

// Initialize details animations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDetailsAnimations);
} else {
    initDetailsAnimations();
}

console.log('Wedding website loaded successfully! 💕🎉');