/**
 * Portfolio Scripts - Version Corrigée
 * Gestion des animations, du changement de langue, et des interactions
 * Correction : Utilisation de innerHTML pour les éléments contenant du HTML
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== CHANGEMENT DE LANGUE (avec gestion correcte du HTML) =====
    const langLinks = document.querySelectorAll('.lang-link');
    const langElements = document.querySelectorAll('[data-fr], [data-en]');

    function changeLanguage(lang) {
        // Mise à jour des liens de langue
        langLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.lang === lang);
        });

        // Mise à jour des textes avec gestion différente pour les éléments formulaires
        langElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);

            // Liste des éléments où on ne veut pas interpréter le HTML
            const textOnlyElements = ['INPUT', 'TEXTAREA', 'A', 'BUTTON'];

            if (textOnlyElements.includes(element.tagName)) {
                element.textContent = text;  // Pas d'interprétation HTML
            } else {
                element.innerHTML = text;  // Interprétation du HTML (pour <strong>, <em>, etc.)
            }
        });
    }

    // Événements de clic sur les liens de langue
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            changeLanguage(lang);
            localStorage.setItem('portfolioLang', lang); // Sauvegarde la langue
        });
    });

    // Chargement de la langue sauvegardée
    const savedLang = localStorage.getItem('portfolioLang') || 'fr';
    changeLanguage(savedLang);

    // ===== EFFET DE TYPING =====
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const textsFr = ["Développeur Logiciel", "Alternant @Enedis", "Étudiant Ingénieur"];
        const textsEn = ["Software Developer", "Apprentice @Enedis", "Engineering Student"];

        let texts = savedLang === 'fr' ? textsFr : textsEn;

        new Typed('.typed-text', {
            strings: texts,
            typeSpeed: 60,
            backSpeed: 30,
            loop: true,
            loopCount: Infinity,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }

    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // ===== NAVIGATION FLUIDE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Mise à jour de la navbar active
                    updateActiveNav(targetId);

                    // Fermeture du menu mobile si ouvert
                    if (menuToggle && menuToggle.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        navList.classList.remove('active');
                    }
                }
            }
        });
    });

    function updateActiveNav(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // ===== SCROLL ANIMATIONS =====
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const targetId = entry.target.getAttribute('id');
                updateActiveNav(`#${targetId}`);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ===== FORMULAIRE DE CONTACT =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const lang = localStorage.getItem('portfolioLang') || 'fr';
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simulation d'envoi (à remplacer par une vraie API)
            console.log('Message envoyé:', {name, email, message});

            alert(lang === 'fr' ?
                 'Message envoyé avec succès ! Je vous recontacte rapidement.' :
                 'Message sent successfully! I will get back to you soon.');

            this.reset();
        });
    }

    // ===== GESTION DES PDFs =====
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pdfUrl = this.getAttribute('href');
            const lang = localStorage.getItem('portfolioLang') || 'fr';
            const pdfName = this.getAttribute('data-fr') || this.getAttribute('data-en') || 'document';

            // Création d'un lien temporaire pour le téléchargement
            const tempLink = document.createElement('a');
            tempLink.href = pdfUrl;
            tempLink.download = `${pdfName}.pdf`;
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        });
    });

    // ===== GESTION DES TOOLTIPS POUR LES IMAGES =====
    document.querySelectorAll('.gallery-item').forEach(item => {
        const altText = item.getAttribute('data-fr') || item.getAttribute('data-en') || '';
        if (altText) {
            item.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'image-tooltip';
                tooltip.textContent = altText;
                item.appendChild(tooltip);

                // Positionnement du tooltip
                const rect = item.getBoundingClientRect();
                tooltip.style.left = `${rect.width / 2 - tooltip.offsetWidth / 2}px`;
                tooltip.style.top = `${rect.height - 40}px`;
            });

            item.addEventListener('mouseleave', () => {
                const tooltip = item.querySelector('.image-tooltip');
                if (tooltip) tooltip.remove();
            });
        }
    });

    // ===== ANIMATIONS SUPPLÉMENTAIRES =====
    // Animation pour les cartes de compétences
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        // Déclenchement de l'animation quand la section est visible
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    skillObserver.unobserve(card);
                }
            });
        }, {threshold: 0.1});

        skillObserver.observe(card);
    });
});
