document.getElementById("annee").textContent = new Date().getFullYear();
const btnDarkMode = document.getElementById("darkModeToggle");
    if (localStorage.getItem("darkMode") === "active"){
document.body.classList.add("dark-mode");
btnDarkMode.textContent = "⭐";
    }
btnDarkMode.addEventListener("click", function(){
document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")){
localStorage.setItem("darkMode", "active");
btnDarkMode.textContent = "⭐";
        }else{
localStorage.setItem("darkMode", "inactive");
btnDarkMode.textContent = "🌙";
        }
    });

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function(){
        if (window.scrollY > 50){
navbar.style.padding = "8px 0";
navbar.style.boxShadow = "0 2px  20px rgba(0, 0, 0, 0.3)";       
        }else{
navbar.style.padding = "16px 0";
navbar.style.boxShadow = "none";
navbar.style.backgroundColor = "#1a1a2e";       
        }
    });

const btnRetourHaut = document.getElementById("backToTop");
    window.addEventListener("scroll", function(){
       if (window.scrollY > 300){
btnRetourHaut.style.display = "block";
       }else{
btnRetourHaut.style.display = "none";
navbar.style.backgroundColor = "#1a1a2e";
       }
    });
    btnRetourHaut.addEventListener("click", function(){
        window.scrollTo({ 
            top: 0, 
            behavior: "smooth" });
    });    

    
const compteurs = document.querySelectorAll(".counter");
const animerCompteur = (compteur) => {
    const cible = parseInt(compteur.getAttribute("data-target"));
    const duree = 2000;
    const increment = cible / (duree / 16);
    let valeurActuelle = 0;
    const timer = setInterval(() => {
        valeurActuelle += increment;
        if (valeurActuelle >= cible) {
            compteur.textContent = cible +"+";
            clearInterval(timer);
        } else {
            compteur.textContent = Math.floor(valeurActuelle);
        }
    }, 16);
};
const observateurcompteur = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animerCompteur(entry.target);
            observateurcompteur.unobserve(entry.target);
        }
    });

});
compteurs.forEach((compteur) => {    
    observateurcompteur.observe(compteur);
});
const sections = document.querySelectorAll("section");
const observateurSection = new
 IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observateurSection.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
sections.forEach((section) => {
    observateurSection.observe(section);
});
function filtrer(categorie) {
    const cartes = document.querySelectorAll(".carte-freelance");
    cartes.forEach((carte) => {
        if (categorie === "tous" || carte.getAttribute("data-categorie") === categorie) {
            carte.style.display = "";
        } else {
            carte.style.display = "none";
        }
    });
    document.getElementById("liste-freelances").style.justifyContent = "center";
}
// Validation du formulaire de contact
function validerFormulaire() {
    let valide = true;
//erreurs
    document.querySelectorAll(".erreur").forEach((el) => {
        el.textContent = "";
    });
    document.querySelectorAll(".form-control, .form-select").forEach((el) => {
        el.classList.remove("is-invalid","is-valid");
    });
//nom
    const nom = document.getElementById("nom").value.trim();
    if(nom === ""){
        document.getElementById("erreur-Nom").textContent = "Le nom est requis.";
        document.getElementById("nom").classList.add("is-invalid");
        valide = false;
    } else {
        document.getElementById("nom").classList.add("is-valid");
    }
//prenom
    const prenom = document.getElementById("prenom").value.trim();
    if(prenom === ""){
        document.getElementById("erreur-Prenom").textContent = "Le prénom est requis.";
        document.getElementById("prenom").classList.add("is-invalid");
        valide = false;
    } else {
        document.getElementById("prenom").classList.add("is-valid");
    }
//email
    const email = document.getElementById("email").value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email === ""){
        document.getElementById("erreur-Email").textContent = "L'email est requis.";
        document.getElementById("email").classList.add("is-invalid");
        valide = false;
    } else if (!regexEmail.test(email)) {
        document.getElementById("erreur-Email").textContent = "L'email n'est pas valide.";
        document.getElementById("email").classList.add("is-invalid");
        valide = false;
    } else {
        document.getElementById("email").classList.add("is-valid");
    }
//sujet
    const sujet = document.getElementById("sujet").value;
    if(sujet === ""){
        document.getElementById("erreur-sujet").textContent = "veillez choisir un sujet.";
        document.getElementById("sujet").classList.add("is-invalid");
        valide = false;
    } else {
        document.getElementById("sujet").classList.add("is-valid");
    }
//message
    const message = document.getElementById("message").value.trim();
    if(message === ""){
        document.getElementById("erreur-Message").textContent = "Le message est requis.";
        document.getElementById("message").classList.add("is-invalid");
        valide = false;
    } else if (message.length < 20) {
        document.getElementById("erreur-Message").textContent = "Le message doit contenir au moins 20 caractères.";
        document.getElementById("message").classList.add("is-invalid");
        valide = false;
    } else {
        document.getElementById("message").classList.add("is-valid");
    }
//succes
    if (valide) {
        document.getElementById("messagesucces").style.display = "block";
        document.getElementById("formulaire").reset();
    }
}    
