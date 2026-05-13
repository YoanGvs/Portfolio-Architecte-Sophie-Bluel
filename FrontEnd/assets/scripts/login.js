import { AuthApi } from "./AuthApi.js";

const authApi = new AuthApi("http://localhost:5678/api/users/login");
const form = document.querySelector("#login form");
const errorMessage = document.querySelector(".login-error");

form.addEventListener("submit", async (event) => {
  // Empêche le rechargement automatique de la page par le navigateur
  event.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  const result = await authApi.login(email, password);

  if (result.ok) {
    // sessionStorage : token effacé à la fermeture du navigateur (plus sûr que localStorage)
    sessionStorage.setItem("token", result.data.token);
    sessionStorage.setItem("userId", result.data.userId);
    window.location.href = "./index.html";
  } else {
    errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
  }
});
