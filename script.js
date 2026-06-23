// ===== DOM Elements =====
const header = document.querySelector('header');
const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const barsBox = document.querySelector('.bars-box');
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

// ===== Mobile Menu Toggle =====
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });
}

// ===== Close mobile menu when clicking a link =====
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
    });
});

// ===== Navigation & Section Switching =====
function handleNavigation() {
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1);
    
    // Update active section
    sections.forEach(section => {
        if (section.id === targetId || (targetId === '' && section.id === 'home')) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        const linkHash = link.getAttribute('href');
        if (linkHash === hash || (hash === '#home' && linkHash === '#home')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update header active state
    if (header) header.classList.add('active');
    
    // Hide bars box after animation
    if (barsBox && barsBox.classList.contains('active')) {
        setTimeout(() => {
            barsBox.classList.remove('active');
        }, 500);
    }
}

// ===== Smooth Scroll for Navigation =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Update URL hash without jumping
            history.pushState(null, null, `#${targetId}`);
            handleNavigation();
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Resume Tab Switching =====
if (resumeBtns.length > 0) {
    resumeBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            resumeBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            // Remove active class from all details
            resumeDetails.forEach(detail => detail.classList.remove('active'));
            
            // Activate corresponding detail based on button text
            const btnText = btn.textContent.toLowerCase().trim();
            
            if (btnText.includes('experience')) {
                document.querySelector('.resume-detail.experience')?.classList.add('active');
            } else if (btnText.includes('education')) {
                document.querySelector('.resume-detail.education')?.classList.add('active');
            } else if (btnText.includes('skill')) {
                document.querySelector('.resume-detail.skills')?.classList.add('active');
            } else if (btnText.includes('about')) {
                document.querySelector('.resume-detail.about')?.classList.add('active');
            }
        });
    });
}

// ===== Handle initial load and hash changes =====
window.addEventListener('load', () => {
    // Set default active states if no hash
    if (!window.location.hash || window.location.hash === '') {
        window.location.hash = '#home';
    }
    handleNavigation();
    
    // Ensure resume first tab is active by default
    if (resumeBtns.length > 0 && !document.querySelector('.resume-btn.active')) {
        resumeBtns[0].classList.add('active');
    }
    
    // Set default resume detail visibility
    if (resumeDetails.length > 0 && !document.querySelector('.resume-detail.active')) {
        const firstDetail = document.querySelector('.resume-detail.experience');
        if (firstDetail) firstDetail.classList.add('active');
    }
    
    // Update resume details based on active button
    const activeBtn = document.querySelector('.resume-btn.active');
    if (activeBtn) {
        activeBtn.click();
    }
});

window.addEventListener('hashchange', handleNavigation);

// ===== Dynamic Headline Animation Enhancement =====
const dynamicSpans = document.querySelectorAll('.dynamic-headline span');
if (dynamicSpans.length > 0) {
    dynamicSpans.forEach(span => {
        span.style.animation = 'none';
        span.offsetHeight; // trigger reflow
        span.style.animation = null;
    });
}

// ===== Contact Form Handling =====
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        let formData = {};
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
                input.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.5)';
            } else {
                input.style.borderColor = '';
                input.style.boxShadow = '';
                if (input.name) {
                    formData[input.name] = input.value;
                } else if (input.placeholder) {
                    formData[input.placeholder] = input.value;
                }
            }
        });
        
        if (isValid) {
            showNotification('✅ Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('⚠️ Please fill in all required fields.', 'error');
        }
    });
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-error-circle' : 'bx-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-size: 1.4rem;
        min-width: 280px;
        max-width: 400px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
        padding: 0 5px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 300);
        }
    }, 5000);
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 300);
    });
}

// Add animation keyframes for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Scroll to top button =====
const createScrollTopButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--main-color, #7cf03d);
        color: var(--bg-color, #1f242d);
        border: none;
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(124, 240, 61, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 6px 20px rgba(124, 240, 61, 0.5)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 12px rgba(124, 240, 61, 0.3)';
    });
};

setTimeout(createScrollTopButton, 1000);

// ===== Active nav link update on scroll =====
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
});

// ===== Parallax effect for home image =====
const homeImg = document.querySelector('.home-img .img-item');
if (homeImg) {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        const moveX = (mouseX - 0.5) * 10;
        const moveY = (mouseY - 0.5) * 10;
        
        homeImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// ===== Animate elements on scroll =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.services-box, .portfolio-box, .resume-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

window.addEventListener('load', () => {
    setTimeout(animateOnScroll, 500);
});

// ===== Prevent FOUC (Flash of Unstyled Content) =====
document.body.style.visibility = 'visible';

// ===== Handle CV Download =====
const downloadBtn = document.querySelector('.btn-sci .btn');
if (downloadBtn && downloadBtn.textContent.includes('Download CV')) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('📄 CV download will be available soon. Feel free to contact me!', 'info');
    });
}

// ===== Log welcome message in console =====
console.log('%c🚀 Muhammad Abdullah Arif - CS Teacher & Python Developer', 'color: #7cf03d; font-size: 16px; font-weight: bold;');
console.log('%c💼 Computer Science Teacher | Python Developer', 'color: #7cf03d; font-size: 12px;');
console.log('%c📚 Teaching with Passion • Coding with Purpose', 'color: #7cf03d; font-size: 12px;');
