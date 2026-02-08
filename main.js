// Portfolio Website Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ==========================================================================
    // Theme Management
    // ==========================================================================
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get current theme from localStorage or system preference
    function getCurrentTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return prefersDarkScheme.matches ? 'dark' : 'light';
    }
    
    // Set theme on page load
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    // Initialize theme
    setTheme(getCurrentTheme());
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
    
    // ==========================================================================
    // Navigation
    // ==========================================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Highlight active nav link on scroll
    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    // ==========================================================================
    // Scroll Animations
    // ==========================================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay * 1000);
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // ==========================================================================
    // Back to Top Button
    // ==========================================================================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==========================================================================
    // Skills Animation
    // ==========================================================================
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-level');
        
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Animate skills when they come into view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // ==========================================================================
    // Project Filtering
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ==========================================================================
    // Contact Form Validation
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');
        const formStatus = document.getElementById('form-status');
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function showError(element, message) {
            element.textContent = message;
            element.style.display = 'block';
        }
        
        function clearError(element) {
            element.textContent = '';
            element.style.display = 'none';
        }
        
        function resetForm() {
            contactForm.reset();
            clearError(nameError);
            clearError(emailError);
            clearError(subjectError);
            clearError(messageError);
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameError, 'Name is required');
                isValid = false;
            } else {
                clearError(nameError);
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                showError(emailError, 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError(emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailError);
            }
            
            // Validate subject
            if (!subjectInput.value.trim()) {
                showError(subjectError, 'Subject is required');
                isValid = false;
            } else {
                clearError(subjectError);
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageError, 'Message is required');
                isValid = false;
            } else {
                clearError(messageError);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this demo, we'll just show a success message
                formStatus.textContent = 'Thank you! Your message has been sent. I will get back to you soon.';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    resetForm();
                }, 5000);
            } else {
                formStatus.textContent = 'Please fix the errors above and try again.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
            }
        });
        
        // Clear errors on input
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                const errorElement = document.getElementById(`${input.id}-error`);
                clearError(errorElement);
                formStatus.style.display = 'none';
            });
        });
    }
    
    // ==========================================================================
    // Current Year in Footer
    // ==========================================================================
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // ==========================================================================
    // Smooth Scrolling for Anchor Links
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================================================
    // Window Event Listeners
    // ==========================================================================
    window.addEventListener('scroll', () => {
        highlightNavLink();
        toggleBackToTop();
    });
    
    window.addEventListener('load', () => {
        // Initial setup
        highlightNavLink();
        toggleBackToTop();
        
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Trigger initial animation for elements already in view
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const delay = el.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    el.classList.add('active');
                }, delay * 1000);
            }
        });
    });
    
    // ==========================================================================
    // Keyboard Navigation
    // ==========================================================================
    document.addEventListener('keydown', (e) => {
        // Close mobile menu on Escape key
        if (e.key === 'Escape') {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Navigate through projects with arrow keys when focused
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('filter-btn')) {
                const buttons = Array.from(filterButtons);
                const currentIndex = buttons.indexOf(focusedElement);
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % buttons.length;
                } else {
                    nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                }
                
                buttons[nextIndex].focus();
                buttons[nextIndex].click();
                e.preventDefault();
            }
        }
    });
    
    // ==========================================================================
    // Performance Optimization
    // ==========================================================================
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            highlightNavLink();
            toggleBackToTop();
        }, 100);
    });
});