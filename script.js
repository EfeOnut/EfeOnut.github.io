document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Language Handling
    const langSwitchBtn = document.getElementById('lang-switch');
    let currentLang = localStorage.getItem('site-lang') || 'tr';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site-lang', lang);
        document.documentElement.lang = lang;

        // Update Text
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Update Button Text
        if (langSwitchBtn) {
            langSwitchBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
        }

        // Update Title and Meta Description
        const path = window.location.pathname;
        const page = path.includes('products.html') ? 'products' : 'home';

        if (translations[lang][`meta.title.${page}`]) {
            document.title = translations[lang][`meta.title.${page}`];
        }

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && translations[lang][`meta.desc.${page}`]) {
            metaDesc.setAttribute('content', translations[lang][`meta.desc.${page}`]);
        }
    }

    // Initialize Language
    setLanguage(currentLang);

    // Event Listener
    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', () => {
            const newLang = currentLang === 'tr' ? 'en' : 'tr';
            setLanguage(newLang);
        });
    }

    // Gallery / Album Logic
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        const productImages = [
            "WhatsApp Image 2025-12-09 at 17.21.38 (1).jpeg",
            "WhatsApp Image 2025-12-09 at 17.21.38 (2).jpeg",
            "WhatsApp Image 2025-12-09 at 17.21.39 (1).jpeg",
            "WhatsApp Image 2025-12-09 at 17.21.39 (2).jpeg",
            "WhatsApp Image 2025-12-09 at 17.21.39.jpeg",
            "WhatsApp Image 2025-12-09 at 17.22.12.jpeg",
            "WhatsApp Image 2025-12-09 at 17.22.31.jpeg",
            "WhatsApp Image 2025-12-09 at 17.23.44.jpeg",
            "WhatsApp Image 2025-12-09 at 17.24.27.jpeg",
            "WhatsApp Image 2025-12-09 at 17.25.14.jpeg",
            "WhatsApp Image 2025-12-09 at 17.32.38.jpeg",
            "WhatsApp Image 2025-12-09 at 17.32.39.jpeg",
            "WhatsApp Image 2025-12-09 at 17.32.40.jpeg",
            "WhatsApp Image 2025-12-09 at 17.32.42.jpeg",
            "WhatsApp Image 2025-12-09 at 17.32.43.jpeg",
            "WhatsApp Image 2025-12-19 at 17.32.39.jpeg",
            "WhatsApp Image.jpeg",
            "asdfasdf.jpeg",
            "dfghdghdgh.jpeg",
            "ertyetye.jpeg",
            "lşilşi.jpeg",
            "qwerqwe.jpeg",
            "retyertyety.jpeg",
            "sdfgsdfsfg.jpeg",
            "tyuıtyutyıu.jpeg",
            "werqweqrr.jpeg",
            "wertwertwrt.jpeg"
        ];

        // Create Lightbox Elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-close">&times;</div>
            <div class="lightbox-nav lightbox-prev">&#10094;</div>
            <div class="lightbox-nav lightbox-next">&#10095;</div>
            <div class="lightbox-content">
                <img src="" alt="KZY Ege Marine">
            </div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            // Use encodeURIComponent to handle spaces and special chars in filenames
            lightboxImg.src = `${encodeURIComponent(productImages[index])}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % productImages.length;
            // Fade out effect
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = `${encodeURIComponent(productImages[currentIndex])}`;
                lightboxImg.style.opacity = '1';
            }, 200);
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + productImages.length) % productImages.length;
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = `${encodeURIComponent(productImages[currentIndex])}`;
                lightboxImg.style.opacity = '1';
            }, 200);
        }

        // Event Listeners for Lightbox
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

        lightbox.addEventListener('click', (e) => {
            // Close if clicking on background or the content wrapper (but not the image itself if we wanted, but here clicking anywhere outside nav usually closes)
            // But let's be safe: content wrapper is the flex container.
            if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
                closeLightbox();
            }
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });

        // Loop through images and add them to the grid
        productImages.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            // encode URI for the src attribute
            const imageUrl = `${encodeURIComponent(image)}`;

            item.innerHTML = `
                <img src="${imageUrl}" alt="KZY Ege Marine" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fa-solid fa-magnifying-glass-plus gallery-icon"></i>
                </div>
            `;

            // Add click event to open lightbox
            item.addEventListener('click', () => openLightbox(index));

            galleryContainer.appendChild(item);
        });
    }

});
