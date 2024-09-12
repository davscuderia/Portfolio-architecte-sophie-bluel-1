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

       /*const figcaption = document.createElement("figcaption");
       figcaption.innerText = work.title;
       figure.appendChild(figcaption);*/

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

document.querySelectorAll('.js-modale').forEach(a => {
    a.addEventListener('click', openModale)
   
})
//fermeture fenêtre au clavier
window.addEventListener('keydown', function (e) {
    if(e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
    }

})
