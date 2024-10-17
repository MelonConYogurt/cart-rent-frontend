/* eslint-disable @next/next/no-img-element */
"use client";

import {useState} from "react";
import Link from "next/link";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Heart, Fuel, Gauge, Calendar, Car} from "lucide-react";
import {Separator} from "./ui/separator";
import {Datum} from "@/types/tsTypes";

export function SingleCardInfo({info}: {info: Datum}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden flex justify-center items-center">
        <img
          src={info.mediaUrl || "/placeholder.svg?height=400&width=600"}
          alt={`${info.brand} ${info.model}`}
          className=" h-[650px] object-cover rounded-t-lg"
        />
        <Badge
          variant={info.available ? "default" : "secondary"}
          className="absolute top-2 right-2"
        >
          {info.available ? "Disponible" : "No disponible"}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{`${info.brand} ${info.model}`}</h2>
            <span className="text-xl font-semibold">{`$${info.price.toLocaleString()}`}</span>
          </div>
          <div>
            <h1>Details</h1>
            <Separator></Separator>
            <br />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{info.year}</span>
              </div>
              <div className="flex items-center">
                <Fuel className="mr-2 h-5 w-5" />
                <span>{info.fuelType}</span>
              </div>
              <div className="flex items-center">
                <Gauge className="mr-2 h-5 w-5" />
                <span>{`${info.mileage} millas`}</span>
              </div>
              <div className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                <span>{info.bodyType}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{`${info.horsePower} HP | ${info.transmissionType} | ${info.driveType}`}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-current text-red-500" : ""
            }`}
          />
        </Button>
        <Link href={`/cars/${info.id}`} passHref>
          <Button>Ver más detalles</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export function MultipleCarInfo({data}: {data: Datum[]}) {
  return (
    <>
      {data.map((car: Datum) => (
        <SingleCardInfo key={car.vin} info={car} />
      ))}
    </>
  );
}
