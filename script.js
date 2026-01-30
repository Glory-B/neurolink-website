// =================================================================
// Mobile Menu Toggle
// =================================================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// =================================================================
// Reveal Animations on Scroll
// =================================================================
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("load", reveal);

// =================================================================
// FAQ Accordion Functionality
// =================================================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.style.maxHeight = '0';
                }
            });

            // Toggle current FAQ
            if (!isOpen) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
            }
        });

        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// Initialize FAQ on page load
document.addEventListener('DOMContentLoaded', initFAQ);

// =================================================================
// Service Modal Logic
// =================================================================
const serviceData = {
    'Cloud': {
        title: 'Cloud Solutions',
        desc: 'Seamlessly migrate and optimize your infrastructure with enterprise cloud services.',
        features: [
            'Cloud Migration Strategy & Planning',
            'Multi-Cloud & Hybrid Cloud Architecture',
            'Cloud Security & Compliance',
            'DevOps & CI/CD Implementation',
            'Container Orchestration',
            '24/7 Cloud Monitoring'
        ]
    },
    'Security': {
        title: 'Cybersecurity',
        desc: 'Protect your business with enterprise-grade security solutions.',
        features: [
            'Security Assessments & Penetration Testing',
            'SIEM Implementation',
            'Identity & Access Management',
            'Endpoint Detection & Response',
            'Incident Response & Forensics',
            'Compliance Management (GDPR, HIPAA, SOC 2)'
        ]
    },
    'Analytics': {
        title: 'Data Analytics',
        desc: 'Turn your data into actionable business insights with advanced analytics.',
        features: [
            'Business Intelligence Dashboards',
            'Predictive Analytics & Forecasting',
            'Data Warehousing & ETL',
            'Real-Time Analytics',
            'Customer Analytics',
            'Big Data Processing'
        ]
    },
    'Support': {
        title: 'IT Support',
        desc: 'Keep your business running smoothly with fast, reliable IT support and proactive technical assistance.',
        features: [
            'Remote & onsite IT support',
            'Hardware & software troubleshooting',
            'Microsoft 365 & email support',
            'Network & Wi-Fi issues',
            'User onboarding & offboarding',
            'Proactive monitoring & maintenance'
        ]
    },
    'Infrastructure': {
        title: 'IT Infrastructure',
        desc: 'Build robust systems that scale with your business.',
        features: [
            'Network Design & Implementation',
            'Server Management & Virtualization',
            'Storage Solutions',
            'Disaster Recovery Planning',
            'Infrastructure Monitoring',
            'Performance Optimization'
        ]
    },
    'AI': {
        title: 'AI Solutions',
        desc: 'Leverage artificial intelligence for competitive advantage.',
        features: [
            'Machine Learning Model Development',
            'Natural Language Processing',
            'Computer Vision',
            'Intelligent Process Automation',
            'Chatbots & Virtual Assistants',
            'AI Strategy Consulting'
        ]
    },
    'Digital': {
        title: 'Digital Transformation',
        desc: 'Modernize your business for the digital age.',
        features: [
            'Custom Software Development',
            'Mobile App Development',
            'Web Application Development',
            'API Development & Integration',
            'Legacy System Modernization',
            'UX/UI Design'
        ]
    }
};

const serviceDetailLinks = {
    Cloud: 'cloud-solutions.html',
    Security: 'cybersecurity.html',
    Analytics: 'data-analytics.html',
    Support: 'servicedesk.html',
    Infrastructure: 'it-infrastructure.html',
    AI: 'ai-solutions.html',
    Digital: 'digital-transformation.html'
};

function initServiceModals() {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalList = document.getElementById('modal-list');
    const closeModalBtn = document.querySelector('.modal-close');

    if (!modal) return;

    // Handle service card clicks
    document.addEventListener('click', (e) => {
        const serviceCard = e.target.closest('.service-card');
        if (serviceCard) {
            e.preventDefault();
            const serviceName = serviceCard.getAttribute('data-service');
            const data = serviceData[serviceName];

            if (data) {
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                modalList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

                const existingButton = modalList.parentElement.querySelector('.modal-details-btn');
                if (existingButton) {
                    existingButton.remove();
                }

                const detailsLink = serviceDetailLinks[serviceName];
                if (detailsLink) {
                    const detailsButton = document.createElement('a');
                    detailsButton.href = detailsLink;
                    detailsButton.className = 'cta-btn modal-details-btn';
                    detailsButton.textContent = 'View Full Details';
                    detailsButton.style.marginTop = '20px';
                    detailsButton.style.display = 'inline-block';
                    modalList.parentElement.appendChild(detailsButton);
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Remove any dynamically added buttons
        const existingButton = modalList.parentElement.querySelector('.modal-details-btn');
        if (existingButton) {
            existingButton.remove();
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', initServiceModals);

// =================================================================
// Contact Form Validation & Submission
// =================================================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const formSuccess = document.getElementById('form-success');

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        // Check privacy checkbox
        const privacyCheckbox = document.getElementById('privacy');
        if (privacyCheckbox && !privacyCheckbox.checked) {
            showError('privacy', 'You must agree to the privacy policy');
            isValid = false;
        } else {
            hideError('privacy');
        }

        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Netlify Form Submission
            const formData = new FormData(contactForm);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
                .then(() => {
                    // Show success message
                    formSuccess.classList.add('active');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.remove('active');
                    }, 5000);

                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                })
                .catch((error) => {
                    console.error('Form submission error:', error);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    alert('There was an error sending your message. Please try again.');
                });
        }
    });
}

function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();

    // Clear previous errors
    hideError(fieldId);
    field.classList.remove('error');

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showError(fieldId, `Please enter your ${field.name}`);
        field.classList.add('error');
        return false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(fieldId, 'Please enter a valid email address');
            field.classList.add('error');
            return false;
        }
    }

    // Select validation
    if (field.tagName === 'SELECT' && (!value || value === '')) {
        showError(fieldId, 'Please select an option');
        field.classList.add('error');
        return false;
    }

    return true;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
}

function hideError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', initContactForm);

// =================================================================
// Newsletter Form Handling
// =================================================================
function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            // Simulate subscription (replace with actual API call)
            setTimeout(() => {
                showToast('Thank you for subscribing! You\'ll receive our newsletter soon.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    });
}

document.addEventListener('DOMContentLoaded', initNewsletterForms);

// =================================================================
// Sidebar Navigation Active State (Services Page)
// =================================================================
function initSidebarNav() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.service-section');

    if (tocLinks.length === 0 || sections.length === 0) return;
    updateSidebarActiveState();
}

document.addEventListener('DOMContentLoaded', initSidebarNav);

// =================================================================
// Testimonial Filtering (Testimonials Page)
// =================================================================
function initTestimonialFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter testimonials
            testimonialCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Re-trigger animation
                    card.classList.remove('reveal', 'active');
                    setTimeout(() => {
                        card.classList.add('reveal', 'active');
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initTestimonialFilters);

// =================================================================
// Smooth Scroll for Anchor Links
// =================================================================
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        const href = anchor.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
});

// Prevent jump on disabled social links
document.addEventListener('click', (e) => {
    const disabledLink = e.target.closest('a[aria-disabled="true"]');
    if (disabledLink) {
        e.preventDefault();
    }
});

// =================================================================
// Performance: Debounce Scroll Events
// =================================================================
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

// Apply debouncing to scroll-heavy functions

// =================================================================
// Toast Notification System
// =================================================================
function showToast(message, type = 'success', duration = 5000) {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const title = type === 'success' ? 'Success!' : 'Error';
    const icon = type === 'success' ? '✓' : '⚠';

    toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-title">${icon} ${title}</span>
            <button class="toast-close" aria-label="Close toast">&times;</button>
        </div>
        <div class="toast-body">${message}</div>
    `;

    // Add to DOM
    document.body.appendChild(toast);

    // Trigger show animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });

    // Auto-hide after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// =================================================================
// Auto-Update Copyright Year
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});

// =================================================================
// Enhanced Form Validation with Blur Events
// =================================================================
function initEnhancedContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const formFields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');

    // Add blur validation to all required fields
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.value.trim() !== '') {
                validateField(field);
            }
        });

        // Also validate on input for better UX
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initEnhancedContactForm);

// =================================================================
// Optimized Unified Scroll Handler
// =================================================================
function updateSidebarActiveState() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.service-section');
    if (tocLinks.length === 0 || sections.length === 0) return;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('onclick');
        if (linkHref && linkHref.includes(current)) {
            link.classList.add('active');
        }
    });
}

// Unified scroll handler
const unifiedScrollHandler = debounce(() => {
    reveal();
    updateSidebarActiveState();
}, 50);

// Replace multiple scroll listeners with unified one
window.removeEventListener('scroll', reveal);
window.addEventListener('scroll', unifiedScrollHandler);

// =================================================================
// Network Canvas Animation
// =================================================================
const canvas = document.getElementById("networkCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];

    // Optimization: State flags
    let isAnimating = false;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Limit to 30 FPS for performance

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Configuration
    const particleCount = 80;
    const connectionDistance = 150;
    const moveSpeed = 0.5;

    // Resize handling
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * moveSpeed;
            this.vy = (Math.random() - 0.5) * moveSpeed;
            this.size = Math.random() * 2 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = "rgba(255, 107, 53, 0.6)"; // Orange dots matching brand color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawScene() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach((p, index) => {
            // Only update positions if motion is allowed
            if (!prefersReducedMotion.matches) {
                p.update();
            }
            p.draw();
            // Draw connections
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < connectionDistance) {
                    // Opacity based on distance (fades out as they get further)
                    const alpha = 1 - dist / connectionDistance;
                    ctx.strokeStyle = `rgba(255, 107, 53, ${alpha * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
    }

    function animate(currentTime) {
        if (!isAnimating) return;

        requestAnimationFrame(animate);

        // Throttle logic
        const elapsed = currentTime - lastTime;
        if (elapsed < fpsInterval) return;

        lastTime = currentTime - (elapsed % fpsInterval);

        drawScene();
    }

    // Performance & Accessibility Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Only animate if visible AND user hasn't requested reduced motion
            if (entry.isIntersecting && !prefersReducedMotion.matches) {
                if (!isAnimating) {
                    isAnimating = true;
                    lastTime = performance.now();
                    animate(lastTime);
                }
            } else {
                isAnimating = false;
            }
        });
    }, { threshold: 0 });

    observer.observe(canvas);

    // Initial render (ensures something is visible even if paused/reduced motion)
    drawScene();
}
