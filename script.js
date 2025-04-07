document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mainNav.classList.toggle('active');

        // Toggle body overflow when menu is open
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && e.target !== mobileMenu) {
            mobileMenu.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileMenu.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Parallax Effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');

        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Profile image zoom effect on scroll
    const profileImg = document.querySelector('.profile-img');
    const aboutImg = document.querySelector('.about-img');

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Image zoom effect
                profileImg.style.transform = 'scale(1)';
                profileImg.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';

                // Border animation
                aboutImg.querySelector('::after').style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.about'));

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Animate cards when they come into view
    const serviceCards = document.querySelectorAll('.service-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Enhanced hover effects for touch devices
    serviceCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('hover');
        });

        card.addEventListener('touchend', function() {
            this.classList.remove('hover');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.classList.add('loaded');

                    // Optional: Load the actual image source if using data-src
                    // if (lazyImage.dataset.src) {
                    //     lazyImage.src = lazyImage.dataset.src;
                    // }

                    observer.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }

    // Animation on scroll
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        portfolioObserver.observe(item);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const clientLogos = document.querySelector('.client-logos');

    let currentSlide = 0;
    let autoSlideInterval;
    const slideInterval = 5000; // 5 seconds

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    // Initialize first slide
    slides[currentSlide].classList.add('active');

    // Navigation functions
    function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (slideIndex + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Reset autoslide timer
        resetAutoSlide();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Pause on hover
    const testimonialContainer = document.querySelector('.testimonials-container');
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    testimonialContainer.addEventListener('mouseleave', startAutoSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Start autoslide
    startAutoSlide();

    // Animate client logos when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    observer.observe(clientLogos);
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            setError(nameInput, nameError, 'Name is required');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            setError(nameInput, nameError, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            setSuccess(nameInput, nameError);
        }

        // Validate email
        if (emailInput.value.trim() === '') {
            setError(emailInput, emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            setError(emailInput, emailError, 'Please enter a valid email');
            isValid = false;
        } else {
            setSuccess(emailInput, emailError);
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            setError(messageInput, messageError, 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            setError(messageInput, messageError, 'Message must be at least 10 characters');
            isValid = false;
        } else {
            setSuccess(messageInput, messageError);
        }

        // Submit form if valid
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });

    // Real-time validation
    nameInput.addEventListener('input', () => validateName());
    emailInput.addEventListener('input', () => validateEmail());
    messageInput.addEventListener('input', () => validateMessage());

    function validateName() {
        if (nameInput.value.trim() === '') {
            setError(nameInput, nameError, 'Name is required');
        } else if (nameInput.value.trim().length < 2) {
            setError(nameInput, nameError, 'Name must be at least 2 characters');
        } else {
            setSuccess(nameInput, nameError);
        }
    }

    function validateEmail() {
        if (emailInput.value.trim() === '') {
            setError(emailInput, emailError, 'Email is required');
        } else if (!isValidEmail(emailInput.value.trim())) {
            setError(emailInput, emailError, 'Please enter a valid email');
        } else {
            setSuccess(emailInput, emailError);
        }
    }

    function validateMessage() {
        if (messageInput.value.trim() === '') {
            setError(messageInput, messageError, 'Message is required');
        } else if (messageInput.value.trim().length < 10) {
            setError(messageInput, messageError, 'Message must be at least 10 characters');
        } else {
            setSuccess(messageInput, messageError);
        }
    }

    function setError(input, errorElement, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function setSuccess(input, errorElement) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        errorElement.style.display = 'none';
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Focus effects
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Social icon animations
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.1)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer');

    // Fade-in animation on scroll
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    footerObserver.observe(footer);

    // Current year for copyright
    const yearElement = document.querySelector('.copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
});