
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
    // Vérifier si l'élément est bien trouvé
    console.log('Élément file-upload trouvé :', fileUpload, btnAjouter);

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


