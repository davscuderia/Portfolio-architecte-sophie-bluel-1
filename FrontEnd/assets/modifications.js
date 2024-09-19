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

//Sélectionner le bouton "+ Ajouter photo" dans la deuxième modale
const btnAjouterPhoto = document.getElementById('btn-ajouter');
    // Ajouter un écouteur d'événements au bouton "+ Ajouter photo"
    btnAjouterPhoto.addEventListener('click', function() {
    console.log('Bouton + Ajouter photo cliqué');
    fileUpload.click(); // Déclenche le clic sur l'input file caché
    });

// Vérifier si l'écouteur d'événements est bien ajouté
console.log('Écouteur d\'événements ajouté au bouton + Ajouter photo');
// Sélectionner le formulaire et le bouton de soumission
const form = document.getElementById('ajouter-photo');
//nouveau code
// Charger les catégories au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const categories = await (await fetch('http://localhost:5678/api/categories')).json();
        document.getElementById('categories').innerHTML = categories
            .map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    } catch (error) {
        console.error('Erreur chargement catégories:', error);
    }
});

// Gérer la soumission du formulaire
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const file = document.getElementById('file-upload').files[0];
    const title = document.getElementById('titre').value;
    const categoryId = document.getElementById('categories').value;

    // Vérification des champs
    if (!file || !title || !categoryId) return console.log('Tous les champs doivent être remplis');
    
    // Validation du fichier
    if (!validateFile(file)) return;

    // Créer un FormData et envoyer
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', categoryId);

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        });
        response.ok ? console.log('Formulaire envoyé avec succès') : console.log('Erreur lors de l\'envoi :', response.status);
    } catch (error) {
        console.error('Erreur réseau :', error);
    }
});

// Validation du fichier
function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 4 * 1024 * 1024; // 4 Mo

    if (!validTypes.includes(file.type)) return console.log('Type de fichier non valide'), false;
    if (file.size > maxSize) return console.log('Fichier trop volumineux'), false;

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

