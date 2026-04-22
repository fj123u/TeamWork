let users = [];
let indexModification = -1;

const form = document.getElementById("form-signup");
const erreur = document.getElementById("erreur");

const inputNom = document.getElementById("nom");
const inputPrenom = document.getElementById("prenom");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputConfirmPassword = document.getElementById("confirmPassword");

chargerUsers();

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
    if (!validateEmail(email)) {
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

    if (indexModification === -1) {
        users.push({
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
        });
    } else {
        users[indexModification] = {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
        };
        indexModification = -1;
    }

    sauvegarderUsers();

    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    window.location.href = "../homepage/homepage.html";
    form.reset();
});

function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

function chargerUsers() {
    const data = localStorage.getItem("user");
    if (data !== null) {
        users = JSON.parse(data);
    }
}

function sauvegarderUsers() {
    localStorage.setItem("user", JSON.stringify(users));
}
