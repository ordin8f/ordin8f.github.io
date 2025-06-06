// Ordin8 Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    initMobileNavigation();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Active navigation highlighting
    initActiveNavigation();
    
    // Form handling
    initFormHandling();
    
    // Scroll animations
    initScrollAnimations();
});

// Mobile Navigation
function initMobileNavigation() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbarToggle.contains(event.target) && !navbarMenu.contains(event.target)) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(highlightActiveSection, 10);
    });
}

// Form Handling
function initFormHandling() {
    // Pilot Program Form
    const pilotForm = document.getElementById('pilot-form');
    if (pilotForm) {
        pilotForm.addEventListener('submit', handlePilotFormSubmission);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
    }
}

function handlePilotFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate required fields
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
    
    if (!isValid) {
        showFormMessage(form, 'Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email
    const email = formData.get('email');
    if (!isValidEmail(email)) {
        showFormMessage(form, 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // For GitHub Pages, you would integrate with a service like Netlify Forms,
        // Formspree, or similar service for form handling
        
        // For now, show success message
        showFormMessage(form, 'Thank you for your interest! We will contact you soon to discuss the pilot program.', 'success');
        
        // Reset form
        form.reset();
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Track form submission (replace with actual analytics)
        trackEvent('pilot_form_submission', {
            school_name: formData.get('school-name'),
            student_count: formData.get('student-count')
        });
        
    }, 2000); // Simulate network delay
}

function handleContactFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate required fields
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
    
    if (!isValid) {
        showFormMessage(form, 'Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email
    const email = formData.get('email');
    if (!isValidEmail(email)) {
        showFormMessage(form, 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showFormMessage(form, 'Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Track form submission
        trackEvent('contact_form_submission', {
            subject: formData.get('subject')
        });
        
    }, 2000);
}

function showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type === 'success' ? 'success-message' : 'error-message'}`;
    messageElement.textContent = message;
    
    // Insert after form
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .process-step, .philosophy-item, .why-point');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide elements and set up animation
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Analytics tracking (placeholder - replace with actual analytics)
function trackEvent(eventName, properties) {
    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
    console.log('Track Event:', eventName, properties);
    
    // Example for Google Analytics (gtag)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScroll = debounce(() => {
    // Any scroll-based functionality can be added here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Handle navbar background on scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 253, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--color-surface)';
        navbar.style.backdropFilter = 'none';
    }
}

window.addEventListener('scroll', debounce(updateNavbarBackground, 10));

// Add loading class to buttons when they're clicked
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn[type="submit"]')) {
        // This will be handled by form submission functions
        return;
    }
    
    if (e.target.matches('.btn') && e.target.href) {
        e.target.classList.add('loading');
        setTimeout(() => {
            e.target.classList.remove('loading');
        }, 1000);
    }
});

// Handle external links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[target="_blank"]')) {
        // Track external link clicks
        trackEvent('external_link_click', {
            url: e.target.href,
            text: e.target.textContent
        });
    }
});

// Error handling for forms
document.addEventListener('input', function(e) {
    if (e.target.matches('.form-control')) {
        // Remove error styling when user starts typing
        e.target.classList.remove('error');
        
        // Real-time email validation
        if (e.target.type === 'email' && e.target.value) {
            if (isValidEmail(e.target.value)) {
                e.target.classList.remove('error');
                e.target.classList.add('valid');
            } else {
                e.target.classList.add('error');
                e.target.classList.remove('valid');
            }
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle escape key to close mobile menu
    if (e.key === 'Escape') {
        const navbarMenu = document.getElementById('navbar-menu');
        const navbarToggle = document.getElementById('navbar-toggle');
        
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    }
});

// Print styles trigger
window.addEventListener('beforeprint', function() {
    // Ensure all sections are visible for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Feature detection and progressive enhancement
function supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// Add feature detection classes
if (supportsWebP()) {
    document.documentElement.classList.add('webp');
} else {
    document.documentElement.classList.add('no-webp');
}

// Detect if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
    
    // Disable smooth scrolling for users who prefer reduced motion
    document.documentElement.style.scrollBehavior = 'auto';
}

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration can be added here for offline functionality
        console.log('Service Worker support detected');
    });
}