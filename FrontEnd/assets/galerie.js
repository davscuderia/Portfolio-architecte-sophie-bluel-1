document.addEventListener("DOMContentLoaded", galerie);
// récuperer la référence de la balise gallery
const galleryContainer = document.querySelector('.gallery');
//Déclare works pour être accessible dans tout le code
let works = [];

// pour charger la galerie
async function galerie() {
    const response = await fetch("http://localhost:5678/api/works")
    //conversion des données reçus en json
    works = await response.json()
    
        //boucle pour afficher les projets
        for (let i = 0; i < works.length; i++) {
            let title = works[i].title;
            //crée un élément figure    
            const figure = document.createElement("figure");
            // ajoute les images
            let img = document.createElement("img");
            img.src = works[i].imageUrl;
            // attribut alt pour l'accessibilité
            img.alt = title; 
            figure.appendChild(img);
            // ajoute le texte des images
            const figcaption = document.createElement("figcaption");
            figcaption.innerText = title;
            figure.appendChild(figcaption);
        
            galleryContainer.appendChild(figure);
        
            console.log(img);    
        }
}

//***Gestion des boutons***//
//le bouton Tous
const boutonFiltresTous = document.querySelector(".btn-tous");

boutonFiltresTous.addEventListener('click', function() {
    //pour afficher tous les éléments
    galleryContainer.innerHTML = ''; // Vide la galerie
    galerie(); // Réaffiche tous les projets
});

//ajout du filtre par objet
document.querySelector(".btn-objets").addEventListener('click', async function() {
    //récupère les catégories depuis l'api
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json(); 

    console.log(categories);

    //recherche de la catégorie 'objets'
    const objetCategory = categories.find(category => category.name === 'Objets');
    
    //si la catégorie 'objets' existe
    if (objetCategory) {
        galleryContainer.innerHTML = ''; //vide la galerie actuelle
        //filtre les projets de la catégorie 'objets'
        const projetsObjet = works.filter(projet => projet.categoryId === objetCategory.id);
   
    //boucle pour afficher les projets filtrés
    projetsObjet.forEach(projet => {
        const figure = document.createElement("figure");

        let img = document.createElement("img");
        img.src = projet.imageUrl; // associe l'url de l'image au projet 
        img.alt = projet.title;
        figure.appendChild(img); //ajoute l'image à l'élement figure

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = projet.title;
        figure.appendChild(figcaption);

        galleryContainer.appendChild(figure); // ajoute chaque figure à la galerie
        });
    }
})

//filtre apparts
document.querySelector(".btn-apparts").addEventListener('click', async function() {
    //récupère les catégories depuis l'api
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const appartCategory = categories.find(category => category.name === 'Appartements');
    
    //si la catégorie 'apparts' existe
        if (appartCategory) {
        galleryContainer.innerHTML = ''; //vide la galerie actuelle
        //filtre les projets de la catégorie 'apparts'
        const projetsAppart = works.filter(projet => projet.categoryId === appartCategory.id);

    //boucle pour afficher les projets filtrés
    projetsAppart.forEach(projet => {
        const figure = document.createElement("figure");

        let img = document.createElement("img");
        img.src = projet.imageUrl; // associe l'url de l'image au projet 
        img.alt = projet.title;
        figure.appendChild(img); //ajoute l'image à l'élement figure

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = projet.title;
        figure.appendChild(figcaption);

        galleryContainer.appendChild(figure); // ajoute chaque figure à la galerie
        });
    }
})

//filtre hôtels et restos
document.querySelector(".btn-h-et-resto").addEventListener('click', async function() {
    //récupère les catégories depuis l'api
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const hotelRestoCategory = categories.find(category => category.name === 'Hotels & restaurants');
    
    //si la catégorie 'Hotels & restaurants' existe
        if (hotelRestoCategory) {
        galleryContainer.innerHTML = ''; //vide la galerie actuelle
        //filtre les projets de la catégorie 'Hotels & restaurants'
        const projetsHotelResto = works.filter(projet => projet.categoryId === hotelRestoCategory.id);

    //boucle pour afficher les projets filtrés
    projetsHotelResto.forEach(projet => {
        const figure = document.createElement("figure");

        let img = document.createElement("img");
        img.src = projet.imageUrl; // associe l'url de l'image au projet 
        img.alt = projet.title;
        figure.appendChild(img); //ajoute l'image à l'élement figure

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = projet.title;
        figure.appendChild(figcaption);

        galleryContainer.appendChild(figure); // ajoute chaque figure à la galerie
        });
    }
})
   
