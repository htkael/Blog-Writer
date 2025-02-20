import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for CORS with credentials
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (username, password, password_conf, adminCode) => {
  try {
    const response = await api.post(`/auth/sign-up`, {
      username,
      password,
      password_conf,
      adminCode,
    });

    return response.data;
  } catch (err) {
    console.log("Error details:", err); // Let's see what the error looks like
    throw err.response ? err.response.data : { message: "Network error" };
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (err) {
    console.log("Login Error details:", err.response?.data || err);

    return err.response?.data || { message: "Failed to login" };
  }
};
