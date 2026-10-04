import React, { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/authService.js";
import { api } from "../services/api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if token exists on mount and refresh profile
    const token = api.getToken();
    if (token) {
      authService
        .getProfile()
        .then((data) => {
          if (data?.user) {
            setUser(data.user);
          }
        })
        .catch((err) => {
          console.warn("Session check failed, clearing token:", err);
          authService.logout();
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    const handleAuthExpired = () => {
      setUser(null);
      setError("Your session has expired. Please log in again.");
    };

    window.addEventListener("stackflow_auth_expired", handleAuthExpired);
    return () => window.removeEventListener("stackflow_auth_expired", handleAuthExpired);
  }, []);

  const login = async (email, password, bypassOtp = false) => {
    setError(null);
    try {
      const data = await authService.login(email, password, bypassOtp);
      if (data?.user) {
        setUser(data.user);
      }
      return data;
    } catch (err) {
      setError(err.message || "Failed to log in.");
      throw err;
    }
  };

  const loginVerifyOtp = async (email, otp) => {
    setError(null);
    try {
      const data = await authService.loginVerifyOtp(email, otp);
      if (data?.user) {
        setUser(data.user);
      }
      return data;
    } catch (err) {
      setError(err.message || "Failed to verify OTP.");
      throw err;
    }
  };

  const registerRequestOtp = async (name, email, password) => {
    setError(null);
    try {
      return await authService.registerRequestOtp(name, email, password);
    } catch (err) {
      setError(err.message || "Failed to initiate registration.");
      throw err;
    }
  };

  const registerVerifyOtp = async (email, otp) => {
    setError(null);
    try {
      const data = await authService.registerVerifyOtp(email, otp);
      if (data?.user) {
        setUser(data.user);
      }
      return data;
    } catch (err) {
      setError(err.message || "Failed to verify registration code.");
      throw err;
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const data = await authService.register(name, email, password);
      if (data?.user) {
        setUser(data.user);
      }
      return data;
    } catch (err) {
      setError(err.message || "Failed to register account.");
      throw err;
    }
  };

  const resendOtp = async (email, type = "login") => {
    try {
      return await authService.resendOtp(email, type);
    } catch (err) {
      setError(err.message || "Failed to resend verification code.");
      throw err;
    }
  };

  const fetchOtp = async (email, type) => {
    try {
      return await authService.fetchOtp(email, type);
    } catch (err) {
      throw err;
    }
  };

  const sendTestOtp = async (email) => {
    try {
      return await authService.sendTestOtp(email);
    } catch (err) {
      throw err;
    }
  };

  const updateOtpSettings = async (otpEnabled) => {
    try {
      const data = await authService.updateOtpSettings(otpEnabled);
      if (data?.user) {
        setUser(data.user);
      }
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedUserData };
      localStorage.setItem("stackflow_user", JSON.stringify(merged));
      return merged;
    });
  };

  const deductCredit = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, credits: Math.max(0, (prev.credits ?? 100) - 1) };
      localStorage.setItem("stackflow_user", JSON.stringify(updated));
      return updated;
    });
  };

  const setCredits = (amount) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, credits: amount };
      localStorage.setItem("stackflow_user", JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    loginVerifyOtp,
    registerRequestOtp,
    registerVerifyOtp,
    register,
    resendOtp,
    fetchOtp,
    sendTestOtp,
    updateOtpSettings,
    logout,
    updateUser,
    deductCredit,
    setCredits,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
