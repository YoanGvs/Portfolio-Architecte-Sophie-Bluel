import { displayWorks } from "./gallery.js";

export function displayFilters(categories, works) {
  const filtersElement = document.querySelector(".filters");
  filtersElement.innerHTML = "";

  // id 0 = "Tous" (les vraies catégories de l'API ont des id ≥ 1)
  const allCategories = [{ id: 0, name: "Tous" }, ...categories];

  allCategories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("filter-btn");
    if (category.id === 0) button.classList.add("active");

    button.addEventListener("click", () => {
      // "Tous" → toute la galerie, sinon on filtre par categoryId
      const filtered =
        category.id === 0
          ? works
          : works.filter((work) => work.categoryId === category.id);
      displayWorks(filtered);

      // Sélection unique : on retire active de tous puis on l'ajoute au cliqué
      document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });

    filtersElement.appendChild(button);
  });
}
