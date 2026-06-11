const data = localStorage.getItem("user");
const users = JSON.parse(data);
const index = localStorage.getItem("userConnect");
const form = document.getElementById("form-post");
const add = document.getElementById("add");
const recherche = document.getElementById("recherche");
const disconnect = document.getElementById("disconnect");
const follows = users[index].nbFollows;
const postss = users[index].nbPosts;
const postsData = JSON.parse(localStorage.getItem("post"));
let posts = [];
if (index === null || !users) {
    window.location.href = "../signin/signin.html";
}
const pp = users[index].avatar;
if (pp === null) {
    document.getElementById("avatar").src = "../img/avatar.png";
}
else {
    document.getElementById("avatar").src = pp;
}

chargerPosts();
showStats()

function chargerPosts() {
    const data = localStorage.getItem("post");
    if (data !== null) {
        posts = JSON.parse(data);
    }
    const divPost = document.getElementById("posts");
    for (let i = 0; i < posts.length; ++i) {
        const div = document.createElement("div");
        div.classList.add("post");
        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");
        const avatarPost = document.createElement("img");
        avatarPost.classList.add("post-avatar");
        const auteur = users.find(u => u.prenom + " " + u.nom === posts[i]["prenom"] + " " + posts[i]["nom"]);
        if (auteur && auteur.avatar) {
            avatarPost.src = auteur.avatar;
        } else {
            avatarPost.src = "../img/avatar.png";
        }
        const nom = document.createElement("h3");
        nom.textContent = posts[i]["prenom"] + " " + posts[i]["nom"];
        const dateSpan = document.createElement("span");
        dateSpan.classList.add("post-date");
        dateSpan.textContent = posts[i]["date"] || "";
        postHeader.appendChild(avatarPost);
        postHeader.appendChild(nom);
        postHeader.appendChild(dateSpan);
        const titre = document.createElement("h2");
        titre.textContent = posts[i]["titre"];
        const message = document.createElement("p");
        message.textContent = posts[i]["msg"];
        const boutonLike = document.createElement("button");
        if (!posts[i].likedBy) {
            posts[i].likedBy = [];
        }
        if (posts[i].likedBy.includes(Number(index))) {
            boutonLike.textContent = "❤️";
        }
        else {
            boutonLike.textContent = "🤍";
        }
        boutonLike.addEventListener("click", () => {
            if (posts[i].likedBy.includes(Number(index))) {
                posts[i].likedBy = posts[i].likedBy.filter(id => id !== Number(index));
                posts[i].likes = posts[i].likedBy.length;
                sauvegarderPost();
                showStats();
                likesSpan.textContent = " " + posts[i].likes;
                boutonLike.textContent = "🤍";
            }
            else {
                posts[i].likedBy.push(Number(index));
                posts[i].likes = posts[i].likedBy.length;
                sauvegarderPost();
                showStats();
                likesSpan.textContent = " " + posts[i].likes;
                boutonLike.textContent = "❤️";
            }
        });
        const likesSpan = document.createElement("span");
        likesSpan.textContent = " " + posts[i]["likes"];
        const boutonComAdd = document.createElement("button");
        boutonComAdd.textContent = "Ajouter un commentaire  (" + posts[i]["coms"] + ")";
        boutonComAdd.classList.add("com");
        boutonComAdd.addEventListener("click", () => {
            const input = document.createElement("input");
            input.placeholder = "Votre commentaire";
            const envoyer = document.createElement("button");
            envoyer.textContent = "Envoyer";
            div.appendChild(input);
            div.appendChild(envoyer);
            envoyer.addEventListener("click", () => {
                const texte = input.value.trim();
                if (texte === "") {
                    return;
                }
                posts[i].commentaires.push({
                    auteur: users[index].prenom + " " + users[index].nom,
                    message: texte
                });
                posts[i].coms += 1;
                showStats();
                sauvegarderPost();
                location.reload();
            });
        });
        const actions = document.createElement("div");
        const boutonComView = document.createElement("button");
        boutonComView.textContent = "Voir les commentaires";
        boutonComView.classList.add("com");
        let view = false;
        const zone = document.createElement("div");
        boutonComView.addEventListener("click", () => {
            if (!view) {
                zone.innerHTML = "";
                for (const commentaire of posts[i].commentaires) {
                    const comDiv = document.createElement("div");
                    comDiv.classList.add("commentaire");
                    const comAvatar = document.createElement("img");
                    comAvatar.classList.add("com-avatar");
                    const comAuteur = users.find(u => u.prenom + " " + u.nom === commentaire.auteur);
                    if (comAuteur && comAuteur.avatar) {
                        comAvatar.src = comAuteur.avatar;
                    } else {
                        comAvatar.src = "../img/avatar.png";
                    }
                    const p = document.createElement("p");
                    p.textContent = commentaire.auteur + " : " + commentaire.message;
                    comDiv.appendChild(comAvatar);
                    comDiv.appendChild(p);
                    zone.appendChild(comDiv);
                }
                div.appendChild(zone);
                view = true;
            }
            else {
                zone.innerHTML = "";
                view = false;
                boutonComView.textContent = "Voir les commentaires";
            }
        })
        const boutonClose = document.createElement("button");
        boutonClose.textContent = "X";
        boutonClose.classList.add("btn-close");
        boutonClose.addEventListener("click", () => {
            removePost(posts[i].id);
        })
        if (postsData[i]["userId"] == index) {
            postHeader.appendChild(boutonClose);
        }
        const coms = document.createElement("span");
        actions.classList.add("actions");
        actions.appendChild(boutonLike);
        actions.appendChild(likesSpan);
        actions.appendChild(boutonComAdd);
        actions.appendChild(boutonComView);
        actions.appendChild(coms);
        div.appendChild(postHeader);
        div.appendChild(titre);
        div.appendChild(message);
        div.appendChild(actions);
        divPost.appendChild(div);
        showStats();
    }
}

function sauvegarderPost() {
    localStorage.setItem("post", JSON.stringify(posts));
}

function removePost(id) {
    posts.splice(id, 1);
    sauvegarderPost();
    showStats();
    location.reload();
}

add.addEventListener("click", () => {

    form.innerHTML = "";
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("input");
    const labelMsg = document.createElement("label");
    const inputMsg = document.createElement("input");
    const addPost = document.createElement("button");

    labelTitle.textContent = "Titre : ";
    labelMsg.textContent = "Message : ";
    addPost.textContent = "Ajouter un post";

    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(document.createElement("br"));
    form.appendChild(labelMsg);
    form.appendChild(inputMsg);
    form.appendChild(document.createElement("br"));
    form.appendChild(addPost);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = inputTitle.value.trim();
        const msg = inputMsg.value.trim();
        const nom = users[index]["nom"];
        const prenom = users[index]["prenom"];
        const nbLike = 0;
        const nbComs = 0;
        const data = localStorage.getItem("post");
        let postId = 0;
        if (data != null) {
            try {
            postId = postsData[postsData.length - 1]["id"] + 1;
            } catch {
            }
        }
        if (postId < 0)
        {
            postId = 0;
        }
        const commmentaires = [];
        const likedBy = [];
        const now = new Date();
        const date = now.toLocaleDateString("fr-FR") + " — " + now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        posts.push({ nom: nom, prenom: prenom, titre: title, msg: msg, likes: nbLike, likedBy: likedBy, coms: nbComs, commentaires: commmentaires, id: postId, userId: index, date: date });
        sauvegarderPost();
        showStats();
        location.reload();
    });
});

function sauvegarderUsers() {
    localStorage.setItem("user", JSON.stringify(users));
}

const suggestion = document.getElementById("suggestion");

for (const user of users) {
    const option = document.createElement("option");
    option.value = user.prenom + " " + user.nom;
    suggestion.appendChild(option);
}

recherche.addEventListener("change", () => {

    const texte = recherche.value.toLowerCase();
    const utilisateur = users.find(user => (user.prenom + " " + user.nom).toLowerCase().includes(texte));
    if (utilisateur && users.indexOf(utilisateur) != index) {
        afficherProfil(utilisateur);
    }
});

function afficherProfil(utilisateur) {

    const zone = document.getElementById("profilRecherche");
    zone.innerHTML = "";
    const rechercheHeader = document.createElement("div");
    rechercheHeader.classList.add("recherche-header");
    const rechercheAvatar = document.createElement("img");
    rechercheAvatar.classList.add("recherche-avatar");
    if (utilisateur.avatar) {
        rechercheAvatar.src = utilisateur.avatar;
    } else {
        rechercheAvatar.src = "../img/avatar.png";
    }
    const h2 = document.createElement("h2");
    h2.textContent = utilisateur.prenom + " " + utilisateur.nom;
    rechercheHeader.appendChild(rechercheAvatar);
    rechercheHeader.appendChild(h2);
    const boutonFollow = document.createElement("button");
    const userId = users.indexOf(utilisateur);
    if (users[index].followedUsers.includes(userId)) {
        boutonFollow.textContent = "Ne plus suivre";
    }
    else {
        boutonFollow.textContent = "Suivre";
    }

    boutonFollow.addEventListener("click", () => {
        if (users[index].followedUsers.includes(userId)) {
            users[index].followedUsers = users[index].followedUsers.filter(id => id != userId);
            users[userId].nbFollows -= 1;
            boutonFollow.textContent = "Suivre";
        }
        else {
            users[index].followedUsers.push(userId);
            users[userId].nbFollows += 1;
            boutonFollow.textContent = "Ne plus suivre";
        }
        sauvegarderUsers();
    });
    zone.appendChild(rechercheHeader);
    zone.appendChild(boutonFollow);
    showStats();
}

function showStats() {

    const zone = document.getElementById("stats");
    zone.innerHTML = "";
    let totalLikes = 0;
    let totalFollows = 0;
    let totalPosts = 0;
    const userId = index;
    for (const post of posts) {
        if (post.userId == userId) {
            totalPosts += 1;
            totalLikes += post.likes;
        }
    }
    for (const user of users) {
        if (user.followedUsers.includes(Number(index))) {
            totalFollows += 1;
        }
    }
    users[userId].nbLikes = totalLikes;
    users[userId].nbPosts = totalPosts;
    users[userId].nbFollows = totalFollows;
    const p1 = document.createElement("p");
    p1.textContent = "Posts publiés : " + totalPosts;
    const p2 = document.createElement("p");
    p2.textContent = "Likes reçus : " + totalLikes;
    const p3 = document.createElement("p");
    p3.textContent = "Followers : " + totalFollows;
    zone.appendChild(p1);
    zone.appendChild(p2);
    zone.appendChild(p3);
    sauvegarderUsers();
}

disconnect.addEventListener("click", () => {
    localStorage.removeItem("userConnect");
    window.location.href = "../signin/signin.html";
});

const recherchePost = document.getElementById("recherchePost");

recherchePost.addEventListener("input", () => {
    const texte = recherchePost.value.toLowerCase();
    const divPost = document.getElementById("posts");
    const allPosts = divPost.querySelectorAll(".post");
    for (let i = 0; i < allPosts.length; ++i) {
        const contenu = allPosts[i].textContent.toLowerCase();
        if (contenu.includes(texte)) {
            allPosts[i].style.display = "";
        } else {
            allPosts[i].style.display = "none";
        }
    }
});
