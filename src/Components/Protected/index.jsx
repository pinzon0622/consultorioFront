import React, { useState, useEffect } from "react";
import axios from "axios";

function ProtectedComponent({ token }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.logged_in_as.username);
        window.localStorage.setItem("username", response.data.logged_in_as.username);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProtectedData();
  }, []);

  return <p> Bienvenido {message}!</p>;
}

export default ProtectedComponent;
