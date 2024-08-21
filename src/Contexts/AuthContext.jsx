import { createContext, useContext, useState } from "react";
import api from "../Api/api";
import { useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await api.post("/login", { username, password });
      setToken(response.data.access_token);
      window.localStorage.setItem("token", response.data.access_token);

      return true;
    } catch (error) {
      console.error("Inicio de sesión fallido", error);
      return false;
    }
  };



  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    setToken(null);
  };

  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
