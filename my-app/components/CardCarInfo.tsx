/* eslint-disable @next/next/no-img-element */
"use client";

import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Fuel, Gauge, Power, Repeat, DoorOpen} from "lucide-react";
import {Data, Datum} from "@/types/tsTypes";

export function SingleCardInfo({info}: {info: Datum}) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={info.mediaUrl}
          alt={`${info.brand} ${info.model}`}
          className="object-cover  ransition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h2 className="text-2xl font-bold">
            {info.brand} {info.model}
          </h2>
          <div className="flex justify-between items-center mt-2">
            <Badge variant="secondary" className="text-sm">
              {info.year}
            </Badge>
            <span className="text-sm font-semibold" style={{color: info.color}}>
              {info.color}
            </span>
          </div>
        </div>
      </div>
      <CardContent className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem
            icon={<Gauge className="w-5 h-5" />}
            label="Mileage"
            value={`${info.mileage.toLocaleString()} miles`}
          />
          <InfoItem
            icon={<Power className="w-5 h-5" />}
            label="Power"
            value={`${info.horsePower} HP`}
          />
          <InfoItem
            icon={<Fuel className="w-5 h-5" />}
            label="Fuel"
            value={info.fuelType}
          />
          <InfoItem
            icon={<Repeat className="w-5 h-5" />}
            label="Transmission"
            value={info.transmissionType}
          />
          <InfoItem
            icon={<DoorOpen className="w-5 h-5" />}
            label="Doors"
            value={info.numberOfDoors.toString()}
          />
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <span className="text-xs text-gray-400">VIN: {info.vin}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="p-2 bg-gray-700 rounded-full">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

export function MultipleCarInfo({data}: Data) {
  return (
    <div className="flex flex-wrap gap-8 p-8 bg-gradient-to-br from-gray-100 to-gray-200">
      {data.map((car) => (
        <SingleCardInfo key={car.vin} info={car} />
      ))}
    </div>
  );
}
