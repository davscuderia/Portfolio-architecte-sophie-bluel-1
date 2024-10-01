
let modale = null
const openModale = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.classList.add('show')
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modale = target
    modale.addEventListener('click', closeModale)
    modale.querySelector('.js-modale-close').addEventListener('click', closeModale)
    modale.querySelector('.js-modale-stop').addEventListener('click', stopPropagation)
    // Ajoute les éléments de la galerie dans la modale
    addGalleryModale()
}

// récupère la réf du container de la modale
const modaleGalleryContainer = document.querySelector('.gallery-modale');
const addGalleryModale = function () {
    // Vide le conteneur avant d'ajouter des éléments (si déjà chargé)
    modaleGalleryContainer.innerHTML = '';
    
    // Réutilise le code de galerie
    works.forEach(work => {
       const figure = document.createElement("figure");
       let img = document.createElement("img");
       img.src = work.imageUrl;
       img.alt = work.title;
       figure.appendChild(img);
       
       // Ajout de l'icône de poubelle
       const trashIcon = document.createElement("button");
       trashIcon.classList.add("btn-trash");
       trashIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`; 
       figure.appendChild(trashIcon);
       trashIcon.addEventListener('click', async function () {
           // Appel de la fonction pour supprimer l'image
           await deleteWork(work.id, figure);
       });
       // Ajout de la figure au container de la modale
       modaleGalleryContainer.appendChild(figure);  
    });
}

const closeModale = function (e) {
    if (modale === null) return // stoppe si fermeture modale non existante
    e.preventDefault()
    modale.classList.remove('show')
    modale.setAttribute('aria-hidden', 'true') //doit-être masqué
    modale.removeAttribute('aria-modal')
    modale.removeEventListener('click', closeModale)
    modale.querySelector('.js-modale-close').removeEventListener('click', closeModale)
    modale.querySelector('.js-modale-stop').removeEventListener('click', stopPropagation)
    modale = null
}

//permet de contenir le click pour fermer
const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modale-btn').forEach(a => {
    a.addEventListener('click', openModale)   
})

//fermeture fenêtre au clavier
window.addEventListener('keydown', function (e) {
    if(e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
    }
})

const btnAjouter = document.getElementById('ajouter');
const deleteModal = document.getElementById('deletemodal');
const addModal = document.getElementById('addmodal');
const closeButtons = document.querySelectorAll('.js-modale-close');

// Fonction pour basculer entre les modales
function toggleModals() {
    const modal1Visible = window.getComputedStyle(deleteModal).display !== 'none'; 
    deleteModal.classList.toggle('show', !modal1Visible);
    addModal.classList.toggle('show', modal1Visible);  
}

// Gestion du clic sur le bouton "Ajouter une photo"
btnAjouter.addEventListener('click', function(event) {
    event.preventDefault();
    toggleModals();
});

function closeActiveModal() {
    [deleteModal, addModal].forEach(modal => {
        if (window.getComputedStyle(modal).display !== 'none') {
            modal.classList.remove('show');
        }
    });
}

// Ajout des écouteurs d'événements aux boutons de fermeture
closeButtons.forEach((button, index) => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        closeActiveModal();
    });
});

// Gestion du clic en dehors des modales
window.addEventListener('click', function(event) {
    [deleteModal, addModal].forEach(modal => {
        if (event.target === modal) {
            closeActiveModal();
        }
    });
});

// Empêcher la propagation du clic à l'intérieur des modales
[deleteModal, addModal].forEach(modal => {
    const modalContent = modal.querySelector('.js-modale-stop');
    if (modalContent) {
        modalContent.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});

