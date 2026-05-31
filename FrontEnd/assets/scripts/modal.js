import { WorksApi } from "./WorksApi.js";
import { CategoriesApi } from "./CategoriesApi.js";

const modal = document.querySelector("#modal");
const closeBtn = modal.querySelector(".modal-close");
const modalGallery = modal.querySelector(".modal-gallery");
const addBtn = modal.querySelector(".modal-add-btn");
const backBtn = modal.querySelector(".modal-back");
const addForm = modal.querySelector(".add-form");
const fileInput = modal.querySelector("#add-file");
const titleInput = modal.querySelector("#add-title");
const categorySelect = modal.querySelector("#add-category");
const submitBtn = modal.querySelector(".add-submit");
const uploadZone = modal.querySelector(".upload-zone");
const uploadPreview = modal.querySelector(".upload-preview");

const worksApi = new WorksApi("http://localhost:5678/api/works");
const categoriesApi = new CategoriesApi("http://localhost:5678/api/categories");

let categoriesLoaded = false;

export function openModal() {
  modal.setAttribute("aria-hidden", "false");
  switchView("gallery");
  loadModalGallery();
}

export function closeModal() {
  modal.setAttribute("aria-hidden", "true");
}

function switchView(name) {
  modal.setAttribute("data-active-view", name);
  if (name === "add" && !categoriesLoaded) {
    loadCategories();
  }
}

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

addBtn.addEventListener("click", () => switchView("add"));
backBtn.addEventListener("click", () => switchView("gallery"));

modalGallery.addEventListener("click", async (event) => {
  const deleteBtn = event.target.closest(".modal-delete");
  if (!deleteBtn) return;

  const figure = deleteBtn.closest(".modal-figure");
  const id = figure.dataset.id;
  const token = sessionStorage.getItem("token");

  const ok = await worksApi.delete(id, token);
  if (ok) {
    figure.remove();
    document.querySelector(`.gallery figure[data-id="${id}"]`)?.remove();
  } else {
    alert("Erreur lors de la suppression");
  }
});

async function loadModalGallery() {
  const works = await worksApi.getAll();
  modalGallery.innerHTML = "";
  works.forEach((work) => modalGallery.appendChild(createModalFigure(work)));
}

function createModalFigure(work) {
  const figure = document.createElement("figure");
  figure.className = "modal-figure";
  figure.dataset.id = work.id;
  figure.innerHTML = `
    <img src="${work.imageUrl}" alt="${work.title}">
    <button class="modal-delete" aria-label="Supprimer ${work.title}">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;
  return figure;
}

async function loadCategories() {
  const categories = await categoriesApi.getAll();
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    categorySelect.appendChild(option);
  });
  categoriesLoaded = true;
}

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  uploadPreview.src = URL.createObjectURL(file);
  uploadZone.classList.add("has-image");
  updateSubmitState();
});

titleInput.addEventListener("input", updateSubmitState);
categorySelect.addEventListener("change", updateSubmitState);

function updateSubmitState() {
  const ready =
    fileInput.files.length > 0 &&
    titleInput.value.trim() !== "" &&
    categorySelect.value !== "";
  submitBtn.disabled = !ready;
}

addForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);
  formData.append("title", titleInput.value.trim());
  formData.append("category", categorySelect.value);

  const token = sessionStorage.getItem("token");
  const { ok, data } = await worksApi.create(formData, token);

  if (ok) {
    addWorkToGalleries(data);
    resetForm();
    switchView("gallery");
  } else {
    alert("Erreur lors de l'ajout du projet");
  }
});

function addWorkToGalleries(work) {
  modalGallery.appendChild(createModalFigure(work));

  const publicFigure = document.createElement("figure");
  publicFigure.dataset.id = work.id;
  publicFigure.innerHTML = `
    <img src="${work.imageUrl}" alt="${work.title}">
    <figcaption>${work.title}</figcaption>
  `;
  document.querySelector(".gallery").appendChild(publicFigure);
}

function resetForm() {
  addForm.reset();
  uploadZone.classList.remove("has-image");
  uploadPreview.src = "";
  submitBtn.disabled = true;
}
