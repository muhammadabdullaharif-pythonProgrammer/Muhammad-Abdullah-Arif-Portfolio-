// ===== DOM Elements =====
const header = document.querySelector('header');
const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const barsBox = document.querySelector('.bars-box');
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

// ===== FAST LOADING CIRCLE ANIMATION =====
window.addEventListener('load', function() {
    const loader = document.getElementById('loaderWrapper');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 400);
        }
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
    }, 120);
    
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 3500);
});

document.body.style.overflow = 'hidden';

// ===== Mobile Menu Toggle =====
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
    });
});

function handleNavigation() {
const hash = window.location.hash || '#home';
const targetId = hash.substring(1);

```
sections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
});

const activeSection = document.getElementById(targetId);

if (activeSection) {
    activeSection.classList.add('active');
    activeSection.style.display = 'block';
}

navLinks.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === hash) {
        link.classList.add('active');
    }
});

if (header) {
    header.classList.add('active');
}

if (barsBox && barsBox.classList.contains('active')) {
    setTimeout(() => {
        barsBox.classList.remove('active');
    }, 500);
}
```

}

navLinks.forEach(link => {
link.addEventListener('click', (e) => {
e.preventDefault();

```
    const targetId = link.getAttribute('href').replace('#', '');

    history.pushState(null, null, `#${targetId}`);

    handleNavigation();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    nav.classList.remove('active');

    if (menuIcon) {
        menuIcon.classList.remove('bx-x');
    }
});
```

});

window.addEventListener('load', () => {
if (!window.location.hash) {
window.location.hash = '#home';
}

```
handleNavigation();
```

});

window.addEventListener('hashchange', handleNavigation);

// ===== Resume Tab Switching =====
if (resumeBtns.length > 0) {
    resumeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            resumeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tabId = btn.getAttribute('data-tab');
            
            resumeDetails.forEach(detail => {
                detail.classList.remove('active');
                if (detail.id === `${tabId}-detail`) {
                    detail.classList.add('active');
                }
            });
        });
    });
}

// ===== Handle initial load and hash changes =====
window.addEventListener('load', () => {
    if (!window.location.hash || window.location.hash === '') {
        window.location.hash = '#home';
    }
    handleNavigation();
    
    if (resumeBtns.length > 0 && !document.querySelector('.resume-btn.active')) {
        resumeBtns[0].classList.add('active');
    }
    
    if (resumeDetails.length > 0 && !document.querySelector('.resume-detail.active')) {
        const firstDetail = document.querySelector('.resume-detail.experience');
        if (firstDetail) firstDetail.classList.add('active');
    }
});

window.addEventListener('hashchange', handleNavigation);

// ===== Dynamic Headline Animation =====
const dynamicSpans = document.querySelectorAll('.dynamic-headline span');
if (dynamicSpans.length > 0) {
    dynamicSpans.forEach(span => {
        span.style.animation = 'none';
        span.offsetHeight;
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
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
                input.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.5)';
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

// ===== Add notification animations =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// ===== Scroll to top button =====
const createScrollTopButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #7cf03d;
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

// ===== Prevent FOUC =====
document.body.style.visibility = 'visible';

// ===== CV Download =====
const downloadBtn = document.querySelector('.btn-sci .btn');
if (downloadBtn && downloadBtn.textContent.includes('Download CV')) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('📄 CV download will be available soon. Feel free to contact me!', 'info');
    });
}

// ===== Console Message =====
console.log('%c🚀 Muhammad Abdullah Arif - CS Teacher & Python Developer', 'color: #7cf03d; font-size: 16px; font-weight: bold;');
console.log('%c💼 Computer Science Teacher | Python Developer', 'color: #7cf03d; font-size: 12px;');
console.log('%c📚 Teaching with Passion • Coding with Purpose', 'color: #7cf03d; font-size: 12px;');
