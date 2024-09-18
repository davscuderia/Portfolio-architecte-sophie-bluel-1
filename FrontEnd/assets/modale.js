
let modale = null
const openModale = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
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

// fonction pour afficher les éléments dans la modale
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

       // Ajout de l'événement de suppression
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
    modale.style.display = "none"
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
//ouvre la fenêtre modale
document.querySelectorAll('.js-modale-btn').forEach(a => {
    a.addEventListener('click', openModale)
   
})
//fermeture fenêtre au clavier
window.addEventListener('keydown', function (e) {
    if(e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
    }
})

// Sélectionner les éléments du DOM
const fileUpload = document.getElementById('file-upload');
const btnAjouter = document.getElementById('ajouter');
const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');
const btnRetour = document.getElementById('retour');
const closeButtons = document.querySelectorAll('.js-modale-close');

// Vérifier si l'élément est bien trouvé
console.log('Élément file-upload trouvé');
console.log('Boutons de fermeture trouvés:', closeButtons.length);

// Fonction pour basculer entre les modales
function toggleModals() {
    const modal1Visible = modal1.style.display !== 'none'; 
    modal1.style.display = modal1Visible ? 'none' : 'block';
    modal2.style.display = modal1Visible ? 'block' : 'none';
    console.log('Modal 1:', modal1.style.display, 'Modal 2:', modal2.style.display);
}

// Gestion du clic sur le bouton "Ajouter une photo"
btnAjouter.addEventListener('click', function(event) {
    event.preventDefault();
    toggleModals();
    console.log('Clic sur "Ajouter une photo"');
});

// Fonction pour fermer la modale active
function closeActiveModal() {
    [modal1, modal2].forEach(modal => {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
            console.log('Modale fermée:', modal.id);
        }
    });
}

// Ajout des écouteurs d'événements aux boutons de fermeture
closeButtons.forEach((button, index) => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        closeActiveModal();
        console.log(`Bouton de fermeture ${index + 1} cliqué`);
    });
});

// Gestion du clic en dehors des modales
window.addEventListener('click', function(event) {
    [modal1, modal2].forEach(modal => {
        if (event.target === modal) {
            closeActiveModal();
            console.log('Clic en dehors de la modale:', modal.id);
        }
    });
});

// Empêcher la propagation du clic à l'intérieur des modales
[modal1, modal2].forEach(modal => {
    const modalContent = modal.querySelector('.js-modale-stop');
    if (modalContent) {
        modalContent.addEventListener('click', function(event) {
            event.stopPropagation();
            console.log('Clic à l\'intérieur de la modale:', modal.id);
        });
    }
});

