
const form = document.getElementById("form-signup");
const erreur = document.getElementById("erreur");

const inputNom = document.getElementById("nom");
const inputPrenom = document.getElementById("prenom");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputConfirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nom = inputNom.value.trim();
    const prenom = inputPrenom.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();
    const confirmPassword = inputConfirmPassword.value.trim();
    if (nom === "") {
        erreur.textContent = "Le nom est obligatoire.";
        return;
    }
    if (nom.length < 3) {
        erreur.textContent = "Le nom est trop court.";
        return;
    }
    if (prenom === "") {
        erreur.textContent = "Le prenom est obligatoire.";
        return;
    }
    if (prenom.length < 3) {
        erreur.textContent = "Le prenom est trop court.";
        return;
    }
    if (!validateEmail(email))
    {
        erreur.textContent = "L'email n'est pas valide."
        return;
    }
    if (password === "") {
        erreur.textContent = "Le mot de passe est obligatoire.";
        return;
    }
    if (password.length < 6) {
        erreur.textContent = "Le mot de passe est trop court.";
        return;
    }
    if (confirmPassword != password) {
        erreur.textContent = "Les mots de passe ne correspondent pas."
        return;
    }
    erreur.textContent = "";
    window.location.href = "../homepage/homepage.html";
    form.reset();
});

function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }