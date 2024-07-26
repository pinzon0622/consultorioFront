
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

import { useLocation } from "react-router-dom";

const NavBar = () => {

    const location = useLocation();


  return (
    <Navbar fluid className="bg-custom-bg">
      <NavbarBrand href="/">
      <img
        src="src\assets\logo.png"
        className="mr-3 h-6 sm:h-9"
        alt="Logo"
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
        Consultorio dental
      </span>
      </NavbarBrand>
      <div className="flex md:order-2">
      <Button onClick={() => window.location.href = '/logIn'}>Iniciar Sesión</Button>
      <NavbarToggle />
      </div>
      <NavbarCollapse>
      <NavbarLink className="text-white" href="/" active={location.pathname === "/"}>
        Inicio
      </NavbarLink>
      <NavbarLink className="text-white" href="/About" active={location.pathname === "/About"}>Nosotros</NavbarLink>
      <NavbarLink className="text-white" href="/Services" active={location.pathname === "/Services"}>Servicios</NavbarLink>
      <NavbarLink className="text-white" href="/Contact" active={location.pathname === "/Contact"}>Contacto</NavbarLink>
      </NavbarCollapse>
    </Navbar>
    );
};

export default NavBar;
