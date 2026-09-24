// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.transform = 'translateY(-100%)';
        setTimeout(() => preloader.remove(), 1000);
        
        // Trigger hero animations after preloader
        document.querySelectorAll('[data-fade-in]').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        });
    }, 2000); // Wait for loading bar
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Magnetic Buttons Hover Effect
const magneticBtns = document.querySelectorAll('.btn-magnetic, .hover-link');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });

    btn.addEventListener('mouseout', function(e) {
        btn.style.transform = 'translate(0px, 0px)';
    });

    // Expand cursor on hover
    btn.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(233, 30, 99, 0.1)';
    });

    btn.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// Scroll Reveal via Intersection Observer
const revealSections = document.querySelectorAll('.reveal-section');
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealSections.forEach(section => {
    revealOnScroll.observe(section);
});

// Parallax Effect
document.addEventListener("scroll", function() {
    const scrollY = window.scrollY;
    document.querySelectorAll('.parallax-box').forEach(box => {
        const speed = box.getAttribute('data-speed');
        box.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Accordion Menu Interaction
const mCards = document.querySelectorAll('.m-card');
mCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        mCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        // Close others
        faqItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active');
    });
});
