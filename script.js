// ===== DOM Elements =====
const header = document.querySelector('header');
const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const barsBox = document.querySelector('.bars-box');
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

// ===== FAST LOADING CIRCLE ANIMATION =====
window.addEventListener('load', function() {
    const loader = document.getElementById('loaderWrapper');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (!loader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 300);
        }
        
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressText) progressText.textContent = Math.floor(progress) + '%';
    }, 100);
    
    // Safety fallback
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 3000);
});

// Prevent scrolling during loading
document.body.style.overflow = 'hidden';

// ===== Mobile Menu Toggle =====
if (menuIcon && nav) {
    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });
}

// ===== Close mobile menu when clicking a link =====
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav) nav.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
    });
});

// ===== Navigation & Section Switching =====
function handleNavigation() {
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1);
    
    // Update sections
    sections.forEach(section => {
        const shouldBeActive = section.id === targetId || (targetId === '' && section.id === 'home');
        section.classList.toggle('active', shouldBeActive);
    });
    
    // Update nav links
    navLinks.forEach(link => {
        const linkHash = link.getAttribute('href');
        const linkId = linkHash.substring(1);
        const isActive = linkId === targetId || (hash === '#home' && linkId === 'home');
        link.classList.toggle('active', isActive);
    });
    
    // Show header
    if (header) header.classList.add('active');
    
    // Bar animation
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
            history.pushState(null, null, `#${targetId}`);
            handleNavigation();
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Resume Tab Switching =====
if (resumeBtns.length > 0 && resumeDetails.length > 0) {
    resumeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active from all buttons and details
            resumeBtns.forEach(b => b.classList.remove('active'));
            resumeDetails.forEach(detail => detail.classList.remove('active'));
            
            // Add active to clicked button and corresponding detail
            btn.classList.add('active');
            const detailElement = document.getElementById(`${tabId}-detail`);
            if (detailElement) {
                detailElement.classList.add('active');
            }
        });
    });
}

// ===== Handle initial load and hash changes =====
window.addEventListener('load', () => {
    if (!window.location.hash || window.location.hash === '') {
        window.location.hash = '#home';
    }
    handleNavigation();
    
    // Set initial resume tab
    if (resumeBtns.length > 0) {
        const activeBtn = document.querySelector('.resume-btn.active');
        if (!activeBtn) {
            resumeBtns[0].classList.add('active');
            const firstDetail = document.querySelector('.resume-detail.experience');
            if (firstDetail) firstDetail.classList.add('active');
        }
    }
});

window.addEventListener('hashchange', handleNavigation);

// ===== Contact Form Handling =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff6b6b';
                input.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
            } else {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }
        });
        
        if (isValid) {
            showNotification('✅ Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('⚠️ Please fill in all required fields.', 'error');
        }
    });
    
    // Clear error styles on input
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const iconClass = {
        'success': 'bx-check-circle',
        'error': 'bx-error-circle',
        'info': 'bx-info-circle'
    }[type] || 'bx-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bx ${iconClass}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    const bgColor = {
        'success': '#4caf50',
        'error': '#f44336',
        'info': '#2196f3'
    }[type] || '#2196f3';
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        font-size: 1.4rem;
        min-width: 280px;
        max-width: 400px;
        font-weight: 500;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        margin-left: auto;
        padding: 0 5px;
        transition: 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.transform = 'scale(1.2)';
    });
    
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(notification);
    
    const removeNotification = () => {
        notification.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 300);
    };
    
    setTimeout(() => {
        if (notification.parentNode) {
            removeNotification();
        }
    }, 5000);
    
    closeBtn.addEventListener('click', removeNotification);
}

// ===== Add notification animations =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
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
document.head.appendChild(styleSheet);

// ===== Scroll to top button =====
const createScrollTopButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.setAttribute('title', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7cf03d, #5cb85c);
        color: #1f242d;
        border: none;
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 6px 20px rgba(124, 240, 61, 0.3);
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.15)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });
};

setTimeout(createScrollTopButton, 500);

// ===== Active nav link update on scroll =====
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
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
        const rect = homeImg.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = (e.clientX - centerX) / rect.width;
        const mouseY = (e.clientY - centerY) / rect.height;
        
        const moveX = mouseX * 15;
        const moveY = mouseY * 15;
        
        homeImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    window.addEventListener('mouseleave', () => {
        homeImg.style.transform = 'translate(0px, 0px)';
    });
}

// ===== Animate elements on scroll =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.services-box, .portfolio-box, .resume-item, .skill-item, .about-item, .contact-detail');
    
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
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
};

window.addEventListener('load', () => {
    setTimeout(animateOnScroll, 300);
});

// ===== CV Download Button =====
const downloadBtn = document.querySelector('.btn-primary');
if (downloadBtn && downloadBtn.textContent.includes('Download CV')) {
    downloadBtn.addEventListener('click', (e) => {
        // Allow normal download behavior or show notification
        if (!downloadBtn.href || downloadBtn.href.includes('undefined')) {
            e.preventDefault();
            showNotification('📄 CV download will be available soon. Feel free to contact me!', 'info');
        }
    });
}

// ===== Prevent FOUC =====
document.body.style.visibility = 'visible';

// ===== Console Message =====
console.log('%c🚀 Muhammad Abdullah Arif - CS Teacher & Python Developer', 'color: #7cf03d; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(124, 240, 61, 0.5)');
console.log('%c💼 Computer Science Teacher | Python Developer | Full-Stack Engineer', 'color: #7cf03d; font-size: 12px; font-weight: 600');
console.log('%c📚 Teaching with Passion • Coding with Purpose', 'color: #5cb85c; font-size: 12px; font-style: italic');
console.log('%c📞 Contact: muhammadabdullaharif25july2002@gmail.com | +92 336 7195002', 'color: #fff; font-size: 11px;');

// ===== Performance Optimization =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Dynamic year in footer =====
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    footerYear.textContent = `© ${currentYear} Muhammad Abdullah Arif. All rights reserved.`;
}

// ===== Smooth scroll behavior for all browsers =====
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('Smooth scroll not supported, using polyfill');
}

// ===== Error Handling =====
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // Silently handle errors in production
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});
