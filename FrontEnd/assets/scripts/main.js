import { WorksApi } from "./WorksApi.js";
import { CategoriesApi } from "./CategoriesApi.js";
import { displayWorks } from "./gallery.js";
import { displayFilters } from "./filters.js";
import { initAdminMode } from "./adminMode.js";

const works = new WorksApi("http://localhost:5678/api/works");
const categories = new CategoriesApi("http://localhost:5678/api/categories");

const actualWorks = await works.getAll();
const actualCategories = await categories.getAll();

displayWorks(actualWorks);
displayFilters(actualCategories, actualWorks);
initAdminMode();
