
// Recuperation des elements principaux
const form = document.getElementById("form-login");
const erreur = document.getElementById("erreur");

// Recuperation des champs du formulaire
const inputPseudo = document.getElementById("pseudo");
const inputPassword = document.getElementById("password");

form.addEventListener("submit", function(event)
{
    event.preventDefault();
    const pseudo = inputPseudo.value.trim();
    const password = inputPassword.value.trim();
    // Validation : on s’arrete la premiere erreur
    if (pseudo === "") 
    {
        erreur.textContent = "Le pseudo est obligatoire.";
        return;
    }
    if (pseudo.length < 3) 
    {
        erreur.textContent = "Le pseudo est trop court.";
        return;
    }
    if (password === "") 
    {
        erreur.textContent = "Le mot de passe est obligatoire.";
        return;
    }
    if (password.length < 6) 
    {
        erreur.textContent = "Le mot de passe est trop court.";
        return;
    }
    // Si tout est OK : effacer l’erreur
    erreur.textContent = "";
});