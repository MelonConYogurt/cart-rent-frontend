/* eslint-disable @next/next/no-img-element */
"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Fuel,
  Gauge,
  Power,
  Repeat,
  DoorOpen,
  Calendar,
  Wrench,
  DollarSign,
  Car,
} from "lucide-react";

import {Datum} from "@/types/tsTypes";
import {Button} from "./ui/button";
import Link from "next/link";

export function AdminCarCard({info}: {info: Datum}) {
  function DeletePost(post: Datum) {
    console.log("Delete post:", post);
  }

  function PublishPost(post: Datum) {
    console.log("Post published:", post);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg relative">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-2xl font-bold flex justify-between items-center">
          <span>
            {info.brand} {info.model}
          </span>
        </CardTitle>
        {info.available === true ? (
          <div className="bg-blue-300 rounded-sm p-2">Available</div>
        ) : (
          <div className="bg-red-300 rounded-sm p-2">Unavailable</div>
        )}
        {info.status === true ? (
          <div className="bg-blue-300 rounded-sm p-2">Published</div>
        ) : (
          <div className="bg-purple-300 rounded-sm p-2">Draft</div>
        )}
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InfoItem
          icon={<Calendar className="w-5 h-5" />}
          label="Year"
          value={info.year.toString()}
        />
        <InfoItem
          icon={<Car className="w-5 h-5" />}
          label="VIN"
          value={info.vin}
        />
        <InfoItem
          icon={
            <div
              className="w-5 h-5 rounded-full"
              style={{backgroundColor: info.color}}
            />
          }
          label="Color"
          value={info.color}
        />
        <InfoItem
          icon={<Gauge className="w-5 h-5" />}
          label="Mileage"
          value={`${info.mileage.toLocaleString()} miles`}
        />
        <InfoItem
          icon={<DoorOpen className="w-5 h-5" />}
          label="Doors"
          value={info.numberOfDoors.toString()}
        />
        <InfoItem
          icon={<Power className="w-5 h-5" />}
          label="Horsepower"
          value={`${info.horsePower} HP`}
        />
        <InfoItem
          icon={<Repeat className="w-5 h-5" />}
          label="Torque"
          value={`${info.torque} Nm`}
        />
        <InfoItem
          icon={<Fuel className="w-5 h-5" />}
          label="Fuel Type"
          value={info.fuelType}
        />
        <InfoItem
          icon={<Repeat className="w-5 h-5" />}
          label="Transmission"
          value={info.transmissionType}
        />
        <InfoItem
          icon={<Car className="w-5 h-5" />}
          label="Drive Type"
          value={info.driveType}
        />
        <InfoItem
          icon={<Car className="w-5 h-5" />}
          label="Body Type"
          value={info.bodyType}
        />
        <InfoItem
          icon={<DollarSign className="w-5 h-5" />}
          label="Price"
          value={`$${info.price.toLocaleString()}`}
        />
        {info.rent_days !== undefined && (
          <InfoItem
            icon={<Calendar className="w-5 h-5" />}
            label="Rent Days"
            value={info.rent_days.toString()}
          />
        )}
        {info.lastService && (
          <InfoItem
            icon={<Wrench className="w-5 h-5" />}
            label="Last Service"
            value={info.lastService}
          />
        )}
      </CardContent>
      <div className="px-6 pb-6">
        <img
          src={info.mediaUrl}
          alt={`${info.brand} ${info.model}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-end mx-6 gap-2 my-5">
        <Link legacyBehavior href={`/manage/${info.id}`}>
          <Button variant={"outline"} className="">
            Edit
          </Button>
        </Link>
        <Button
          variant={"outline"}
          className=""
          onClick={() => PublishPost(info)}
        >
          Publish
        </Button>
      </div>
      <Button
        className="absolute top-2 right-2 m-2 hover:bg-red-400 border-gray-600 transition-colors"
        variant={"outline"}
        onClick={() => DeletePost(info)}
      >
        Delete
      </Button>
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
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

export function AdminCarList({data}: {data: Datum[]}) {
  return (
    <>
      {data.map((car) => (
        <AdminCarCard key={car.vin} info={car} />
      ))}
    </>
  );
}
