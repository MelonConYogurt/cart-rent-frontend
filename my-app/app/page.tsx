import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  CalendarIcon,
  CarIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
          <div className="content-center justify-self-start md:col-span-7 md:text-start">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
              Alquila tu auto ideal
              <br />
              ¡Hasta 50% de descuento!
            </h1>
            <p className="max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg mb-3 lg:mb-5 lg:text-xl">
              Explora nuestra flota de vehículos y encuentra el perfecto para tu
              próxima aventura.
            </p>
            <Button size="lg" className="font-semibold">
              Reserva ahora
            </Button>
          </div>
          <div className="hidden md:col-span-5 md:mt-0 md:flex">
            <img
              className="rounded-lg object-cover"
              src="/placeholder.svg?height=400&width=600"
              alt="Coche de lujo"
              width={600}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Encuentra tu vehículo
          </h2>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <Input
                type="text"
                placeholder="Ubicación de recogida"
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <Input
                type="date"
                placeholder="Fecha de recogida"
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <Input
                type="date"
                placeholder="Fecha de devolución"
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <Button className="w-full">Buscar</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Vehículos destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((car) => (
              <div
                key={car}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={`Coche ${car}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Modelo de Coche {car}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Descripción breve del vehículo.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">$50/día</span>
                    <Button variant="outline">Reservar</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <CarIcon className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Amplia selección de vehículos
              </h3>
              <p className="text-gray-600">
                Desde económicos hasta de lujo, tenemos el coche perfecto para
                ti.
              </p>
            </div>
            <div className="text-center">
              <MapPinIcon className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Ubicaciones convenientes
              </h3>
              <p className="text-gray-600">
                Recoge y devuelve tu vehículo en múltiples ubicaciones.
              </p>
            </div>
            <div className="text-center">
              <PhoneIcon className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Atención al cliente 24/7
              </h3>
              <p className="text-gray-600">
                Estamos aquí para ayudarte en cualquier momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((testimonial) => (
              <div
                key={testimonial}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={`/placeholder.svg?height=50&width=50`}
                    alt={`Cliente ${testimonial}`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Cliente {testimonial}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Excelente servicio y vehículos en perfectas condiciones.
                  ¡Definitivamente volveré a alquilar con ellos!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logos Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nuestras marcas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Your existing brand logos here */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="mb-8 text-lg">
            Reserva tu vehículo hoy y obtén un 10% de descuento en tu primera
            reserva.
          </p>
          <Button size="lg" variant="secondary" className="font-semibold">
            Reserva ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre nosotros</h3>
              <p className="text-sm">
                Somos tu mejor opción para alquilar vehículos de calidad a
                precios competitivos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="text-sm">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Inicio
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Vehículos
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Reservas
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <p className="text-sm mb-2">Teléfono: (123) 456-7890</p>
              <p className="text-sm mb-2">Email: info@tualquiler.com</p>
              <p className="text-sm">Dirección: Calle Principal 123, Ciudad</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                {/* Add your social media icons here */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>
              &copy; 2024 Tu Empresa de Alquiler de Autos. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
