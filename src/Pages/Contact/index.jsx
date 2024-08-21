function Contact() {
  return (
    <>
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-cyan-800 text-cyan-100 px-3 py-1 text-sm">
                Contáctanos
              </div>
              <h2 className="text-3xl text-cyan-100 font-bold tracking-tighter sm:text-5xl">
                Visita Nuestra Clínica
              </h2>
              <p className="max-w-[900px] text-cyan-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Puedes encontrarnos en la siguiente dirección o comunicarte con nosotros por teléfono o correo electrónico.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-md justify-center space-y-4 flex lg:flex-row flex-col gap-24">
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-cyan-100">Dirección</h3>
                <p className="text-cyan-200">123 Calle Principal, Barbosa, Santander.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-cyan-100">Teléfono</h3>
                <p className="text-cyan-200">(+57) 3123378900</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-cyan-100">Correo Electrónico</h3>
                <p className="text-cyan-200">info@clinicadental.com</p>
              </div>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1668.5014060099338!2d-73.61062876074482!3d5.941213918034705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1724192161784!5m2!1ses!2sco"
                width="400"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
