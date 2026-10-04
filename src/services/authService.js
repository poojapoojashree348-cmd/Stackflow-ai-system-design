import { api } from "./api.js";

export const authService = {
  // Step 1: Request OTP for new account creation
  async registerRequestOtp(name, email, password) {
    return await api.post("/auth/register-request-otp", { name, email, password });
  },

  // Step 2: Verify registration OTP & finalize user creation
  async registerVerifyOtp(email, otp) {
    const data = await api.post("/auth/register-verify-otp", { email, otp });
    if (data.token) {
      api.setToken(data.token);
      localStorage.setItem("stackflow_user", JSON.stringify(data.user));
    }
    return data;
  },

  // Fallback direct register
  async register(name, email, password) {
    const data = await api.post("/auth/register", { name, email, password });
    if (data.token) {
      api.setToken(data.token);
      localStorage.setItem("stackflow_user", JSON.stringify(data.user));
    }
    return data;
  },

  // Step 1: Login attempt (may return requiresOtp: true)
  async login(email, password, bypassOtp = false) {
    const data = await api.post("/auth/login", { email, password, bypassOtp });
    if (data.token) {
      api.setToken(data.token);
      localStorage.setItem("stackflow_user", JSON.stringify(data.user));
    }
    return data;
  },

  // Step 2: Verify login OTP
  async loginVerifyOtp(email, otp) {
    const data = await api.post("/auth/login-verify-otp", { email, otp });
    if (data.token) {
      api.setToken(data.token);
      localStorage.setItem("stackflow_user", JSON.stringify(data.user));
    }
    return data;
  },

  // Resend OTP for either registration or login
  async resendOtp(email, type = "login") {
    return await api.post("/auth/resend-otp", { email, type });
  },

  // Fetch active OTP from backend (Direct fallback if user does not receive the email)
  async fetchOtp(email, type = "") {
    return await api.get(`/auth/fetch-otp?email=${encodeURIComponent(email)}&type=${encodeURIComponent(type)}`);
  },

  // Send Test OTP (for settings test preview)
  async sendTestOtp(email) {
    return await api.post("/auth/send-test-otp", { email });
  },

  // Update OTP Security Configuration
  async updateOtpSettings(otpEnabled) {
    const data = await api.put("/auth/otp-settings", { otpEnabled });
    if (data.user) {
      localStorage.setItem("stackflow_user", JSON.stringify(data.user));
    }
    return data;
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch {
      // Clean up even if network request fails
    } finally {
      api.setToken(null);
      localStorage.removeItem("stackflow_user");
    }
  },

  async getProfile() {
    const data = await api.get("/auth/profile");
    if (data.user) {
      localStorage.setItem("stackflow_user", JSON.stringify(data.user));
    }
    return data;
  },

  async updateProfile(profileData) {
    const data = await api.put("/auth/profile", profileData);
    if (data.user) {
      localStorage.setItem("stackflow_user", JSON.stringify(data.user));
    }
    return data;
  },

  async changePassword(currentPassword, newPassword) {
    return await api.put("/auth/change-password", { currentPassword, newPassword });
  },

  async getSmtpSettings() {
    return await api.get("/settings/smtp");
  },

  async updateSmtpSettings(smtpConfig) {
    return await api.post("/settings/smtp", smtpConfig);
  },

  async getEnvExample() {
    return await api.get("/config/env-example");
  },

  getCurrentUser() {
    try {
      const stored = localStorage.getItem("stackflow_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!api.getToken();
  }
};

export default authService;
