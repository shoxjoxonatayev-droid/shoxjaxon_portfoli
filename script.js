// ====== LOADER ======
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader');
    const loaderName = document.querySelector('.loader-name');
    
    // Type name effect
    const name = "SHOXJAXON";
    let i = 0;
    
    function typeName() {
        if (i < name.length) {
            loaderName.textContent += name.charAt(i);
            i++;
            setTimeout(typeName, 100);
        } else {
            // Start loading animation
            startLoading();
        }
    }
    
    function startLoading() {
        const progressBar = document.createElement('div');
        progressBar.className = 'loader-progress-bar';
        progressBar.style.cssText = `
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #2563EB, #06B6D4);
            border-radius: 2px;
            transition: width 2s ease;
        `;
        
        const loaderContent = document.querySelector('.loader-content');
        loaderContent.appendChild(progressBar);
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.visibility = 'hidden';
                    document.body.style.overflow = 'auto';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        initPortfolio();
                    }, 500);
                }, 500);
            }
        }, 100);
    }
    
    // Start typing effect
    setTimeout(typeName, 500);
});

// ====== INITIALIZE PORTFOLIO ======
function initPortfolio() {
    console.log('%c🚀 SHOXJAXON Portfolio Loaded!', 'color: #2563EB; font-size: 18px; font-weight: bold;');
    console.log('%cKelajakning yorqin dasturchisi bo\'lish yo\'lida! 💻', 'color: #06B6D4');
    
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initContactForm();
    initProjectCards();
    initSkillBars();
    initBackToTop();
    initTypingEffect();
    initParticles();
    
    // Update login button status
    updateLoginButton();
    updateFooterLoginButton();
    
    // Add welcome message with particles
    setTimeout(() => {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                showNotification(`Xush kelibsiz, ${user.name}! 👨‍💻`, 'success');
            } catch (e) {
                showNotification('Assalomu alaykum! Portfolio saytimga xush kelibsiz! 👨‍💻', 'success');
            }
        } else {
            showNotification('Assalomu alaykum! Portfolio saytimga xush kelibsiz! 👨‍💻', 'success');
        }
        createParticles(100);
    }, 800);
}

// ====== SIMPLE LOGIN BUTTON MANAGEMENT ======
function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;
    
    // localStorage dan foydalanuvchi ma'lumotlarini olish
    const userData = localStorage.getItem('currentUser');
    
    if (userData) {
        try {
            const user = JSON.parse(userData);
            
            // Agar foydalanuvchi mavjud bo'lsa, uning ismini ko'rsatish
            if (user && user.name) {
                // Login tugmasini o'zgartirish
                loginBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${user.name}`;
                loginBtn.href = "#";
                
                // Eski event listenerlarni tozalash
                const newLoginBtn = loginBtn.cloneNode(true);
                loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
                
                // Yangi event listener qo'shish
                newLoginBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Foydalanuvchini chiqarish
                    localStorage.removeItem('currentUser');
                    sessionStorage.removeItem('currentUser');
                    
                    // Tugmani qayta tiklash
                    updateLoginButton();
                    updateFooterLoginButton();
                    
                    // Bildirishnoma ko'rsatish
                    showNotification("Tizimdan chiqildi. Yana kiring!", "success");
                });
            }
        } catch (e) {
            console.error("Foydalanuvchi ma'lumotlarini o'qishda xatolik:", e);
        }
    } else {
        // Foydalanuvchi kirish qilmagan
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Kirish';
        loginBtn.href = "login.html?demo=true";
        
        // Eski event listenerlarni tozalash
        const newLoginBtn = loginBtn.cloneNode(true);
        loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
    }
}

// ====== FOOTER LOGIN BUTTON ======
function updateFooterLoginButton() {
    const footerLoginBtn = document.getElementById('footerLoginBtn');
    const footerUserInfo = document.getElementById('footerUserInfo');
    const footerUserName = document.getElementById('footerUserName');
    
    // localStorage dan foydalanuvchi ma'lumotlarini olish
    const userData = localStorage.getItem('currentUser');
    
    if (userData) {
        try {
            const user = JSON.parse(userData);
            
            // Agar foydalanuvchi mavjud bo'lsa
            if (user && user.name) {
                // Footer login tugmasini yashirish
                if (footerLoginBtn) {
                    footerLoginBtn.style.display = 'none';
                }
                
                // Foydalanuvchi ma'lumotlarini ko'rsatish
                if (footerUserInfo) {
                    footerUserInfo.style.display = 'block';
                }
                
                // Foydalanuvchi ismini ko'rsatish
                if (footerUserName) {
                    footerUserName.textContent = user.name;
                    
                    // Chiqish tugmasi uchun event listener
                    const logoutBtn = footerUserName.nextElementSibling;
                    if (logoutBtn && logoutBtn.onclick) {
                        logoutBtn.onclick = function(e) {
                            e.preventDefault();
                            localStorage.removeItem('currentUser');
                            sessionStorage.removeItem('currentUser');
                            updateLoginButton();
                            updateFooterLoginButton();
                            showNotification("Tizimdan chiqildi!", "success");
                        };
                    }
                }
            }
        } catch (e) {
            console.error("Foydalanuvchi ma'lumotlarini o'qishda xatolik:", e);
        }
    } else {
        // Foydalanuvchi kirish qilmagan
        if (footerLoginBtn) {
            footerLoginBtn.style.display = 'inline-block';
        }
        
        if (footerUserInfo) {
            footerUserInfo.style.display = 'none';
        }
    }
}

// ====== TYPING EFFECT ======
function initTypingEffect() {
    const texts = [
        "Full-Stack Dasturchi",
        "Web Texnologiyalar Mutaxassisi",
        "Innovatsion Yechimlar Yaratuvchisi",
        "Kelajak Dasturchisi"
    ];
    
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// ====== NAVBAR FUNCTIONALITY ======
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hamburger menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Active nav link on scroll
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
}

// ====== SCROLL ANIMATIONS ======
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .stat-card, .info-card, .contact-card');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
                
                if (element.classList.contains('stat-card')) {
                    const delay = element.getAttribute('data-delay') || '0s';
                    element.style.animationDelay = delay;
                }
            }
        });
    }
    
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    
    // Parallax effect for hero
    const heroImage = document.querySelector('.hero-image-img');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.03}px) rotate(${scrolled * 0.003}deg)`;
        });
    }
}

// ====== CONTACT FORM ======
function initContactForm() {
    const messageForm = document.getElementById('messageForm');
    
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showNotification('Iltimos, barcha maydonlarni to\'ldiring! 📝', 'error');
                shakeElement(messageForm);
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Iltimos, to\'g\'ri email manzil kiriting! ✉️', 'error');
                shakeElement(document.getElementById('email'));
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
            submitBtn.disabled = true;
            
            // Add typing dots animation
            const dots = document.createElement('span');
            dots.className = 'typing-dots';
            submitBtn.appendChild(dots);
            
            let dotCount = 0;
            const dotInterval = setInterval(() => {
                dots.textContent = '.'.repeat(dotCount % 4);
                dotCount++;
            }, 300);
            
            setTimeout(() => {
                clearInterval(dotInterval);
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Yuborildi!';
                submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';
                
                showNotification(`Rahmat, ${name}! Xabaringiz qabul qilindi. Tez orada javob beraman! 🚀`, 'success');
                
                const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
                messages.push({
                    name,
                    email,
                    subject,
                    message,
                    date: new Date().toISOString(),
                    read: false
                });
                localStorage.setItem('portfolioMessages', JSON.stringify(messages));
                
                setTimeout(() => {
                    messageForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    
                    // Create success particles
                    createSuccessParticles(submitBtn);
                }, 2000);
                
            }, 2000);
        });
    }
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// ====== PROJECT CARDS ======
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(37, 99, 235, 0.15)';
            
            const glow = document.createElement('div');
            glow.className = 'card-glow';
            glow.style.cssText = `
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
                background: radial-gradient(circle at center, rgba(37, 99, 235, 0.1), transparent 70%);
                z-index: -1;
                border-radius: inherit;
            `;
            this.appendChild(glow);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            
            const glow = this.querySelector('.card-glow');
            if (glow) glow.remove();
        });
        
        const projectBtn = card.querySelector('.project-btn');
        if (projectBtn) {
            projectBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                createRippleEffect(e, this);
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ochilmoqda...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    // Show loading notification
                    const projectTitle = card.querySelector('.project-title').textContent;
                    showNotification(`${projectTitle} loyihasi ochilmoqda... ⏳`, 'warning');
                }, 1500);
            });
        }
    });
}

// ====== SKILL BARS ======
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percent = bar.parentElement.nextElementSibling?.textContent || '0%';
            const width = parseInt(percent);
            
            if (isElementInViewport(bar)) {
                bar.style.width = `${width}%`;
            }
        });
    }
    
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
}

// ====== BACK TO TOP BUTTON ======
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            backToTop.style.transform = 'scale(0.9)';
            setTimeout(() => {
                backToTop.style.transform = '';
            }, 300);
        });
    }
}

// ====== PARTICLES EFFECT ======
function initParticles() {
    const particlesContainer = document.querySelector('.hero') || document.body;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #2563EB, #06B6D4);
            border-radius: 50%;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 1;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createParticle(), i * 100);
    }
    
    // Continuously create particles
    setInterval(createParticle, 3000);
}

function createParticles(count) {
    const container = document.querySelector('.hero') || document.body;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 3;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #2563EB, #06B6D4, #8B5CF6);
            border-radius: 50%;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 9999;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = (i / 30) * Math.PI * 2;
        const distance = 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const size = Math.random() * 4 + 2;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #10B981, #34D399);
            border-radius: 50%;
            top: ${centerY}px;
            left: ${centerX}px;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// ====== UTILITY FUNCTIONS ======
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// ====== MAP FUNCTION ======
function openMap() {
    showNotification('Xiva xaritasi ochilmoqda... 🗺️', 'success');
    setTimeout(() => {
        window.open('https://maps.google.com/?q=Khiva,+Uzbekistan&t=k', '_blank');
    }, 1000);
}

// ====== UTILITY FUNCTIONS ======
// ... mavjud kodlar ...

// ====== CURRENT YEAR ======
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        if (el) el.textContent = currentYear;
    });
});

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-group.focused i {
        transform: scale(1.1) translateY(-50%);
        color: #1D4ED8;
    }
    
    .form-group textarea.focused + i {
        transform: scale(1.1);
    }
    
    .typing-dots {
        margin-left: 5px;
    }
`;
document.head.appendChild(style);

// ====== LOYIHA DEMO FUNKSIYASI ======
function showProjectDemo(projectNumber) {
    console.log("Loyiha demo bosildi:", projectNumber);
    
    // Fayl nomlari
    const projectFiles = [
        "project1.html",
        "project2.html", 
        "project3.html",
        "project4.html",
        "project5.html"  // 5-raqamli loyiha
    ];
    
    // Raqamni tekshirish
    if (projectNumber < 1 || projectNumber > projectFiles.length) {
        console.error("Noto'g'ri loyiha raqami:", projectNumber);
        alert("Loyiha topilmadi!");
        return;
    }
    
    // Fayl nomini olish
    const fileName = projectFiles[projectNumber - 1];
    console.log("Ochiladigan fayl:", fileName);
    
    // Sahifaga o'tish
    try {
        window.location.href = fileName;
    } catch (error) {
        console.error("O'tishda xatolik:", error);
        alert("Sahifaga o'tishda xatolik! Fayl nomini tekshiring: " + fileName);
    }
}