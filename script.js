// Основные функции для интерактивности сайта

// Показываем текущее время в футере
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = `Время: ${timeString}`;
    }
}

// Функция для кнопки CTA
function showAlert() {
    alert('Привет! Это работает! 🎉\n\nСпасибо за посещение моего сайта!');
}

// Обработка формы контактов
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Проверяем заполненность полей
    if (!name || !email || !message) {
        alert('Пожалуйста, заполните все поля формы!');
        return;
    }
    
    // Имитируем отправку формы
    alert(`Спасибо, ${name}!\n\nВаше сообщение было "отправлено":\n\nEmail: ${email}\nСообщение: ${message}\n\n(Это демо-версия, реальная отправка не происходит)`);
    
    // Очищаем форму
    event.target.reset();
}

// Плавная прокрутка для навигационных ссылок
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимация появления элементов при прокрутке
function initScrollAnimations() {
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
    
    // Наблюдаем за элементами с анимацией
    const animatedElements = document.querySelectorAll('.feature, .service');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Изменение цвета header при прокрутке
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Добавление эффекта печатания для заголовка
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

// Инициализация эффекта печатания для главного заголовка
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
}

// Счетчик для статистики (демо)
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 секунды
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Добавление случайных цветов к кнопкам при наведении
function initRandomColors() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const colors = [
                'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            ];
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            button.style.background = randomColor;
        });
        
        button.addEventListener('mouseleave', () => {
            // Возвращаем оригинальный цвет
            if (button.classList.contains('cta-button')) {
                button.style.background = '#ff6b6b';
            } else {
                button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        });
    });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Сайт загружен успешно!');
    
    // Обновляем время каждую секунду
    updateTime();
    setInterval(updateTime, 1000);
    
    // Инициализируем все функции
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderScrollEffect();
    initTypewriterEffect();
    initRandomColors();
    
    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Добавляем обработчик для кнопки CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', showAlert);
    }
    
    // Добавляем эффект параллакса для hero секции
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Произошла ошибка:', e.error);
});

// Функция для тестирования консоли
function testFunction() {
    console.log('✅ Тестовая функция работает!');
    return 'Функция выполнена успешно';
}

// Экспорт функций для использования в консоли браузера
window.testFunction = testFunction;
window.showAlert = showAlert;
