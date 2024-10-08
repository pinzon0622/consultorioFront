import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-cyan-200 bg-slate-950">
      <p className="text-xs text-cyan-200">
        &copy; 2024 MPS. Todos los derechos reservados.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4 text-cyan-200"
        >
          Politica de Privacidad
        </Link>
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4 text-cyan-200"
        >
          Terminos de Servicio
        </Link>
      </nav>
    </footer>
  );
};

export default FooterComponent;
