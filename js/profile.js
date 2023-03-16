let access_token = localStorage.getItem("access_token");

if (!access_token) {
  window.location.replace("http://localhost:8000/login.html");
}

const logoutButton = document.querySelector(".logout-btn");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("access_token");
  window.location.replace("http://localhost:8000/login.html");
});
