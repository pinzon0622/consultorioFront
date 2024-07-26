import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/login", { username, password });
      setToken(response.data.access_token);
      return true;
    } catch (error) {
      console.error("Inicio de sesión fallido", error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
