
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
          src="src\assets\react.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Consultorio dental
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button>Iniciar Sesión</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active={location.pathname === "/"}>
          Home
        </NavbarLink>
        <NavbarLink href="/Acercade" active={location.pathname === "/Acercade"}>About</NavbarLink>
        <NavbarLink href="/Servicios" active={location.pathname === "/Servicios"}>Services</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavBar;
