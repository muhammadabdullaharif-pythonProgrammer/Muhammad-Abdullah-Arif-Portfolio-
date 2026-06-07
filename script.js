const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// Menu Toggle
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Active Page Handler
const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');
    
    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Navigation Links
navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();
            link.classList.add('active');
            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

// Logo Link
logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();
        navLinks[0].classList.add('active');
        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

// Resume Tab Buttons
const resumeBtns = document.querySelectorAll('.resume-btn');
resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');
        
        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        btn.classList.add('active');
        
        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        
        resumeDetails[idx].classList.add('active');
    });
});

// Portfolio Carousel (if applicable)
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

if (arrowRight && arrowLeft) {
    let index = 0;
    
    const activePortfolio = () => {
        const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
        const portfolioDetails = document.querySelectorAll('.portfolio-detail');
        
        if (imgSlide) {
            imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
        }
        
        portfolioDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        
        if (portfolioDetails[index]) {
            portfolioDetails[index].classList.add('active');
        }
    };
    
    arrowRight.addEventListener('click', () => {
        if (index < 4) {
            index++;
            arrowLeft.classList.remove('disabled');
        } else {
            index = 5;
            arrowRight.classList.add('disabled');
        }
        activePortfolio();
    });
    
    arrowLeft.addEventListener('click', () => {
        if (index > 1) {
            index--;
            arrowRight.classList.remove('disabled');
        } else {
            index = 0;
            arrowLeft.classList.add('disabled');
        }
        activePortfolio();
    });
}

// Contact Form Submission
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = this.querySelector('input[type="text"]').value;
        
        // Show success message
        alert(`Thank you for your message, ${fullName}! I will get back to you soon.`);
        
        // Reset form
        this.reset();
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            // e.preventDefault();
            // const target = document.querySelector(href);
            // if (target) {
            //     target.scrollIntoView({ behavior: 'smooth' });
            // }
        }
    });
});

// Resume List Scrolling
const resumeLists = document.querySelectorAll('.resume-list');
resumeLists.forEach(list => {
    // Optional: Add any scroll-related functionality here
});
