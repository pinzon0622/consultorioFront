import { HiCheck } from "react-icons/hi";

import About from "../About";
import Services from "../Services";
import Contact from "../Contact";

function Home() {
  return (
    <>
      <section
        id="home"
        className="w-full pt-12 md:pt-24 lg:pt-32 border-b border-cyan-200 bg-slate-950"
      >
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tight text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-cyan-100 ">
                Bienvenido a Nuestra Clínica Dental
              </h1>
              <p className="mx-auto max-w-[700px] text-cyan-200 md:text-xl">
                Ofrecemos atención dental de alta calidad para toda la familia.
                Nuestro equipo experimentado está dedicado a mejorar tu salud
                bucal y a realzar tu sonrisa.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-block text-cyan-200 bg-cyan-800 px-3 py-1 text-sm rounded-lg">
                Servicios Destacados
              </div>
              <ul className="grid gap-2">
                <li className="text-cyan-200">
                  <HiCheck className="mr-2 inline-block h-4 w-4 text-sky-800" />
                  Exámenes Dentales Integrales
                </li>
                <li className="text-cyan-200">
                  <HiCheck className="mr-2 inline-block h-4 w-4 text-sky-800" />
                  Limpiezas Profesionales
                </li>
                <li className="text-cyan-200">
                  <HiCheck className="mr-2 inline-block h-4 w-4 text-sky-800" />
                  Tratamientos de Blanqueamiento Dental
                </li>
                <li className="text-cyan-200">
                  <HiCheck className="mr-2 inline-block h-4 w-4 text-sky-800" />
                  Soluciones de Ortodoncia
                </li>
              </ul>
            </div>
          </div>
          <img
            src="src/assets/banner1.png"
            alt="Clínica Dental"
            className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
            width="900"
            height="300"
          />
        </div>
      </section>
      <About />
      <Services />
      <Contact />
    </>
  );
}

export default Home;
