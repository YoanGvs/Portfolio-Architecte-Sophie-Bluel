export function displayWorks(works) {
  const galleryElement = document.querySelector(".gallery");
  // Reset avant rendu : évite que les images s'empilent à chaque re-render (filtres)
  galleryElement.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    // data-id : pont avec la galerie modale pour retrait DOM ciblé après DELETE
    figure.dataset.id = work.id;
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    galleryElement.appendChild(figure);
  });
}
