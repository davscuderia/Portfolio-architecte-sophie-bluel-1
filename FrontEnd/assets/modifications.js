// Fonction pour supprimer un travail de l'API et du DOM
async function deleteWork(id, figureElement) {
    try {
        // Appel à l'API pour supprimer le travail
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                
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
    //appel à l'api
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        });
    
    response.ok ? console.log('Formulaire envoyé avec succès') : console.log('Erreur lors de l\'envoi :', response.status) ;
    if (response.ok) {
        const newProject = await response.json();
        addProjectToGalleries(newProject);
        console.log('Nouveau projet ajouté avec succès');
        closeActiveModal();
    } 
    } catch (error) {
        console.error('Erreur réseau :', error);
    }

});

// Fonction pour afficher l'aperçu de l'image
function displayImagePreview(file) { //prend un fichier en paramètre
    const reader = new FileReader(); //crée un nouvel objet pour lire le contenu
    reader.onload = e => {
        document.getElementById('image-preview').innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 200px;">`;
    };
    //lecture du fichier et conversion pour être utilisé comme source
    reader.readAsDataURL(file);
}
// Écouteur d'événements pour l'input file
document.getElementById('file-upload').addEventListener('change', event => {
    const file = event.target.files[0]; //récupère le 1er fichier
    if (file) displayImagePreview(file);
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

// Fonction pour ajouter un projet à la galerie principale et à la modale
function addProjectToGalleries(project) {
    console.log('Ajout du projet aux galeries:', project);

    // Ajouter à la galerie principale
    const mainGallery = document.querySelector('.gallery');
    const figureMain = document.createElement('figure');
    figureMain.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}">
        <figcaption>${project.title}</figcaption>
    `;
    mainGallery.appendChild(figureMain);
    console.log('Projet ajouté à la galerie principale');

    // Ajouter à la galerie modale
    const modalGallery = document.querySelector('.gallery-modale');
    const figureModal = document.createElement('figure');
    figureModal.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}">
        <button class="btn-trash"><i class="fa-solid fa-trash-can"></i></button>
    `;
    modalGallery.appendChild(figureModal);
    console.log('Projet ajouté à la galerie modale');

    // Ajouter au tableau works
    works.push(project);
    console.log('Projet ajouté au tableau works');
}

//gestion du clic sur le bouton "Retour"
btnRetour.addEventListener('click', function(event) {
    console.log('Clic sur le bouton Retour');
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    toggleModals(); // Basculer entre les modales
});
console.log('Écouteur ajouté au bouton Retour');

