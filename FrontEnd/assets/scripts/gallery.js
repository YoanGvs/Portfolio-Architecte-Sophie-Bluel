export function displayWorks(works) {
  const galleryElement = document.querySelector(".gallery");
  works.forEach((work) => {
    // 1. Créer les 3 éléments
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // 2. Configurer
    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;

    // 3. Brancher (du plus petit au plus grand)
    figure.appendChild(img);
    figure.appendChild(figcaption);
    galleryElement.appendChild(figure);
  });
}
