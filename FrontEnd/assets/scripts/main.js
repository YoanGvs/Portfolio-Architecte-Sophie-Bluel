import { WorksApi } from "./WorksApi.js";
import { displayWorks } from "./gallery.js";
const works = new WorksApi("http://localhost:5678/api/works");
const actualWorks = await works.getAll();
console.log(actualWorks);
displayWorks(actualWorks);
