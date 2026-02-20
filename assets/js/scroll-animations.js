// Scroll-Triggered Animations using Intersection Observer API

document.addEventListener('DOMContentLoaded', function() {
    // Configuration for Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create observer instance
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    // Observe section headings (h2, h3) - Slide up animation
    document.querySelectorAll('article h2.major, article h3.major').forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.setProperty('--delay', (index * 0.1) + 's');
        observer.observe(el);
    });

    // Observe education cards - Slide in from left
    document.querySelectorAll('.education-card').forEach((el, index) => {
        el.classList.add('slide-in-left');
        el.style.setProperty('--delay', (index * 0.15) + 's');
        observer.observe(el);
    });

    // Observe work cards - Slide in from left
    document.querySelectorAll('.work-card').forEach((el, index) => {
        el.classList.add('slide-in-left');
        el.style.setProperty('--delay', (index * 0.15) + 's');
        observer.observe(el);
    });

    // Observe project cards - Scale in with zoom
    document.querySelectorAll('.project-card').forEach((el, index) => {
        el.classList.add('scale-in');
        el.style.setProperty('--delay', (index * 0.12) + 's');
        observer.observe(el);
    });

    // Observe skill cards - Staggered slide up
    document.querySelectorAll('.skill-card').forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.setProperty('--delay', (index * 0.1) + 's');
        observer.observe(el);
    });

    // Observe list items - Fade in with delays
    document.querySelectorAll('article ul li, article ol li').forEach((el, index) => {
        el.classList.add('fade-in-item');
        el.style.setProperty('--delay', (index * 0.08) + 's');
        observer.observe(el);
    });

    // Observe sections (intro, education, work, projects, skills)
    document.querySelectorAll('article#intro, article#education, article#work, article#projects, article#skills').forEach((el) => {
        el.classList.add('section-fade-in');
        observer.observe(el);
    });

    // Observe all paragraphs within articles - Fade in
    document.querySelectorAll('article p').forEach((el, index) => {
        if (index < 3) { // Only animate first few paragraphs to avoid slowing animation
            el.classList.add('fade-in-item');
            el.style.setProperty('--delay', (index * 0.1) + 's');
            observer.observe(el);
        }
    });
});
