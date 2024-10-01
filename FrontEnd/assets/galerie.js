document.addEventListener("DOMContentLoaded", galerie);
const galleryContainer = document.querySelector('.gallery');
//Déclare works pour être accessible dans tout le code
let works = [];

async function galerie() {
    const response = await fetch("http://localhost:5678/api/works")
    //conversion des données reçus en json
    works = await response.json()
          
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
    }
}

async function categoryFilter(categoryName) {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        const categories = await response.json(); 
        const category = categories.find(cat => cat.name === categoryName);
        // si la catégorie existe, on filtre et affiche les projets
        if (category) {  
            galleryContainer.innerHTML = ''; // Vide la galerie
            const projetsFiltres = works.filter(projet => projet.categoryId === category.id);
            // Boucle pour afficher les projets filtrés
            projetsFiltres.forEach(projet => {
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
        } else {
            console.error(`Catégorie "${categoryName}" introuvable`);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
    }
}

const boutonFiltresTous = document.querySelector(".btn-tous");
const boutonObjets = document.querySelector(".btn-objets");
const boutonApparts = document.querySelector(".btn-apparts");
const boutonHotelResto = document.querySelector(".btn-h-et-resto")

boutonFiltresTous.addEventListener('click', () => {
    galleryContainer.innerHTML = ''; //vide la galerie actuelle
    galerie(); // Réaffiche tous les projets
});

boutonObjets.addEventListener('click', () => categoryFilter('Objets'));
boutonApparts.addEventListener('click', () => categoryFilter('Appartements'));
boutonHotelResto.addEventListener('click', () => categoryFilter('Hotels & restaurants'));

   
