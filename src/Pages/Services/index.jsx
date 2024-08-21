import { HiOutlineEmojiHappy } from "react-icons/hi";

function Services() {
  const Card = ({ title, description }) => {
    return (
      <div className="flex flex-col items-center justify-center gap-4  bg-slate-950 p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md">
        <HiOutlineEmojiHappy className="h-12 w-12 text-sky-800" />
        <h3 className="text-xl font-bold text-cyan-100">{title}</h3>
        <p className="text-muted-foreground text-center text-cyan-200">
          {description}
        </p>
      </div>
    );
  };

  return (
    <>
      <section
        id="services"
        className="w-full py-12 md:py-24 lg:py-32 bg-cyan-800"
      >
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-cyan-200 text-sky-800 px-3 py-1 text-sm">
                Nuestros Servicios
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-cyan-100">
                Cuidado Dental Integral
              </h2>
              <p className="max-w-[900px] text-cyan-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                En nuestra clínica dental, ofrecemos una amplia gama de
                servicios para satisfacer todas tus necesidades de salud bucal.
                Desde cuidado preventivo hasta tratamientos avanzados, nuestro
                equipo está dedicado a ayudarte a lograr una sonrisa hermosa y
                saludable.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card
              title="Exámenes Dentales"
              description="Los exámenes dentales regulares nos permiten detectar y prevenir problemas de salud bucal de manera temprana."
            />
            <Card
              title="Limpieza Dental"
              description="Nuestros servicios de limpieza dental profesional eliminan la placa y el sarro para una sonrisa más brillante."
            />
            <Card
              title="Blanqueamiento"
              description="Ilumina tu sonrisa con nuestros tratamientos de blanqueamiento dental seguros y efectivos."
            />
            <Card
              title="Ortodoncia"
              description="Alinea tus dientes y mejora tu mordida con nuestras soluciones de ortodoncia."
            />
            <Card
              title="Rellenos Dentales"
              description="Nuestros rellenos dentales restauran y protegen tus dientes de una mayor caries."
            />
            <Card
              title="Conducto"
              description="Nuestros dentistas expertos ofrecen tratamientos de conducto suaves y efectivos."
            />
            <Card
              title="Implantes Dentales"
              description="Restaura tu sonrisa con nuestras soluciones de implantes dentales de alta calidad."
            />
            <Card
              title="Cosmética Dental"
              description="Mejora tu sonrisa con nuestra gama de tratamientos dentales cosméticos."
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
