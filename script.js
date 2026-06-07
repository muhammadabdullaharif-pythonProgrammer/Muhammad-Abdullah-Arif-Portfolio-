// ==================== DOM ELEMENTS ====================
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// ==================== MOBILE MENU TOGGLE ====================
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

// ==================== ACTIVE PAGE FUNCTION ====================
const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    if (header) {
        header.classList.remove('active');
        setTimeout(() => {
            header.classList.add('active');
        }, 1100);
    }

    if (navLinks) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }

    if (barsBox) {
        barsBox.classList.remove('active');
        setTimeout(() => {
            barsBox.classList.add('active');
        }, 1100);
    }

    if (sections) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
    }

    if (menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
};

// ==================== NAVIGATION LINKS ====================
if (navLinks && sections) {
    navLinks.forEach((link, idx) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!link.classList.contains('active')) {
                activePage();

                setTimeout(() => {
                    link.classList.add('active');
                }, 100);

                setTimeout(() => {
                    if (sections[idx]) {
                        sections[idx].classList.add('active');
                    }
                }, 1100);
            }
        });
    });
}

// ==================== LOGO LINK ====================
if (logoLink && navLinks && sections) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!navLinks[0]?.classList.contains('active')) {
            activePage();

            setTimeout(() => {
                if (navLinks[0]) navLinks[0].classList.add('active');
            }, 100);

            setTimeout(() => {
                if (sections[0]) sections[0].classList.add('active');
            }, 1100);
        }
    });
}

// ==================== RESUME BUTTONS ====================
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

if (resumeBtns.length > 0 && resumeDetails.length > 0) {
    resumeBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            resumeBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Remove active class from all details
            resumeDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            
            // Add active class to corresponding detail
            if (resumeDetails[idx]) {
                resumeDetails[idx].classList.add('active');
            }
        });
    });
}

// ==================== PORTFOLIO NAVIGATION (REMOVED - Not needed for grid layout) ====================
// Note: The portfolio section uses a grid layout, not a carousel.
// The arrow navigation code has been removed as it's not applicable.

// ==================== ADDITIONAL FEATURE: Resume Detail Default State ====================
// Ensure the first resume detail is active if no other is active
if (resumeDetails.length > 0) {
    let hasActive = false;
    resumeDetails.forEach(detail => {
        if (detail.classList.contains('active')) {
            hasActive = true;
        }
    });
    
    if (!hasActive && resumeDetails[0]) {
        resumeDetails[0].classList.add('active');
    }
}

// ==================== ADDITIONAL FEATURE: Active Nav Link on Scroll ====================
// This highlights the nav link when scrolling to a section
const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 200;
    
    if (sections && navLinks) {
        sections.forEach((section, idx) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                if (navLinks[idx]) {
                    navLinks[idx].classList.add('active');
                }
            }
        });
    }
};

// Throttle scroll event for better performance
let scrollTimeout;
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(handleScrollSpy);
    });
}

// ==================== PAGE LOAD INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Set home section as active if no section is active
    let activeSectionFound = false;
    if (sections) {
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                activeSectionFound = true;
            }
        });
        
        if (!activeSectionFound && sections[0]) {
            sections[0].classList.add('active');
        }
    }
    
    // Set first nav link as active if none active
    let activeNavFound = false;
    if (navLinks) {
        navLinks.forEach(link => {
            if (link.classList.contains('active')) {
                activeNavFound = true;
            }
        });
        
        if (!activeNavFound && navLinks[0]) {
            navLinks[0].classList.add('active');
        }
    }
    
    // Set first resume button as active if none active
    let activeResumeFound = false;
    if (resumeBtns) {
        resumeBtns.forEach(btn => {
            if (btn.classList.contains('active')) {
                activeResumeFound = true;
            }
        });
        
        if (!activeResumeFound && resumeBtns[0]) {
            resumeBtns[0].classList.add('active');
        }
    }
    
    // Initialize resume details
    if (resumeDetails.length > 0) {
        let activeDetailFound = false;
        resumeDetails.forEach(detail => {
            if (detail.classList.contains('active')) {
                activeDetailFound = true;
            }
        });
        
        if (!activeDetailFound && resumeDetails[0]) {
            resumeDetails[0].classList.add('active');
        }
    }
});

// ==================== SMOOTH SCROLL FOR INTERNAL LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== PREVENT DEFAULT ON NON-LINK NAVIGATION ====================
// This prevents the page from scrolling to top when clicking nav links
if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href === '') {
                e.preventDefault();
            }
        });
    });
}

// ==================== RESPONSIVE MENU CLOSE ON LINK CLICK ====================
if (navLinks && navbar && menuIcon) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            }
        });
    });
}

// ==================== WINDOW RESIZE HANDLER ====================
let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) {
            if (navbar && menuIcon) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            }
        }
    }, 250);
});

console.log('JavaScript loaded successfully!');
