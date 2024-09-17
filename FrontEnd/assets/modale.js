
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
    // réutilise le code de galerie
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
       // Ajout de l'icône de poubelle dans la figure
       figure.appendChild(trashIcon);
       // Ajout de la figure au container de la modale
       modaleGalleryContainer.appendChild(figure);  
    })   
    
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
    console.log('Élément file-upload trouvé :', retour, modal1, modal2, fileUpload, btnAjouter);
    // Sélectionner tous les boutons de fermeture
    console.log('Boutons de fermeture trouvés:', closeButtons.length);
// Ajouter un écouteur d'événements au lien "Ajouter une photo"
btnAjouter.addEventListener('click', function(event) {
    // Empêcher le comportement par défaut du lien
    event.preventDefault();
    
    // Afficher la deuxième modale (vous devrez ajuster ceci selon votre logique d'affichage)
    const modal2 = document.getElementById('modal2');
    modal2.style.display = 'block';

    console.log('Modale d\'ajout de photo ouverte');
});
// Vérifier si l'écouteur d'événements est bien ajouté
console.log('Écouteur d\'événements ajouté au bouton Ajouter une photo');

// Fonction pour basculer entre les modales
function toggleModals() {
    console.log('Basculement entre les modales');
    
    // Vérifier l'état actuel des modales
    const modal1Visible = modal1.style.display !== 'none';
    console.log('Modal 1 visible:', modal1Visible);

    // Basculer l'affichage des modales
    modal1.style.display = modal1Visible ? 'none' : 'block';
    modal2.style.display = modal1Visible ? 'block' : 'none';

    console.log('Nouvel état - Modal 1:', modal1.style.display);
    console.log('Nouvel état - Modal 2:', modal2.style.display);
}

// Vérifier si l'écouteur d'événements est bien ajouté
console.log('Écouteur d\'événements ajouté à l\'input file');

// Gestion du clic sur le bouton "Ajouter une photo"
btnAjouter.addEventListener('click', function(event) {
    console.log('Clic sur le bouton Ajouter une photo');
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    toggleModals(); // Basculer entre les modales
});
console.log('Écouteur ajouté au bouton Ajouter une photo');

/*// Fonction pour fermer la modale active
function closeActiveModal() {
    console.log('Tentative de fermeture de la modale active');
    if (modal1.style.display === 'block') {
        modal1.style.display = 'none';
        console.log('Modal 1 fermée');
    } else if (modal2.style.display === 'block') {
        modal2.style.display = 'none';
        console.log('Modal 2 fermée');
    } else {
        console.log('Aucune modale active à fermer');
    }
}
*/
// Ajout des écouteurs d'événements aux boutons de fermeture
closeButtons.forEach((button, index) => {
    button.addEventListener('click', function(event) {
        console.log(`Bouton de fermeture ${index + 1} cliqué`);
        event.preventDefault();
        closeActiveModal();
    });
});

console.log('Écouteurs ajoutés à tous les boutons de fermeture');
const modals = [modal1, modal2]; // Regrouper les modales dans un tableau
console.log('Modales sélectionnées:', modals);

// Fonction pour fermer la modale active
function closeActiveModal() {
    console.log('Tentative de fermeture de la modale active');
    modals.forEach(modal => {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
            console.log('Modale fermée:', modal.id);
        }
    });
}
// Gestion du clic en dehors des modales
window.addEventListener('click', function(event) {
    console.log('Clic détecté');
    modals.forEach(modal => {
        if (event.target === modal) {
            console.log('Clic en dehors de la modale:', modal.id);
            closeActiveModal();
        }
    });
});

// Empêcher la propagation du clic à l'intérieur des modales
modals.forEach(modal => {
    const modalContent = modal.querySelector('.js-modale-stop');
    if (modalContent) {
        modalContent.addEventListener('click', function(event) {
            console.log('Clic à l\'intérieur de la modale:', modal.id);
            event.stopPropagation();
        });
    }
});

console.log('Écouteurs d\'événements ajoutés pour la fermeture des modales');

