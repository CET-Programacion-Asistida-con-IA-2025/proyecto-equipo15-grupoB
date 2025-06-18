// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll suave
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

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(108, 92, 231, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animación de las tarjetas al hacer scroll
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

// Observar todas las tarjetas
document.querySelectorAll('.tool-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Contador animado para estadísticas
const animateCounter = (element, target) => {
    let current = 0;
    const isPercentage = target > 50 && target < 100;
    const isRange = element.textContent.includes('-');
    
    if (isRange) {
        element.textContent = target;
        return;
    }
    
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        const displayValue = Math.floor(current);
        element.textContent = displayValue + (isPercentage ? '%' : '');
        
        if (current >= target) {
            element.textContent = target + (isPercentage ? '%' : '');
            clearInterval(timer);
        }
    }, 20);
};

// Activar contadores cuando aparecen en pantalla
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const originalText = statNumber.textContent;
            
            // Extraer número del texto
            let targetValue;
            if (originalText.includes('-')) {
                targetValue = originalText; // Para rangos como "12-18"
            } else {
                targetValue = parseInt(originalText);
            }
            
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Efecto parallax sutil en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Preloader simple (opcional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Función para detectar cuando elementos entran en el viewport
const fadeInElements = document.querySelectorAll('.section-title, .section-subtitle');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease';
    fadeInObserver.observe(element);
});

// Añadir interactividad adicional a las tarjetas
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Función para manejar errores de carga de recursos
window.addEventListener('error', (e) => {
    console.warn('Error loading resource:', e.target.src || e.target.href);
});

// Agregar clase de animación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-loaded');
    
    // Pequeño delay para asegurar que todo esté cargado
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate-in');
        }
    }, 100);
});