const data = localStorage.getItem("user");
const users = JSON.parse(data);
const index = localStorage.getItem("userConnect");
const form = document.getElementById("form-post");
const add = document.getElementById("add");
const recherche = document.getElementById("recherche");
let likes = 0;
const follows = users[index].nbFollows;
const postss = users[index].nbPosts;
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
        const nom = document.createElement("h3");
        nom.textContent = posts[i]["prenom"] + " " + posts[i]["nom"];
        const titre = document.createElement("h2");
        titre.textContent = posts[i]["titre"];
        const message = document.createElement("p");
        message.textContent = posts[i]["msg"];
        const boutonLike = document.createElement("button");
        if (users[index].likedPosts.length > 0) {
            for (let p in users[index].likedPosts) {
                if (p == i) {
                    boutonLike.textContent = "❤️";
                }
                else {
                    boutonLike.textContent = "🤍";
                }
            }
        }
        else {
            boutonLike.textContent = "🤍";
        }
        boutonLike.addEventListener("click", () => {
            if (users[index].likedPosts.length > 0) {
                if (users[index].likedPosts.includes(i)) {
                    users[index].likedPosts = users[index].likedPosts.filter(post => post !== i);
                    posts[i].likes -= 1;
                    sauvegarderPost();
                    showStats();
                    sauvegarderUsers();
                    likes.textContent = " " + posts[i].likes;
                    boutonLike.textContent = "🤍";
                }
                else {
                    users[index].likedPosts.push(i);
                    posts[i].likes += 1;
                    sauvegarderPost();
                    showStats();
                    sauvegarderUsers();
                    likes.textContent = " " + posts[i].likes;
                    boutonLike.textContent = "❤️";
                }
            }
            else {
                users[index].likedPosts.push(i);
                posts[i].likes += 1;
                sauvegarderPost();
                showStats();
                sauvegarderUsers();
                likes.textContent = " " + posts[i].likes;
                boutonLike.textContent = "❤️";
            }
        });
        const likes = document.createElement("span");
        likes.textContent = " " + posts[i]["likes"];
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
        })
        const boutonComView = document.createElement("button");
        boutonComView.textContent = "Voir les commentaires";
        boutonComView.classList.add("com");
        let view = false;
        const zone = document.createElement("div");
        boutonComView.addEventListener("click", () => {
            if (!view) {
                zone.innerHTML = "";
                for (const commentaire of posts[i].commentaires) {
                    const p = document.createElement("p");
                    p.textContent = commentaire.auteur + " : " + commentaire.message;
                    zone.appendChild(p);
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
        const coms = document.createElement("span");
        const actions = document.createElement("div");
        actions.classList.add("actions");
        actions.appendChild(boutonLike);
        actions.appendChild(likes);
        actions.appendChild(boutonComAdd);
        actions.appendChild(boutonComView);
        actions.appendChild(coms);
        div.appendChild(nom);
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
            const postsData = JSON.parse(data);
            postId = postsData[postsData.length - 1]["id"] + 1;
        }
        const commmentaires = [];
        posts.push({ nom: nom, prenom: prenom, titre: title, msg: msg, likes: nbLike, coms: nbComs, commentaires: commmentaires, id: postId, userId: index });
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
    const h2 = document.createElement("h2");
    h2.textContent = utilisateur.prenom + " " + utilisateur.nom;
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
    zone.appendChild(h2);
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
    for (const user of users)
    {
        if (user.followedUsers.includes(Number(index)))
        {
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
