document.addEventListener('DOMContentLoaded', function() {

    // 1. Initialisation de la coloration syntaxique (si présent sur la page)
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // 2. Gestion du changement de langue
    const langLinks = document.querySelectorAll('.lang-link');
    // Récupère la langue sauvegardée ou définit 'fr' par défaut
    const savedLang = localStorage.getItem('portfolioLang') || 'fr';

    // Fonction principale de changement de langue
    function changeLanguage(lang) {
        // Mise à jour visuelle des liens de langue (classe 'active')
        langLinks.forEach(link => {
            // Si le lien correspond à la langue choisie, on ajoute 'active', sinon on l'enlève
            link.classList.toggle('active', link.dataset.lang === lang);
        });

        // Sélection de tous les éléments ayant des attributs de traduction
        const langElements = document.querySelectorAll('[data-fr], [data-en]');
        
        langElements.forEach(element => {
            // Récupération du texte correspondant à la langue choisie
            const text = element.getAttribute(`data-${lang}`);

            // Si un texte existe pour cette langue
            if (text !== null) {
                // Cas particuliers pour certains types de balises
                if (element.tagName === 'TITLE') {
                    document.title = text;
                } 
                else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                     if (element.hasAttribute('placeholder')) {
                        element.setAttribute('placeholder', text);
                     }
                     // Note : Pour la valeur d'un input, ce serait element.value = text; 
                     // Mais c'est rarement utilisé pour de la traduction statique.
                }
                else {
                    // Cas général : on utilise innerHTML pour interpréter les balises HTML (<strong>, <em>, etc.)
                    // incluses dans les attributs data-fr/data-en.
                    element.innerHTML = text;
                }
            }
        });

        // Mise à jour de l'attribut 'lang' de la balise <html> pour l'accessibilité et le CSS
        document.documentElement.lang = lang;

        // Gestion des blocs de contenu spécifiques à une langue (ex: .lang-specific.fr)
        document.querySelectorAll('.lang-specific').forEach(el => {
            if (el.classList.contains(lang)) {
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        });

        // Sauvegarde de la préférence de langue de l'utilisateur
        localStorage.setItem('portfolioLang', lang);
    }

    // Ajout des écouteurs d'événements sur les boutons de changement de langue
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le comportement par défaut du lien (#)
            const lang = this.dataset.lang; // Récupère la langue du bouton cliqué
            changeLanguage(lang);
        });
    });

    // Application initiale de la langue au chargement de la page
    changeLanguage(savedLang);

    // 3. Navigation fluide pour les liens d'ancrage (ex: href="#contact")
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Vérifie si le lien est une ancre valide (différent de juste "#")
            if (targetId !== '#' && targetId.startsWith('#')) {
                 e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Calcule la hauteur de la navbar pour ne pas cacher le début de la section
                    const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                    // Défilement fluide vers la section cible avec un petit décalage
                    window.scrollTo({
                        top: targetSection.offsetTop - navbarHeight - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Gestion dynamique du téléchargement de CV en fonction de la langue active
    const cvDownloadLink = document.getElementById('cv-download-link');
    if (cvDownloadLink) {
        cvDownloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Récupère la langue actuelle
            const currentLang = localStorage.getItem('portfolioLang') || 'fr';
            let cvUrl = '';
            // Définit l'URL du CV en fonction de la langue
            if (currentLang === 'fr') {
                cvUrl = 'assets/pdf/CV_Laurian_Jamin_FR.pdf';
            } else {
                cvUrl = 'assets/pdf/CV_Laurian_Jamin_EN.pdf';
            }
            // Ouvre le bon CV dans un nouvel onglet
            window.open(cvUrl, '_blank');
        });
    }
});