const data = localStorage.getItem("user");
const users = JSON.parse(data);
const index = localStorage.getItem("userConnect");
if (index === null || !users) {
    window.location.href = "../signin/signin.html";
}
const pp = users[index].avatar;
if (pp === null)
{
    document.getElementById("avatar").src = "../img/avatar.png";
}
else
{
    document.getElementById("avatar").src = pp;
}
