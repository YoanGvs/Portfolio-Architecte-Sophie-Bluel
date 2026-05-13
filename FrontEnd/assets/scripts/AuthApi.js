export class AuthApi {
  constructor(url) {
    this.url = url;
  }

  async login(email, password) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    // fetch ne throw pas sur 4xx/5xx → on expose response.ok au caller
    return { ok: response.ok, data: await response.json() };
  }
}
