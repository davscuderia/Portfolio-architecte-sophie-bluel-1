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

// Fonction pour supprimer un travail de l'API et du DOM
async function deleteWork(id, figureElement) {
    try {
        // Appel à l'API pour supprimer le travail
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                // token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNjU5MzY4OCwiZXhwIjoxNzI2NjgwMDg4fQ.vUl0wFaFN_Ls1-Ej7PC1Wkvn3dsVY73anjwlQroD9kM'
            }
        });

        if (response.ok) {
            // Supprime l'élément de la modale
            figureElement.remove();
            
            //pour supprimer de la galerie
            const mainGalleryFigures = document.querySelectorAll('.gallery figure');
            const indexToRemove = works.findIndex(work => work.id === id);
                if (indexToRemove !== -1 && mainGalleryFigures[indexToRemove]) {
                mainGalleryFigures[indexToRemove].remove();
            }
                // Mettre à jour le tableau works
                works = works.filter(work => work.id !== id);
            
            console.log(`Le travail avec l'ID ${id} a été supprimé`);
        } else {
            console.error(`Erreur lors de la suppression du travail avec l'ID ${id}`);
        }
    } catch (error) {
        console.error('Erreur de connexion à l\'API', error);
    }
}