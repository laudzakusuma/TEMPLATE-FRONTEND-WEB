// Tunggu hingga DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION FUNCTIONALITY =====
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== SCROLL ANIMATIONS =====
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to check if element is partially in viewport
    function isPartiallyInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        
        return (elementTop < windowHeight && elementBottom > 0);
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const animateElements = document.querySelectorAll('.scroll-animate');
        
        animateElements.forEach(element => {
            if (isPartiallyInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check and scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // ===== TYPING ANIMATION ENHANCEMENT =====
    
    const typingText = document.querySelector('.typing-text');
    const text = 'Selamat Datang di Dunia Kreatif';
    let i = 0;
    
    // Reset and restart typing animation
    function restartTyping() {
        typingText.textContent = '';
        i = 0;
        typeWriter();
    }
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(restartTyping, 500);
    
    // ===== BUTTON RIPPLE EFFECT =====
    
    const rippleButtons = document.querySelectorAll('.cta-button, .submit-button');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.button-ripple') || document.createElement('div');
            if (!this.querySelector('.button-ripple')) {
                ripple.className = 'button-ripple';
                this.appendChild(ripple);
            }
            
            // Reset ripple
            ripple.style.width = '0';
            ripple.style.height = '0';
            
            // Get button dimensions and position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Set ripple position and animate
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
        });
    });
    
    // ===== PARALLAX EFFECT FOR FLOATING SHAPES =====
    
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        shapes.forEach((shape, index) => {
            const speed = parallaxSpeed * (index + 1);
            const yOffset = scrolled * speed;
            shape.style.transform = `translateY(${yOffset}px)`;
        });
    });
    
    // ===== FORM HANDLING =====
    
    const contactForm = document.querySelector('.contact-form');
    const submitButton = contactForm.querySelector('.submit-button');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formInputs = this.querySelectorAll('.form-input, .form-textarea');
        
        // Simple validation
        let isValid = true;
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff6b6b';
                setTimeout(() => {
                    input.style.borderColor = '#eee';
                }, 3000);
            }
        });
        
        if (isValid) {
            // Simulate form submission
            submitButton.innerHTML = '<span>Mengirim...</span>';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = '<span>Pesan Terkirim!</span>';
                submitButton.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = '<span>Kirim Pesan</span>';
                    submitButton.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e53)';
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        } else {
            // Shake animation for invalid form
            contactForm.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 500);
        }
    });
    
    // ===== INTERSECTION OBSERVER FOR BETTER PERFORMANCE =====
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add stagger effect for service cards
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
    
    // ===== DYNAMIC COUNTER ANIMATION =====
    
    const counters = document.querySelectorAll('.visual-card h3');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace('+', ''));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 20);
        });
        
        countersAnimated = true;
    }
    
    // Trigger counter animation when about section is visible
    const aboutSection = document.querySelector('.about');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        counterObserver.observe(aboutSection);
    }
    
    // ===== MOUSE CURSOR EFFECT =====
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .visual-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e53)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        });
    });
    
    // ===== PAGE LOAD ANIMATION =====
    
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    // Add spinning animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    loadingScreen.appendChild(loader);
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
    
    // ===== PERFORMANCE OPTIMIZATION =====
    
    // Throttle scroll events for better performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(function() {
        // Parallax effect
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        shapes.forEach((shape, index) => {
            const speed = parallaxSpeed * (index + 1);
            const yOffset = scrolled * speed;
            shape.style.transform = `translateY(${yOffset}px)`;
        });
        
        // Navbar effect
        if (scrolled > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Focus management for mobile menu
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    console.log('🎉 Website berhasil dimuat dengan semua animasi dan interaktivitas!');
});