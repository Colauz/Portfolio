function setupNavLinks() {
    const navLinks = document.querySelectorAll('nav ul li a, .footer-links a, .buttons a');
    const offset = 80;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a, .buttons a');
    const offset = 80;

    function changeLinkState() {
        let index = sections.length;

        while (--index && window.scrollY + offset < sections[index].offsetTop) {}

        // Log to check the current index and section
        console.log('Current index:', index);
        if (sections[index]) {
            console.log('Current section:', sections[index].id);
        } else {
            console.log('Section not found for index:', index);
        }

        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    changeLinkState();
    window.addEventListener('scroll', changeLinkState);
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavLinks();
    setupScrollSpy();
});

function loadTemplate(url, placeholderId, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error('Error fetching template:', error));
}

function initializePage() {
    loadTemplate('navbar.html', 'navbar-placeholder', () => {
        setupNavLinks(); 
        setupScrollSpy(); 
    });
    loadTemplate('about.html', 'about-placeholder', () => {
        initializeTypingAnimation();
        setupNavLinks(); 
        setupScrollSpy(); 
    });
    
    loadTemplate('skills.html', 'skills-placeholder');
    loadTemplate('education.html', 'education-placeholder');
    loadTemplate('enedis.html', 'enedis-placeholder');
    loadTemplate('contact.html', 'contact-placeholder');
    loadTemplate('footer.html', 'footer-placeholder', () => {
        setupNavLinks(); 
        setupScrollSpy(); 
    });
}

function initializeTypingAnimation() {
    const texts = ["Développeur Python", "Alternant chez Enedis", "Étudiant en BUT SD", "Web Développeur"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        document.querySelector('.dynamic-text').textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(() => {
                document.querySelector('.dynamic-text').textContent = '';
                type();
            }, 2000);
        } else {
            setTimeout(type, 100);
        }
    }());
}

document.addEventListener('DOMContentLoaded', initializePage);
