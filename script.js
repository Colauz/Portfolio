// Sélectionnez tous les liens dans la barre de navigation
const navLinks = document.querySelectorAll('nav ul li a');

// Pour chaque lien, ajoutez un gestionnaire d'événements de clic
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien

        // Récupérez l'identifiant de la section cible à partir de l'attribut href du lien
        const targetId = link.getAttribute('href').substring(1);

        // Sélectionnez la section cible
        const targetSection = document.getElementById(targetId);

        // Faites défiler doucement vers la section cible
        targetSection.scrollIntoView({
            behavior: 'smooth' // Faites défiler en douceur
        });
    });
});
