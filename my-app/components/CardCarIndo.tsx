/* eslint-disable @next/next/no-img-element */
"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Fuel, Gauge, Power, Repeat} from "lucide-react";
import {Data, Datum} from "@/types/tsTypes";

export function SingleCardInfo({info}: {info: Datum}) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={info.mediaUrl}
          alt={`${info.brand} ${info.model}`}
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {info.brand} {info.model}
          </span>
          <Badge variant="outline">{info.year}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Gauge className="w-5 h-5 mr-2" />
            <span>{info.mileage.toLocaleString()} miles</span>
          </div>
          <div className="flex items-center">
            <Power className="w-5 h-5 mr-2" />
            <span>{info.horsePower} HP</span>
          </div>
          <div className="flex items-center">
            <Fuel className="w-5 h-5 mr-2" />
            <span>{info.fuelType}</span>
          </div>
          <div className="flex items-center">
            <Repeat className="w-5 h-5 mr-2" />
            <span>{info.transmissionType}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">VIN: {info.vin}</span>
          <span className="text-sm font-semibold" style={{color: info.color}}>
            {info.color}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function MultipleCarInfo({data}: Data) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((car) => (
        <SingleCardInfo key={car.vin} info={car} />
      ))}
    </div>
  );
}
