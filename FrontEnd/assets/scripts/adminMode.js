export function initAdminMode() {
  const token = sessionStorage.getItem("token");
  // Pas de token → mode public, rien à modifier
  if (!token) return;

  document.body.classList.add("is-admin");
  insertEditBanner();
  swapLoginToLogout();
  insertEditButton();
}

function insertEditBanner() {
  const banner = document.createElement("div");
  banner.className = "edit-mode-banner";
  banner.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Mode édition`;
  // prepend = inséré tout en haut du body, avant le header
  document.body.prepend(banner);
}

function swapLoginToLogout() {
  const loginLink = document.querySelector('nav a[href="./login.html"]');
  loginLink.textContent = "logout";
  loginLink.href = "#";
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.clear();
    window.location.reload();
  });
}

function insertEditButton() {
  const h2 = document.querySelector("#portfolio h2");
  // Wrapper flex pour aligner le h2 et le bouton sur la même ligne
  const wrapper = document.createElement("div");
  wrapper.className = "portfolio-header";

  const editBtn = document.createElement("a");
  editBtn.className = "edit-btn";
  editBtn.href = "#";
  editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
  // Placeholder : la modale (étape 3.1) prendra le relais sur le clic

  h2.parentNode.insertBefore(wrapper, h2);
  wrapper.appendChild(h2);
  wrapper.appendChild(editBtn);
}
