document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("token");
    const loginButton = document.querySelector('.bouton-login'); // Remplacer par la classe exacte du bouton login
    const boutonsFiltres = document.getElementById("boutonsFiltres"); //récupère l'id dans le html   
    const boutonModifier = document.querySelector('.js-modale-btn'); // Sélectionne le bouton "modifier"
    
        if (token) {
            if (boutonsFiltres) {
                //masque les boutons filtres
                boutonsFiltres.style.display = 'none';   
            }

            if (boutonModifier) {
                // afficher le bouton
                boutonModifier.style.display = 'flex'; // Rendre le bouton visible
            }
            
            // Si connecté, remplacer "login" par "logout"
            loginButton.innerText = 'Logout';
        
            loginButton.addEventListener('click', function(event) {
                event.preventDefault();
                localStorage.removeItem('token'); //supprime le token pour déconnecter l'utilisateur
                window.location.reload(); //re-lecture de la page          
            });

        } else {
            if (boutonModifier) {
                // Masquer le bouton "modifier" si non connecté
                boutonModifier.style.display = 'none';
            }
        }                       
    });

//récupère les les champs email et password
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// récupération du formulaire
const formulaire = document.querySelector("#login-form");

formulaire.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    // collecte les données du formulaire
    const email = emailInput.value;
    const password = passwordInput.value;
        //envoi des données à l'api requête POST au serveur
        fetch("http://localhost:5678/api/users/login", {
    
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify({
            email: email,
            password: password
            })
        })
    //fonction pour gérer les promesses
    .then(response => response.json()) // convertit la réponse au format json
    .then(data => { //traite les données json de l'api
        if (data.token) {
            // Stocker le token dans le localStorage pour la session de l'utilisateur
            localStorage.setItem("token", data.token);
            // Rediriger l'utilisateur vers la page d'accueil
            window.location.href = "index.html";
                       
        } else {
            // Afficher un message d'erreur
            alert("Email ou mot de passe incorrect");
            //alert('test')
        let messageErreur = document.createElement("p")
            //messageErreur.innerText = "Email ou mot de passe incorrect"
            document.getElementById("login-form").appendChild(messageErreur)
        }
    })
    .catch(error => {
        console.error("Erreur de connexion", error);
    });
    
});
