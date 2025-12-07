// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active'); // Add animation class to toggle
        
        // Simple hamburger animation logic
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Reset hamburger
        if(navToggle) {
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Sticky Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        // Keep transparency if at top and not on portfolio page
        if (!document.querySelector('.project-header')) {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)'; 
        }
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, revealOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('revealed');
            revealOnScroll.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Form Submission Visual Feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.innerText = 'Message Sent ✓';
            btn.style.backgroundColor = '#15803d';
            btn.style.color = 'white';
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}