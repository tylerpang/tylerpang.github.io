// ========================================
// Theme Management
// ========================================
const THEME_KEY = 'tylerpang-theme';
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    // Default to system preference if no saved theme
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
}

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('.theme-icon');
    if (theme === 'dark') {
        icon.classList.remove('ri-moon-line');
        icon.classList.add('ri-sun-line');
    } else {
        icon.classList.remove('ri-sun-line');
        icon.classList.add('ri-moon-line');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ========================================
// Menu Management
// ========================================
const menuToggle = document.getElementById('menu-toggle');
const navDropdown = document.getElementById('nav-dropdown');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navDropdown.classList.toggle('active');
    
    const icon = menuToggle.querySelector('.menu-icon');
    if (navDropdown.classList.contains('active')) {
        icon.classList.remove('ri-menu-line');
        icon.classList.add('ri-close-line');
    } else {
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navDropdown.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navDropdown.classList.contains('active') && 
        !navDropdown.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        toggleMenu();
    }
});

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate progress bars if inside the target
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function initAnimations() {
    const elements = document.querySelectorAll('.glass-panel, .section-title, .hero-content > *');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
        observer.observe(el);
    });
}

// ========================================
// Smooth Scroll & Active Nav
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAnimations();
    initSmoothScroll();
    
    console.log('%c Tyler A. Pang Portfolio ', 'background: #2563eb; color: white; padding: 4px; border-radius: 4px;');
});
