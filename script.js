// ================================
// The Blade Room - Main JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initContent();
    initNavigation();
    initScrollEffects();
    initBookingForm();
    initNewsletterForm();
    initSmoothScroll();
    initAnimations();
    setMinDate();
});

// ================================
// Content Loading (TinaCMS)
// ================================
async function initContent() {
    try {
        const res = await fetch('/content/site.json');
        if (!res.ok) return;
        const data = await res.json();
        updateHero(data.hero);
        updateBooking(data.booking);
        updateServices(data.services);
        updateStory(data.story);
        updatePhilosophy(data.philosophy);
        updateGallery(data.gallery);
        updateContact(data.contact);
        updateFooter(data);
    } catch (e) {
        console.warn('Content load failed, using defaults', e);
    }
}

function updateHero(hero) {
    if (!hero) return;
    const line1 = document.querySelector('.hero-line-1');
    const line2 = document.querySelector('.hero-line-2');
    const line3 = document.querySelector('.hero-line-3');
    const desc = document.querySelector('.hero-desc');
    const bgImg = document.querySelector('.hero-bg-image img');
    if (line1) line1.textContent = hero.titleLine1;
    if (line2) line2.textContent = hero.titleLine2;
    if (line3) line3.innerHTML = hero.titleLine3;
    if (desc) desc.textContent = hero.description;
    if (bgImg && hero.backgroundImage) bgImg.src = hero.backgroundImage;
}

function updateBooking(booking) {
    if (!booking) return;
    const desc = document.querySelector('.booking-desc');
    if (desc) desc.textContent = booking.description;
    const detailCards = document.querySelectorAll('.detail-card');
    if (detailCards[0]) {
        const p = detailCards[0].querySelector('p');
        if (p) p.innerHTML = booking.address.replace(/\n/g, '<br>');
    }
    if (detailCards[1] && Array.isArray(booking.hours)) {
        const p = detailCards[1].querySelector('p');
        if (p) p.innerHTML = booking.hours.join('<br>');
    }
    if (detailCards[2]) {
        const a = detailCards[2].querySelector('a');
        if (a) {
            a.textContent = booking.phone;
            a.href = 'tel:+39' + booking.phone.replace(/\D/g, '');
        }
    }
    const noticeP = document.querySelector('.walk-in-notice p');
    if (noticeP) noticeP.textContent = booking.walkInNotice;
}

function updateServices(services) {
    if (!Array.isArray(services)) return;
    const list = document.querySelector('.services-list');
    if (!list) return;
    list.innerHTML = services.map((s, i) => `
        <article class="service-item">
            <div class="service-number">${String(i + 1).padStart(2, '0')}</div>
            <div class="service-content">
                <h3>${s.name}</h3>
                <p>${s.description}</p>
            </div>
            <div class="service-meta">
                <span class="service-duration">${s.duration}</span>
                <span class="service-price">${s.price}</span>
            </div>
        </article>
    `).join('');
}

function updateStory(story) {
    if (!story) return;
    const mainImg = document.querySelector('.story-image.main img');
    const secImg = document.querySelector('.story-image.secondary img');
    const accImg = document.querySelector('.story-image.accent img');
    if (mainImg && story.mainImage) mainImg.src = story.mainImage;
    if (secImg && story.secondaryImage) secImg.src = story.secondaryImage;
    if (accImg && story.accentImage) accImg.src = story.accentImage;
    const lead = document.querySelector('.story-text .lead');
    if (lead) lead.textContent = `"${story.quote}"`;
    const paragraphs = document.querySelectorAll('.story-text p:not(.lead)');
    if (paragraphs[0]) paragraphs[0].textContent = story.paragraph1;
    if (paragraphs[1]) paragraphs[1].textContent = story.paragraph2;
    const sig = document.querySelector('.story-signature span');
    if (sig) sig.textContent = story.signature;
}

function updatePhilosophy(philosophy) {
    if (!philosophy) return;
    const quote = document.querySelector('.philosophy blockquote p');
    const author = document.querySelector('.philosophy blockquote footer');
    if (quote) quote.textContent = philosophy.quote;
    if (author) author.textContent = `— ${philosophy.author}`;
}

function updateGallery(gallery) {
    if (!Array.isArray(gallery)) return;
    const mosaic = document.querySelector('.gallery-mosaic');
    if (!mosaic) return;
    mosaic.innerHTML = gallery.map(item => {
        const sizeClass = item.size && item.size !== 'normal' ? ` size-${item.size}` : '';
        const tagHtml = item.tag ? `<span class="gallery-tag">${item.tag}</span>` : '';
        return `
            <div class="gallery-item${sizeClass}">
                <img src="${item.image}" alt="${item.label}" loading="lazy">
                <div class="gallery-overlay">
                    <span class="gallery-label">${item.label}</span>
                    ${tagHtml}
                </div>
            </div>
        `;
    }).join('');
}

function updateContact(contact) {
    if (!contact) return;
    const bgImg = document.querySelector('.map-bg-image');
    if (bgImg && contact.backgroundImage) bgImg.src = contact.backgroundImage;
    const name = document.querySelector('.map-address strong');
    const addr = document.querySelector('.map-address span');
    const link = document.querySelector('.map-link');
    if (name) name.textContent = contact.name;
    if (addr) addr.textContent = contact.address;
    if (link) { link.href = contact.mapsUrl; }
}

function updateFooter(data) {
    const footer = data.footer;
    if (!footer) return;
    const tagline = document.querySelector('.footer-tagline');
    if (tagline) tagline.textContent = footer.tagline;
    const footerCols = document.querySelectorAll('.footer-col');
    // footerCols[0] = Orari, footerCols[1] = Contatti
    if (footerCols[0] && Array.isArray(data.booking?.hours)) {
        const ul = footerCols[0].querySelector('ul');
        if (ul) ul.innerHTML = data.booking.hours.map(h => `<li>${h}</li>`).join('');
    }
    if (footerCols[1]) {
        const links = footerCols[1].querySelectorAll('a');
        if (links[0]) { links[0].textContent = footer.phone; links[0].href = 'tel:+39' + footer.phone.replace(/\D/g, ''); }
        if (links[1]) { links[1].textContent = footer.email; links[1].href = `mailto:${footer.email}`; }
        const lis = footerCols[1].querySelectorAll('li');
        if (lis[2]) lis[2].textContent = footer.address;
    }
}

// ================================
// Navigation
// ================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ================================
// Scroll Effects
// ================================
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on section
        updateActiveNavLink();

        lastScroll = currentScroll;
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.btn-book)');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ================================
// Smooth Scroll
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Booking Form
// ================================
function initBookingForm() {
    const form = document.getElementById('bookingForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validate form
            if (!validateBookingForm(data)) {
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showNotification('Richiesta inviata! Confermeremo il tuo appuntamento a breve.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

function validateBookingForm(data) {
    const requiredFields = ['name', 'phone', 'service', 'date', 'time'];
    const fieldNames = {
        name: 'nome',
        phone: 'telefono',
        service: 'servizio',
        date: 'data',
        time: 'orario'
    };

    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Per favore compila il campo ${fieldNames[field]}.`, 'error');
            return false;
        }
    }

    // Validate email format (if provided)
    if (data.email && data.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Per favore inserisci un indirizzo email valido.', 'error');
            return false;
        }
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Per favore inserisci un numero di telefono valido.', 'error');
        return false;
    }

    return true;
}

function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${year}-${month}-${day}`;
    }
}

// ================================
// Newsletter Form
// ================================
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Per favore inserisci un indirizzo email valido.', 'error');
                return;
            }

            // Simulate subscription
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Grazie per esserti iscritto!', 'success');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

// ================================
// Notifications
// ================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Check if mobile
    const isMobile = window.innerWidth <= 768;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: isMobile ? '16px' : '24px',
        right: isMobile ? '16px' : '24px',
        left: isMobile ? '16px' : 'auto',
        padding: isMobile ? '14px 16px' : '16px 24px',
        background: type === 'success' ? '#2d5a3d' : type === 'error' ? '#5a2d2d' : '#2d3a5a',
        color: '#fff',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        fontSize: isMobile ? '14px' : '16px'
    });

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));

    // Auto remove after 5 seconds
    setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }
}

// ================================
// Scroll Animations
// ================================
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .animate-delay-1 { transition-delay: 0.1s; }
        .animate-delay-2 { transition-delay: 0.2s; }
        .animate-delay-3 { transition-delay: 0.3s; }
        .animate-delay-4 { transition-delay: 0.4s; }
        .animate-delay-5 { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);

    // Add animation class to elements
    const animateElements = [
        '.service-card',
        '.testimonial-card',
        '.gallery-item',
        '.about-content',
        '.about-images',
        '.booking-info',
        '.booking-form-container',
        '.contact-info',
        '.map-container'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.classList.add(`animate-delay-${(index % 5) + 1}`);
            observer.observe(el);
        });
    });
}

// ================================
// Utility Functions
// ================================

// Debounce function for performance
function debounce(func, wait = 20) {
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

// Throttle function for scroll events
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
