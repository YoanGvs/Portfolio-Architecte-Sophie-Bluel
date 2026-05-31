import { openModal } from "./modal.js";

export function initAdminMode() {
  const token = sessionStorage.getItem("token");
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
  const wrapper = document.createElement("div");
  wrapper.className = "portfolio-header";

  const editBtn = document.createElement("a");
  editBtn.className = "edit-btn";
  editBtn.href = "#";
  editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
  editBtn.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
  });

  h2.parentNode.insertBefore(wrapper, h2);
  wrapper.appendChild(h2);
  wrapper.appendChild(editBtn);
}
