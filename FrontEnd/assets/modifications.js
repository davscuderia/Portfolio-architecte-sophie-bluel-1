// Sélectionner le bouton "+ Ajouter photo" dans la deuxième modale
const btnAjouterPhoto = document.getElementById('btn-ajouter');
    // Ajouter un écouteur d'événements au bouton "+ Ajouter photo"
    btnAjouterPhoto.addEventListener('click', function() {
    console.log('Bouton + Ajouter photo cliqué');
    fileUpload.click(); // Déclenche le clic sur l'input file caché
    });

// Vérifier si l'écouteur d'événements est bien ajouté
console.log('Écouteur d\'événements ajouté au bouton + Ajouter photo');
// Gère le changement de fichier
fileUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    console.log('Fichier sélectionné:', file);
    
    if (file) {
        // Vérifier le type et la taille du fichier
        if (validateFile(file)) {
            console.log('Fichier valide, prêt pour le téléchargement');
            // Ici, on peut ajouter le code pour afficher un aperçu de l'image
        } else {
            console.log('Fichier invalide');
            // Afficher un message d'erreur à l'utilisateur
        }
    }
});

// Fonction pour valider le fichier
function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 4 * 1024 * 1024; //= 4 Mo

    if (!validTypes.includes(file.type)) {
        console.log('Type de fichier non valide');
        return false;
    }

    if (file.size > maxSize) {
        console.log('Fichier trop volumineux');
        return false;
    }

    console.log('Fichier valide');
    return true;
}

//gestion du clic sur le bouton "Retour"
btnRetour.addEventListener('click', function(event) {
    console.log('Clic sur le bouton Retour');
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    toggleModals(); // Basculer entre les modales
});
console.log('Écouteur ajouté au bouton Retour');

