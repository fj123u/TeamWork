const data = localStorage.getItem("user");
const users = JSON.parse(data);
const index = localStorage.getItem("userConnect");
const form = document.getElementById("form-post");
const add = document.getElementById("add");
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
        boutonLike.textContent = "🤍";
        const likes = document.createElement("span");
        likes.textContent = " " + posts[i]["likes"];
        const boutonCom = document.createElement("button");
        boutonCom.textContent = "🗨️";
        boutonCom.classList.add("com");
        const actions = document.createElement("div");
        actions.classList.add("actions");
        actions.appendChild(boutonLike);
        actions.appendChild(likes);
        actions.appendChild(boutonCom);
        div.appendChild(nom);
        div.appendChild(titre);
        div.appendChild(message);
        div.appendChild(actions);
        divPost.appendChild(div);
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
        const data = localStorage.getItem("post");
        let postId = 0;
        if (data != null)
        {
            const postsData = JSON.parse(data);
            postId = postsData[postsData.length - 1]["id"] + 1;
        }
        const commmentaires = {};
        posts.push({ nom: nom, prenom: prenom, titre: title, msg: msg, likes: nbLike, commentaires: commmentaires, id: postId });
        sauvegarderPost();
        location.reload();
    });
});

