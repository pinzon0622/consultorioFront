import { Button, Checkbox, Label, TextInput } from "flowbite-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isSuccess = await login(username, password);
      if (isSuccess) {
        navigate("/Admin");
      } else {
        setError(
          "Inicio de sesión fallido. Verifica tu nombre de usuario y contraseña."
        );
      }
    } catch (error) {
      console.error("Inicio de sesión fallido", error.response?.data || error.message);
      setError(
        "Inicio de sesión fallido. Verifica tu nombre de usuario y contraseña."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-cyan-800 h-screen">
      <form
        className="flex max-w-md flex-col gap-4  w-5/12 shadow-2xl p-10 bg-slate-950"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label className="text-white" htmlFor="email1" value="Tu correo" />
          </div>
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="email1"
            type="text"
            placeholder="username"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              className="text-white"
              htmlFor="password1"
              value="Tu contraseña"
            />
          </div>
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password1"
            type="password"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label className="text-white" htmlFor="remember">
            Recuerdame
          </Label>
        </div>
        <Button type="submit">Iniciar Sesión</Button>
      </form>
      {error && <p className="text-red-400 pt-5">{error}</p>}
    </div>
  );
}

export default LogIn;
