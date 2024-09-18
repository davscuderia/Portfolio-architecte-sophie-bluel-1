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

//Fonction pour ajouter les écouteurs d'événements aux boutons de suppression
function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.btn-trash');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            console.log("Clic sur le bouton de suppression détecté");
            const workId = this.dataset.id;
            console.log("Bouton de suppression cliqué pour le projet:", workId);
            deleteWork(workId);
        });
    });
    console.log("Écouteurs de suppression ajoutés");
}

// Fonction pour supprimer un projet via l'API
async function deleteWork(workId) {
    console.log('Tentative de suppression du projet:', workId);
// Dans la fonction deleteWork, avant la requête fetch
const token = localStorage.getItem('token');
console.log("Token d'authentification:", token);
if (!token) {
    console.error("Pas de token d'authentification trouvé");
    return;
}
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                // token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNjU5MzY4OCwiZXhwIjoxNzI2NjgwMDg4fQ.vUl0wFaFN_Ls1-Ej7PC1Wkvn3dsVY73anjwlQroD9kM'
            }
        });

        if (response.ok) {
            console.log("Projet supprimé avec succès:", workId);
            // Mettre à jour le tableau works
            works = works.filter(work => work.id != workId);
            // Mettre à jour l'affichage
            updateDisplay();
        } else {
            console.error("Erreur lors de la suppression:", response.status);
        }
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
    }
}

function updateDisplay() {
    console.log("Mise à jour de l'affichage");
    // Mettre à jour la galerie principale
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = '';
    works.forEach(work => {
        const figure = document.createElement("figure");
        let img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = work.title;
        figure.appendChild(figcaption);
        galleryContainer.appendChild(figure);
    });

    // Mettre à jour la galerie de la modale
    galerie();

    console.log("Affichage mis à jour");
}
