export class WorksApi {
  constructor(url) {
    this.url = url;
  }

  async getAll() {
    const response = await fetch(this.url);
    const works = await response.json();
    return works;
  }

  async delete(id, token) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.ok;
  }

  async create(formData, token) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return { ok: response.ok, data: await response.json() };
  }
}
