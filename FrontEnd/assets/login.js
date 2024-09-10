//récupère les les champs email et password
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const form = document.getElementById("form");

console.log(passwordInput)

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
});
