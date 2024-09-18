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
    
/*nv Référence à la galerie de la modale
const galleryModale = document.querySelector('.gallery-modale');
    
//rajout Vider la galerie de la modale avant de la remplir
galleryModale.innerHTML = '';fin*/
    
        
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
    /*nouveau code
        for (let i = 0; i < works.length; i++) {
            let work = works[i];
            console.log("Traitement du projet:", work);

    // Création de la miniature pour la modale
        const figure = document.createElement("figure");
        figure.dataset.id = work.id; // Stocker l'ID du projet

        let img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);

    // Création du bouton de suppression
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.classList.add("btn-trash");
        deleteBtn.dataset.id = work.id;
        figure.appendChild(deleteBtn);

        galleryModale.appendChild(figure);

        console.log("Miniature créée pour le projet:", work.id);
}

// Ajout des écouteurs d'événements pour les boutons de suppression
addDeleteListeners();
}
//fin du nv code*/


//pour filtrer et afficher les projets en fonction d'une catégorie
async function filtrerParCategorie(categoryName) {
    try {
        //récupère les catégories depuis l'api
        const response = await fetch("http://localhost:5678/api/categories");
        const categories = await response.json(); 

        console.log(categories);

        // Cherche la catégorie par nom
        const category = categories.find(cat => cat.name === categoryName);
        // si la catégorie existe, on filtre et affiche les projets
        if (category) {  
            galleryContainer.innerHTML = ''; // Vide la galerie
            
            // Filtre les projets par l'ID de catégorie
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

//Gestion des boutons
const boutonFiltresTous = document.querySelector(".btn-tous");
const boutonObjets = document.querySelector(".btn-objets");
const boutonApparts = document.querySelector(".btn-apparts");
const boutonHotelResto = document.querySelector(".btn-h-et-resto")

boutonFiltresTous.addEventListener('click', () => {
    galleryContainer.innerHTML = ''; //vide la galerie actuelle
    galerie(); // Réaffiche tous les projets
});

// Utilise la fonction filtrerParCategorie pour chaque bouton
boutonObjets.addEventListener('click', () => filtrerParCategorie('Objets'));
boutonApparts.addEventListener('click', () => filtrerParCategorie('Appartements'));
boutonHotelResto.addEventListener('click', () => filtrerParCategorie('Hotels & restaurants'));

   
