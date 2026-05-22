import { WorksApi } from "./WorksApi.js";

const modal = document.querySelector("#modal");
const closeBtn = modal.querySelector(".modal-close");
const modalGallery = modal.querySelector(".modal-gallery");

const worksApi = new WorksApi("http://localhost:5678/api/works");

export function openModal() {
  modal.setAttribute("aria-hidden", "false");
  // Re-fetch à chaque ouverture pour refléter d'éventuels ajouts/suppressions
  loadModalGallery();
}

export function closeModal() {
  modal.setAttribute("aria-hidden", "true");
}

// Clic sur le backdrop = la modale elle-même, pas sur son contenu (modal-wrapper)
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

closeBtn.addEventListener("click", closeModal);

// Escape ferme seulement si la modale est ouverte (sinon listener inutile)
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

// Event delegation : un seul listener sur le conteneur gère TOUS les boutons poubelle,
// y compris ceux ajoutés après le chargement (re-fetch à chaque ouverture)
modalGallery.addEventListener("click", async (event) => {
  const deleteBtn = event.target.closest(".modal-delete");
  if (!deleteBtn) return;

  const figure = deleteBtn.closest(".modal-figure");
  const id = figure.dataset.id;
  const token = sessionStorage.getItem("token");

  const ok = await worksApi.delete(id, token);
  if (ok) {
    figure.remove();
    // Retire la même figure dans la galerie publique sans re-fetch (le data-id fait le pont)
    document.querySelector(`.gallery figure[data-id="${id}"]`)?.remove();
  } else {
    alert("Erreur lors de la suppression");
  }
});

async function loadModalGallery() {
  const works = await worksApi.getAll();
  modalGallery.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    figure.className = "modal-figure";
    // data-id servira au DELETE en 3.2
    figure.dataset.id = work.id;
    figure.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <button class="modal-delete" aria-label="Supprimer ${work.title}">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    modalGallery.appendChild(figure);
  });
}
