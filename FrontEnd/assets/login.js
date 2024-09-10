//récupère les les champs email et password
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// récupération du formulaire
const form = document.querySelector("form");

console.log(passwordInput)

form.addEventListener('submit', function(event) {
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
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Stocker le token dans le localStorage pour la session de l'utilisateur
            localStorage.setItem("token", data.token);
            // Rediriger l'utilisateur vers la page d'accueil
            window.location.href = "index.html";
        } else {
            // Afficher un message d'erreur
            alert("Email ou mot de passe incorrect.");
        }
    })
    .catch(error => {
        console.error("Erreur de connexion", error);
    });
});
