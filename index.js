 // Smooth scrolling for navigation links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
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

 // Mobile navigation toggle
 const navToggle = document.getElementById('nav-toggle');
 const navMenu = document.getElementById('nav-menu');

 navToggle.addEventListener('click', () => {
     navMenu.classList.toggle('active');
     navToggle.classList.toggle('active');
 });

 // Close mobile menu when clicking on a link
 document.querySelectorAll('.nav-link').forEach(link => {
     link.addEventListener('click', () => {
         navMenu.classList.remove('active');
         navToggle.classList.remove('active');
     });
 });

 // Navbar scroll effect
 window.addEventListener('scroll', () => {
     const navbar = document.getElementById('navbar');
     if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
     } else {
         navbar.classList.remove('scrolled');
     }
 });

 // Active navigation link highlighting
 window.addEventListener('scroll', () => {
     const sections = document.querySelectorAll('section[id]');
     const navLinks = document.querySelectorAll('.nav-link');

     let current = '';
     sections.forEach(section => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.clientHeight;
         if (scrollY >= (sectionTop - 200)) {
             current = section.getAttribute('id');
         }
     });

     navLinks.forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === `#${current}`) {
             link.classList.add('active');
         }
     });
 });

 // Scroll indicator click
 document.querySelector('.scroll-indicator').addEventListener('click', () => {
     document.getElementById('about').scrollIntoView({
         behavior: 'smooth'
     });
 });

 // Form submission
 document.getElementById('contact-form').addEventListener('submit', function(e) {
     e.preventDefault();

     // Get form data
     const formData = new FormData(this);
     const name = formData.get('name');
     const email = formData.get('email');
     const subject = formData.get('subject');
     const message = formData.get('message');

     // Simple validation
     if (!name || !email || !subject || !message) {
         alert('Please fill in all fields');
         return;
     }

     // Email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
         alert('Please enter a valid email address');
         return;
     }

     // Simulate form submission
     const submitBtn = this.querySelector('button[type="submit"]');
     const originalText = submitBtn.textContent;

     submitBtn.textContent = 'Sending...';
     submitBtn.disabled = true;

     // Simulate API call
     setTimeout(() => {
         alert('Thank you for your message! I\'ll get back to you soon.');
         this.reset();
         submitBtn.textContent = originalText;
         submitBtn.disabled = false;
     }, 2000);
 });

 // Intersection Observer for animations
 const observerOptions = {
     threshold: 0.1,
     rootMargin: '0px 0px -50px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.style.opacity = '1';
             entry.target.style.transform = 'translateY(0)';
         }
     });
 }, observerOptions);

 // Observe elements for animation
 document.querySelectorAll('.skill-category, .project-card, .stat').forEach(el => {
     el.style.opacity = '0';
     el.style.transform = 'translateY(20px)';
     el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
     observer.observe(el);
 });

 // Typing effect for hero title
 function typeWriter(element, text, speed = 100) {
     let i = 0;
     element.innerHTML = '';

     function type() {
         if (i < text.length) {
             element.innerHTML += text.charAt(i);
             i++;
             setTimeout(type, speed);
         }
     }

     type();
 }

 // Initialize typing effect when page loads
 window.addEventListener('load', () => {
     const heroTitle = document.querySelector('.hero-title');
     const originalText = heroTitle.textContent;
     typeWriter(heroTitle, originalText, 50);
 });

 // Skill items hover effect
 document.querySelectorAll('.skill-item').forEach(item => {
     item.addEventListener('mouseenter', function() {
         this.style.transform = 'translateY(-5px) scale(1.05)';
     });

     item.addEventListener('mouseleave', function() {
         this.style.transform = 'translateY(0) scale(1)';
     });
 });

 // Project cards tilt effect
 document.querySelectorAll('.project-card').forEach(card => {
     card.addEventListener('mousemove', function(e) {
         const rect = this.getBoundingClientRect();
         const x = e.clientX - rect.left;
         const y = e.clientY - rect.top;

         const centerX = rect.width / 2;
         const centerY = rect.height / 2;

         const rotateX = (y - centerY) / 10;
         const rotateY = (centerX - x) / 10;

         this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
     });

     card.addEventListener('mouseleave', function() {
         this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
     });
 });

 // Parallax effect for hero section
 window.addEventListener('scroll', () => {
     const scrolled = window.pageYOffset;
     const hero = document.querySelector('.hero');
     const rate = scrolled * -0.5;

     if (hero) {
         hero.style.transform = `translateY(${rate}px)`;
     }
 });

 // Counter animation for stats
 function animateCounter(element, target, duration = 2000) {
     let start = 0;
     const increment = target / (duration / 16);

     function updateCounter() {
         start += increment;
         if (start < target) {
             element.textContent = Math.floor(start) + '+';
             requestAnimationFrame(updateCounter);
         } else {
             element.textContent = target + '+';
         }
     }

     updateCounter();
 }

 // Initialize counter animation when stats section is visible
 const statsObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             const statNumbers = entry.target.querySelectorAll('.stat h3');
             statNumbers.forEach(stat => {
                 const target = parseInt(stat.textContent);
                 animateCounter(stat, target);
             });
             statsObserver.unobserve(entry.target);
         }
     });
 }, { threshold: 0.5 });

 const aboutStats = document.querySelector('.about-stats');
 if (aboutStats) {
     statsObserver.observe(aboutStats);
 }

 // Add loading animation
 window.addEventListener('load', () => {
     document.body.classList.add('loaded');
 });

 // Add CSS for loading animation
 const style = document.createElement('style');
 style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #667eea;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .loaded::before,
    .loaded::after {
        display: none;
    }
`;
 document.head.appendChild(style);