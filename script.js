// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll & Navigation with ID adjustment
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const headerOffset = 140; // Height of sticky headers
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

// Intersection Observer for Animations and Active Link State
const observerOptions = {
    threshold: 0.1,
    rootMargin: "-100px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Update category navigation active state
            if(entry.target.classList.contains('menu-category')) {
                 document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                 const id = entry.target.id;
                 const activeBtn = document.querySelector(`.category-btn[onclick*="'${id}'"]`);
                 if(activeBtn) activeBtn.classList.add('active');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
     navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
