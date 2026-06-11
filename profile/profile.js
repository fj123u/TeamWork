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
    const labelPhoto = document.createElement("label");
    const inputPhoto = document.createElement("input");
    const apercu = document.createElement("img");
    const labelAncienMdp = document.createElement("label");
    const inputAncienMdp = document.createElement("input");
    const labelNouveauMdp = document.createElement("label");
    const inputNouveauMdp = document.createElement("input");
    const labelConfirmMdp = document.createElement("label");
    const inputConfirmMdp = document.createElement("input");
    const erreur = document.createElement("p");
    const btnActions = document.createElement("div");
    const save = document.createElement("button");
    const annuler = document.createElement("button");

    labelNom.textContent = "Nom : ";
    labelPrenom.textContent = "Prenom : ";
    labelEmail.textContent = "Email : ";
    labelPhoto.textContent = "Nouvelle photo : ";
    inputPhoto.type = "file";
    inputPhoto.accept = "image/png, image/jpeg";
    apercu.classList.add("apercu-photo");
    apercu.style.display = "none";
    labelAncienMdp.textContent = "Ancien mot de passe : ";
    inputAncienMdp.type = "password";
    inputAncienMdp.placeholder = "Ancien mot de passe";
    labelNouveauMdp.textContent = "Nouveau mot de passe : ";
    inputNouveauMdp.type = "password";
    inputNouveauMdp.placeholder = "Nouveau mot de passe";
    labelConfirmMdp.textContent = "Confirmation : ";
    inputConfirmMdp.type = "password";
    inputConfirmMdp.placeholder = "Confirmer le nouveau mot de passe";
    erreur.id = "erreur-modif";
    inputNom.value = users[index].nom;
    inputPrenom.value = users[index].prenom;
    inputEmail.value = users[index].email;
    save.textContent = "Enregistrer";
    annuler.textContent = "Annuler";
    annuler.type = "button";
    btnActions.classList.add("form-actions");

    inputPhoto.addEventListener("change", () => {
        const fichier = inputPhoto.files[0];
        if (fichier) {
            const reader = new FileReader();
            reader.onload = (e) => {
                apercu.src = e.target.result;
                apercu.style.display = "block";
            };
            reader.readAsDataURL(fichier);
        } else {
            apercu.style.display = "none";
        }
    });

    annuler.addEventListener("click", () => {
        form.innerHTML = "";
    });

    form.appendChild(labelNom);
    form.appendChild(inputNom);
    form.appendChild(labelPrenom);
    form.appendChild(inputPrenom);
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(labelPhoto);
    form.appendChild(inputPhoto);
    form.appendChild(apercu);
    form.appendChild(labelAncienMdp);
    form.appendChild(inputAncienMdp);
    form.appendChild(labelNouveauMdp);
    form.appendChild(inputNouveauMdp);
    form.appendChild(labelConfirmMdp);
    form.appendChild(inputConfirmMdp);
    form.appendChild(erreur);
    btnActions.appendChild(save);
    btnActions.appendChild(annuler);
    form.appendChild(btnActions);

    save.addEventListener("click", (e) => {
        e.preventDefault();
        erreur.textContent = "";

        const ancienMdp = inputAncienMdp.value.trim();
        const nouveauMdp = inputNouveauMdp.value.trim();
        const confirmMdp = inputConfirmMdp.value.trim();

        if (ancienMdp !== "" || nouveauMdp !== "" || confirmMdp !== "") {
            if (ancienMdp !== users[index].password) {
                erreur.textContent = "L'ancien mot de passe est incorrect.";
                return;
            }
            if (nouveauMdp.length < 6) {
                erreur.textContent = "Le nouveau mot de passe est trop court.";
                return;
            }
            if (nouveauMdp !== confirmMdp) {
                erreur.textContent = "Les mots de passe ne correspondent pas.";
                return;
            }
            users[index].password = nouveauMdp;
        }

        users[index].nom = inputNom.value.trim();
        users[index].prenom = inputPrenom.value.trim();
        users[index].email = inputEmail.value.trim();

        const fichier = inputPhoto.files[0];
        if (fichier) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                users[index].avatar = ev.target.result;
                localStorage.setItem("user", JSON.stringify(users));
                location.reload();
            };
            reader.readAsDataURL(fichier);
        } else {
            localStorage.setItem("user", JSON.stringify(users));
            location.reload();
        }
    });
});

disconnect.addEventListener("click", () => {
    localStorage.removeItem("userConnect");
    location.reload();
});
