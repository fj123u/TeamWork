const data = localStorage.getItem("user");
const users = JSON.parse(data);
const index = localStorage.getItem("userConnect");
if (index === null || !users) {
    window.location.href = "../signin/signin.html";
}