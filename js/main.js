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
    } else{
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
    }
});
const btnRetourHaut = document.getElementById("backToTop");
window.addEventListener("scroll", function(){
    if (window.scrollY > 300)
    {
      btnRetourHaut.style.display = "block";  
    }else{
        btnRetourHaut.style.display = "none";
    }
});
btnRetourHaut.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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
compteurs.forEach((compteur) => {    observateurcompteur.observe(compteur);
});
const sections = document.querySelectorAll("section");
const observateurSection = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observateurSection.unobserve(entry.target);
        }
        });
    }, { threshold: 0.1 });
sections.forEach((section) => {
    observateurSection.observe(section);});  