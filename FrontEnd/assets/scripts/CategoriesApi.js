export class CategoriesApi {
  constructor(url) {
    this.url = url;
  }

  async getAll() {
    const response = await fetch(this.url);
    const categories = await response.json();
    return categories;
  }
}
