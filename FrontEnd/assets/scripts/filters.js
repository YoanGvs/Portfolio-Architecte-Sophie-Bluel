import { displayWorks } from "./gallery.js";

export function displayFilters(categories, works) {
  const filtersElement = document.querySelector(".filters");
  filtersElement.innerHTML = "";

  const allCategories = [{ id: 0, name: "Tous" }, ...categories];

  allCategories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("filter-btn");
    if (category.id === 0) button.classList.add("active");

    button.addEventListener("click", () => {
      const filtered =
        category.id === 0
          ? works
          : works.filter((work) => work.categoryId === category.id);
      displayWorks(filtered);

      document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });

    filtersElement.appendChild(button);
  });
}
