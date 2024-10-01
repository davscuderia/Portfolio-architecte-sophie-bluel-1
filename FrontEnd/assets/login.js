document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("token");
    const loginButton = document.querySelector('.bouton-login'); 
    const filterButton = document.getElementById("boutonsFiltres");   
    const changeButton = document.querySelector('.js-modale-btn'); 
        if (token) {
            if (filterButton) {
                //masque les boutons filtres
                filterButton.style.display = 'none';   
            }
            if (changeButton) {
                // afficher le bouton
                changeButton.style.display = 'flex';
            }            
            // Si connecté, remplacer "login" par "logout"
            loginButton.innerText = 'Logout';        
            loginButton.addEventListener('click', function(event) {
                event.preventDefault();
                localStorage.removeItem('token'); 
                window.location.reload();          
            });
        } else {
            if (changeButton) {
                // Masquer le bouton "modifier" si non connecté
                changeButton.style.display = 'none';
            }
        }                      
    //formulaire de connexion
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const formulary = document.querySelector("#login-form");
        if (formulary) {
            formulary.addEventListener('submit', function(event) {
                event.preventDefault();
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
                .then(response => response.json()) 
                .then(data => {
                if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";           
                } else {
                // Afficher un message d'erreur
                alert("Email ou mot de passe incorrect");
                document.getElementById("login-form").appendChild(messageErreur)
                }
                })
                .catch(error => {
                console.error("Erreur de connexion", error);
                });   
            });
        }
});
