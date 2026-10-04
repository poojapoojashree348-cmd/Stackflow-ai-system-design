const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

class ApiService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  getToken() {
    return localStorage.getItem("stackflow_token");
  }

  setToken(token) {
    if (token) {
      localStorage.setItem("stackflow_token", token);
    } else {
      localStorage.removeItem("stackflow_token");
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const token = this.getToken();

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      // Expired or unauthorized JWT handling
      if (response.status === 401 || response.status === 403) {
        if (!endpoint.includes("/auth/login") && !endpoint.includes("/auth/register")) {
          // Token is invalid/expired
          this.setToken(null);
          localStorage.removeItem("stackflow_user");
          window.dispatchEvent(new CustomEvent("stackflow_auth_expired"));
        }
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.error || data.message || `Request failed with status ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      if (!err.status) {
        err.message = err.message || "Network error. Please check your internet connection or server status.";
      }
      throw err;
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, { method: "GET", headers });
  }

  post(endpoint, body = {}, headers = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers
    });
  }

  put(endpoint, body = {}, headers = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers
    });
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, { method: "DELETE", headers });
  }
}

export const api = new ApiService();
export default api;
