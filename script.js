// Cache DOM elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const skillTags = document.querySelectorAll('.skill-tag');
const glassCards = document.querySelectorAll('.glass-card');

// Smooth scrolling for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        // Validate navigation target
        if (!targetId || !targetId.startsWith('#')) {
            console.warn('Invalid navigation target');
            return;
        }
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector('.nav-link.active');
            const newActiveLink = document.querySelector(`[href="#${id}"]`);
            if (activeLink !== newActiveLink) {
                if (activeLink) activeLink.classList.remove('active');
                if (newActiveLink) newActiveLink.classList.add('active');
            }
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-50px 0px -50px 0px'
});

sections.forEach(section => observer.observe(section));

// Cache mobile elements
let mobileToggle = null;
const sidebar = document.querySelector('.sidebar');

// Mobile sidebar toggle
function handleMobileToggle() {
    if (window.innerWidth <= 768) {
        if (!mobileToggle) {
            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-toggle';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            mobileToggle.addEventListener('click', () => {
                if (sidebar) sidebar.classList.toggle('active');
            });
            
            document.body.appendChild(mobileToggle);
        }
    } else {
        if (mobileToggle) {
            mobileToggle.remove();
            mobileToggle = null;
        }
    }
}

// Skill tag interactions
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => tag.classList.add('hover'));
    tag.addEventListener('mouseleave', () => tag.classList.remove('hover'));
});

// Glass card hover effects
glassCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hover'));
    card.addEventListener('mouseleave', () => card.classList.remove('hover'));
});

// Initialize
window.addEventListener('load', () => {
    handleMobileToggle();
});

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleMobileToggle, 250);
});