function About() {
  return (
    <>
      <section
        id="about"
        className="w-full py-12 md:py-24 lg:py-32 bg-slate-950"
      >
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg px-3 py-1 text-sm text-cyan-200 bg-sky-800">
                Sobre Nosotros
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-cyan-100">
                La historia de nuestra clínica dental
              </h2>
              <p className="max-w-[900px] text-cyan-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nuestra clínica dental brinda atención excepcional a la
                comunidad desde hace más de 20 años. Dirigida por un equipo de
                dentistas experimentados y compasivos, estamos comprometidos a
                ayudar a nuestros pacientes a lograr y mantener una salud bucal
                óptima.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              src="src/assets/banner2.png"
              alt="Dental Clinic Team"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              width="550"
              height="310"
            />
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-2xl font-bold text-cyan-100">
                Conozca a nuestro equipo dental
              </h3>
              <p className="text-cyan-200">
                Nuestro equipo de dentistas, higienistas y personal de apoyo
                experimentados se dedica a brindar atención personalizada e
                integral a cada uno de nuestros pacientes. Con un enfoque en la
                educación y la comodidad del paciente, trabajamos en estrecha
                colaboración con usted para desarrollar un plan de tratamiento
                que satisfaga sus necesidades y objetivos únicos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
