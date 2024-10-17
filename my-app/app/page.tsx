/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import {Button} from "@/components/ui/button";
import {CarIcon, MapPinIcon, PhoneIcon, StarIcon} from "lucide-react";
import {MultipleCarInfo} from "@/components/CardCarInfo";
import GetAllCarsInfoFiltered from "@/utils/getAllCarsInfoFitered";
import {Datum} from "@/types/tsTypes";
import {useState, useEffect} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent} from "@/components/ui/card";

export default function Home() {
  const [data, setData] = useState<Datum[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllCarsInfoFiltered("", 3, 0);
        if (response) {
          console.log(response);
          setData(response.data.cars);
        } else {
          const error = await response.json();
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50">
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
          <div className="md:col-span-5 md:mt-0 md:flex">
            <img
              className="rounded-lg object-cover w-full m-5 p-5"
              src="/car.png"
              alt="Coche de lujo"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Vehículos destacados
          </h2>
          <div className="flex flex-wrap">
            {data && data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MultipleCarInfo data={data} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

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

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((testimonial, index) => (
              <div
                key={testimonial}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={`/client-${index + 1}.jpg`}
                    alt={`Cliente ${testimonial}`}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
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

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nuestras marcas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-20">
            <img src="/mazda.svg" alt="" />
            <img src="/mercedes.svg" alt="" />
            <img src="/toyota.svg" alt="" />
            <img src="/renault.svg" alt="" />
            <img src="/porsche.svg" alt="" />
            <img src="/chevrolet.svg" alt="" />
          </div>
        </div>
      </section>

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
    </div>
  );
}
