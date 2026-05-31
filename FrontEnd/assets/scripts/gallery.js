export function displayWorks(works) {
  const galleryElement = document.querySelector(".gallery");
  galleryElement.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
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
