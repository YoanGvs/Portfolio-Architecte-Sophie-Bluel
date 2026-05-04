export class WorksApi {
  constructor(url) {
    this.url = url;
  }

  async getAll() {
    const response = await fetch(this.url);
    const works = await response.json();
    return works;
  }
}
