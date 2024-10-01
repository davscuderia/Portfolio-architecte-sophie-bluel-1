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
            figureElement.remove();   
            //pour supprimer de la galerie
            const mainGalleryFigures = document.querySelectorAll('.gallery figure');
            const indexToRemove = works.findIndex(work => work.id === id);
                if (indexToRemove !== -1 && mainGalleryFigures[indexToRemove]) {
                mainGalleryFigures[indexToRemove].remove();
                }
                // Mettre à jour le tableau works
                works = works.filter(work => work.id !== id);
        } else {
            console.error(`Erreur lors de la suppression du travail avec l'ID ${id}`);
        }
    } catch (error) {
        console.error('Erreur de connexion à l\'API', error);
    }
}

const fileUpload = document.getElementById('file-upload');
//Sélectionner le bouton "+ Ajouter photo" dans la deuxième modale
const btnAjouterPhoto = document.getElementById('btn-ajouter');
    btnAjouterPhoto.addEventListener('click', function() {
    fileUpload.click(); //sur l'input file caché   
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const categories = await (await fetch('http://localhost:5678/api/categories')).json();
        document.getElementById('categories').innerHTML = categories
            .map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    } catch (error) {
        console.error('Erreur chargement catégories:', error);
    }
});

function addProjectToGalleries(project) {
    const mainGallery = document.querySelector('.gallery');
    const figureMain = document.createElement('figure');
    figureMain.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}">
        <figcaption>${project.title}</figcaption>
    `;
    mainGallery.appendChild(figureMain);
    // Ajouter à la galerie modale
    const modalGallery = document.querySelector('.gallery-modale');
    const figureModal = document.createElement('figure');
    figureModal.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}">
        <button class="btn-trash"><i class="fa-solid fa-trash-can"></i></button>`;
    modalGallery.appendChild(figureModal);
    // Ajouter au tableau works
    works.push(project);
}

function showAlert(message, isError = false) {
    const alertElement = document.createElement('div');
    alertElement.textContent = message;
    alertElement.classList.add('alert');
    alertElement.classList.add(isError ? 'alert-error' : 'alert-success');
    document.querySelector('.modal-content').prepend(alertElement);
    setTimeout(() => alertElement.remove(), 3000);
}

// Sélectionner le formulaire et le bouton de soumission
const form = document.getElementById('ajouter-photo');
// Gérer la soumission du formulaire
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const file = document.getElementById('file-upload').files[0];
    const title = document.getElementById('titre').value;
    const categoryId = document.getElementById('categories').value;

    // Vérification des champs
    if (!file || !title || !categoryId) {
    let errorMessage = 'Veuillez remplir tous les champs.';
        if (!file) {
        errorMessage += 'Veuillez sélectionner une image.';
        }
        if (!title) {
        errorMessage += 'Veuillez sélectionner un titre.';
        }
        showAlert(errorMessage,true);
        return;
    }  
    if (!validateFile(file)) {
        showAlert('Le fichier sélectionné n\'est pas valide', true);
        return;
    }
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
            if (response.ok) {
            const newProject = await response.json();
            addProjectToGalleries(newProject); //maj galerie
            form.reset();         
            closeActiveModal();
            resetFormAndPreview();
            showAlert('Projet ajouté avec succès !');
            } else {
            showAlert('Erreur lors de l\'ajout du projet', true);
            }
        } catch (error) {
        showAlert('Erreur réseau, veuillez réessayer', true);
        }
});

function resetFormAndPreview() {
    // Réinitialiser le formulaire
    document.getElementById('ajouter-photo').reset();
    // Vider l'aperçu de l'image
    document.getElementById('image-preview').innerHTML = '';
    togglePreview(false); // Cache l'aperçu et réaffiche les autres éléments
}

//affichage de l'aperçu
function togglePreview(show) {
    const preview = document.getElementById('image-preview');
    const existingElements = document.querySelectorAll('.cadre-apercu');

    if (show) {
        preview.style.display = 'flex';
        existingElements.forEach(el => el.style.display = 'none');
    } else {
        preview.style.display = 'none';
        existingElements.forEach(el => el.style.display = '');
    }
}

function displayImagePreview(file) {
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('image-preview').innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 169px;">`;
        togglePreview(true);
    };
    //lecture du fichier et conversion pour être utilisé comme source
    reader.readAsDataURL(file);
}

document.getElementById('file-upload').addEventListener('change', event => {
    const file = event.target.files[0]; //récupère le 1er fichier
    if (file) {
        if (validateFile(file)) {
            displayImagePreview(file);
        } else {
            // l'erreur est gérée dans validateFile
            event.target.value = '';
        }
    }    
});

function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 4 * 1024 * 1024; // 4 Mo
    if (!validTypes.includes(file.type)) {
        showAlert('Type de fichier non valide. Veuillez sélectionner une image jpeg ou png.', true);
        return false;
    }    
    if (file.size > maxSize) {
        showAlert('Fichier trop volumineux. La taille maximale est de 4 Mo.', true);
        return false;
    }
    return true;
}

const btnRetour = document.getElementById('retour');
btnRetour.addEventListener('click', function(event) {
    event.preventDefault();
    toggleModals(); // Basculer entre les modales
});

