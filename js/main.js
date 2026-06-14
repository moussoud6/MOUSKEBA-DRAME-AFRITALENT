// annee dynamique (mettre a jour automatiquement l'annee dans le footer)
document.getElementById("annee").textContent = new Date().getFullYear();
//dark mode(bouton pour basculer entre le mode sombre et le mode clair)
const btnDarkMode = document.getElementById("darkModeToggle");
//verifions si le dark mode etait  active avant(localStorage)
    if (localStorage.getItem("darkMode") === "active"){
document.body.classList.add("dark-mode");
btnDarkMode.textContent = "⭐";
    }
//clickage du bouton
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
//changement du style de la navbar quand on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function(){
        if (window.scrollY > 50){
//reduction de la navbar au scroll
navbar.style.padding = "8px 0";
navbar.style.boxShadow = "0 2px  20px rgba(0, 0, 0, 0.3)";       
        }else{
//taille normale de la navbar en haut de page            
navbar.style.padding = "16px 0";
navbar.style.boxShadow = "none";
navbar.style.backgroundColor = "#1a1a2e";       
        }
    });
//bouton retour en haut(affichage du bouton apres 300px de scroll)    
const btnRetourHaut = document.getElementById("backToTop");
    window.addEventListener("scroll", function(){
       if (window.scrollY > 300){
btnRetourHaut.style.display = "block";
       }else{
btnRetourHaut.style.display = "none";
       }
    });   
//remonter en haut de la page    
    btnRetourHaut.addEventListener("click", function(){
        window.scrollTo({ 
            top: 0, 
            behavior: "smooth" });
    });    

// compteurs animes(selection de tous les elements avec la classe counter)    
const compteurs = document.querySelectorAll(".counter");
//definition d'une fonction qui anime le compteur de 0 a sa valeur cible
const animerCompteur = (compteur) => {
    const cible = parseInt(compteur.getAttribute("data-target"));
    const duree = 2000;
    const increment = cible / (duree / 16);
    let valeurActuelle = 0;
    const timer = setInterval(() => {
        valeurActuelle += increment;
        if (valeurActuelle >= cible) {
//affichage de la valeur finale avec le signe +           
            compteur.textContent = cible +"+";
            clearInterval(timer);
        } else {
            compteur.textContent = Math.floor(valeurActuelle);
        }
    }, 16);
};
//observation de l'element qui declenche l'animation quand le compteur anime entre dans l'ecran
const observateurcompteur = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animerCompteur(entry.target);
            observateurcompteur.unobserve(entry.target);
        }
    });

});
//observation de chaque compteur
compteurs.forEach((compteur) => {    
    observateurcompteur.observe(compteur);
});
//FADE-IN au scroll(selection de toutes les sections)
const sections = document.querySelectorAll("section");
//observation de l'element qui ajoute visible quand une section entre dans l'ecran
const observateurSection = new
 IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observateurSection.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
//observation des sections
sections.forEach((section) => {
    observateurSection.observe(section);
});
//FILTRAGE FREELANCES(filtrage des cartes freelances selon la categorie cliquee)
function filtrer(categorie) {
    const cartes = document.querySelectorAll(".carte-freelance");
    cartes.forEach((carte) => {
        if (categorie === "tous" || carte.getAttribute("data-categorie") === categorie) {
//affichage de la carte correspondant a la categorie            
            carte.style.display = "";
        } else {
//on cache la carte si elle ne correspond pas a la categorie            
            carte.style.display = "none";
        }
    });
//centrer les cartes visibles dans la section freelances    
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
// verification dunom
    const nom = document.getElementById("nom").value.trim();
    if(nom === ""){
        document.getElementById("erreur-Nom").textContent = "Le nom est requis.";
        document.getElementById("nom").classList.add("is-invalid");
        valide = false;
    } else {
        document.getElementById("nom").classList.add("is-valid");
    }
// verification du prénom
    const prenom = document.getElementById("prenom").value.trim();
    if(prenom === ""){
        document.getElementById("erreur-Prenom").textContent = "Le prénom est requis.";
        document.getElementById("prenom").classList.add("is-invalid");
        valide = false;
    } else {
        document.getElementById("prenom").classList.add("is-valid");
    }
// verification de l'email avec un regex pour valider le format de l'email
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
// verification du sujet
    const sujet = document.getElementById("sujet").value;
    if(sujet === ""){
        document.getElementById("erreur-sujet").textContent = "veillez choisir un sujet.";
        document.getElementById("sujet").classList.add("is-invalid");
        valide = false;
    } else {
        document.getElementById("sujet").classList.add("is-valid");
    }
// verification du message (le message doit contenir au moins 20 caracteres)
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
// afficher le message de succès
    if (valide) {
        document.getElementById("messagesucces").style.display = "block";
        document.getElementById("formulaire").reset();
    }
}    
