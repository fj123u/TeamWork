const data = localStorage.getItem("user");
const users = JSON.parse(data);
const pp = users[0].avatar;
document.getElementById("avatar").src = pp;