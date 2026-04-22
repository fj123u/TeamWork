let users = [];
let a = false;

const form = document.getElementById("form-signin");
const erreur = document.getElementById("erreur");

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

chargerUsers();

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();
    if (!validateEmail(email)) {
        erreur.textContent = "L'email n'est pas valide.";
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
    for (let i = 0; i < users.length; ++i) {
        if (users[i].email == email) {
            if (users[i].password == password) {
                a = true;
            }
        }
    }
    if (!a) {
        erreur.textContent = "Au moins une des valeurs saisies est incorrect.";
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

function chargerUsers() {
    const data = localStorage.getItem("user");
    if (data !== null) {
        users = JSON.parse(data);
    }
}