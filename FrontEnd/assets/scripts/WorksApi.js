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
    // DELETE /works/{id} → 204 No Content si OK, donc on ne parse pas le body
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.ok;
  }
}
