const data = localStorage.getItem("user");
const users = JSON.parse(data);
const index = localStorage.getItem("userConnect");
const modify = document.getElementById("modify");
const disconnect = document.getElementById("disconnect");
const form = document.getElementById("form");


if (index === null || !users) {
    window.location.href = "../signin/signin.html";
}

const pp = users[index].avatar;
const nom = users[index].nom;
const prenom = users[index].prenom;
const email = users[index].email;

if (pp === null) {
    document.getElementById("avatar").src = "../img/avatar.png";
}
else {
    document.getElementById("avatar").src = pp;
}

document.getElementById("nom").textContent = "Nom : " + nom;
document.getElementById("prenom").textContent = "Prenom : " + prenom;
document.getElementById("email").textContent = "Email : " + email;

modify.addEventListener("click", () => {

    form.innerHTML = "";
    const labelNom = document.createElement("label");
    const inputNom = document.createElement("input");
    const labelPrenom = document.createElement("label");
    const inputPrenom = document.createElement("input");
    const labelEmail = document.createElement("label");
    const inputEmail = document.createElement("input");
    const save = document.createElement("button");

    labelNom.textContent = "Nom : ";
    labelPrenom.textContent = "Prenom : ";
    labelEmail.textContent = "Email : ";
    inputNom.value = users[index].nom;
    inputPrenom.value = users[index].prenom;
    inputEmail.value = users[index].email;
    save.textContent = "Sauvegarder";

    form.appendChild(labelNom);
    form.appendChild(inputNom);
    form.appendChild(document.createElement("br"));
    form.appendChild(labelPrenom);
    form.appendChild(inputPrenom);
    form.appendChild(document.createElement("br"));
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(document.createElement("br"));
    form.appendChild(save);

    save.addEventListener("click", (e) => {
        e.preventDefault();

        users[index].nom = inputNom.value;
        users[index].prenom = inputPrenom.value;
        users[index].email = inputEmail.value;

        localStorage.setItem("user", JSON.stringify(users));
        location.reload();
    });
});

disconnect.addEventListener("click", () => {
    localStorage.removeItem("userConnect");
    location.reload();
})