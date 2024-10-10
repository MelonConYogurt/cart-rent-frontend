/* eslint-disable @next/next/no-img-element */
import {Car, Users, Clock, Award} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white">
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Acerca de AutoRent</h1>
          <p className="text-xl">
            Tu socio confiable en alquiler de autos desde 1995
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Nuestra Historia</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <p className="mb-4">
                Fundada en 1995, AutoRent nació con la visión de proporcionar a
                nuestros clientes la libertad de explorar el mundo sobre ruedas.
                Desde nuestros humildes comienzos con una flota de solo 10
                vehículos, hemos crecido hasta convertirnos en una de las
                empresas de alquiler de autos más respetadas del país.
              </p>
              <p>
                Nuestra pasión por el servicio al cliente y nuestro compromiso
                con la calidad nos han permitido expandirnos a más de 50
                ubicaciones en todo el país, ofreciendo una amplia gama de
                vehículos para satisfacer todas las necesidades de nuestros
                clientes.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://img.remediosdigitales.com/78a11b/ventas-autos-categoria-segmento-2022-mexico/840_560.jpg"
                alt="Imagen de la flota de autos"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Nuestra Misión</h2>
          <p className="text-lg mb-4">
            En AutoRent, nuestra misión es proporcionar a nuestros clientes una
            experiencia de alquiler de autos sin complicaciones, segura y
            placentera. Nos esforzamos por ofrecer vehículos de alta calidad, un
            servicio excepcional y precios competitivos para que cada viaje sea
            memorable.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Nuestros Valores</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="flex items-start">
              <Car className="mr-4 text-primary" />
              <div>
                <h3 className="font-semibold mb-2">Calidad</h3>
                <p>
                  Mantenemos nuestra flota en excelentes condiciones para
                  garantizar su seguridad y comodidad.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <Users className="mr-4 text-primary" />
              <div>
                <h3 className="font-semibold mb-2">Servicio al Cliente</h3>
                <p>
                  Nuestro equipo está dedicado a proporcionar un servicio amable
                  y eficiente en todo momento.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <Clock className="mr-4 text-primary" />
              <div>
                <h3 className="font-semibold mb-2">Eficiencia</h3>
                <p>
                  Valoramos su tiempo y nos esforzamos por hacer el proceso de
                  alquiler lo más rápido y sencillo posible.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <Award className="mr-4 text-primary" />
              <div>
                <h3 className="font-semibold mb-2">Innovación</h3>
                <p>
                  Constantemente buscamos formas de mejorar nuestros servicios y
                  adoptar nuevas tecnologías.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-16 bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            AutoRent en Números
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="text-muted-foreground">Ubicaciones</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">1000+</p>
              <p className="text-muted-foreground">Vehículos</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">100k+</p>
              <p className="text-muted-foreground">Clientes Satisfechos</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">25+</p>
              <p className="text-muted-foreground">Años de Experiencia</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">
            ¿Listo para comenzar tu viaje?
          </h2>
          <p className="mb-8 text-lg">
            Descubre nuestra amplia selección de vehículos y encuentra el
            perfecto para tu próxima aventura.
          </p>
          <Link
            href="/reservar"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Reserva Ahora
          </Link>
        </section>
      </main>
    </div>
  );
}
