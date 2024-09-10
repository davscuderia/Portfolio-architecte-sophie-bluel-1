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