/* eslint-disable @next/next/no-img-element */
"use client";

import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Toaster, toast} from "sonner";
import Link from "next/link";
import {
  Calendar,
  Car,
  DollarSign,
  DoorOpen,
  Fuel,
  Gauge,
  Power,
  Repeat,
  Wrench,
} from "lucide-react";
import CarChangeAvailable from "@/utils/publishCar";
import CarChangeState from "@/utils/changeState";
import DeleteCarDb from "@/utils/deleteCar";
import {Datum} from "@/types/tsTypes";

export function AdminCarCard({info: initialInfo}: {info: Datum}) {
  const [info, setInfo] = useState(initialInfo);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleAvailabilityChange() {
    try {
      const newAvailability = !info.available;
      const data = await CarChangeAvailable(info.id, newAvailability);
      console.log(data);
      setInfo({...info, available: newAvailability});
      toast.success(
        newAvailability
          ? "Car has been made available"
          : "Car has been made unavailable"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to change availability");
    }
  }

  async function handleStateChange() {
    try {
      const newStatus = !info.status;
      const data = await CarChangeState(info.id, newStatus);
      console.log(data);
      setInfo({...info, status: newStatus});
      toast.success(
        newStatus ? "Car has been published" : "Car has been unpublished"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to change state");
    }
  }

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setIsDeleting(true);
      try {
        await DeleteCarDb(info.id);
        toast.success("Car has been deleted");
        // You might want to remove the car from the list or redirect here
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete car");
        setIsDeleting(false);
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg relative">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-2xl font-bold flex justify-between items-center">
          <span>
            {info.brand} {info.model}
          </span>
        </CardTitle>
        <div className="flex space-x-2">
          <StatusBadge
            label="Available"
            isActive={info.available ?? false}
            activeColor="bg-blue-300"
            inactiveColor="bg-red-300"
          />
          <StatusBadge
            label="Published"
            isActive={info.status ?? false}
            activeColor="bg-blue-300"
            inactiveColor="bg-purple-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
        <div className="mt-6">
          <img
            src={info.mediaUrl}
            alt={`${info.brand} ${info.model}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <Link href={`/manage/${info.id}`} passHref>
            <Button variant="outline">Edit</Button>
          </Link>
          <Button variant="outline" onClick={handleAvailabilityChange}>
            {info.available ? "Make Unavailable" : "Make Available"}
          </Button>
          <Button variant="outline" onClick={handleStateChange}>
            {info.status ? "Unpublish" : "Publish"}
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={isDeleting}
            className="hover:bg-red-400 border-gray-600 transition-colors"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>
      <Toaster richColors closeButton position="top-center" />
    </Card>
  );
}

function StatusBadge({
  label,
  isActive,
  activeColor,
  inactiveColor,
}: {
  label: string;
  isActive: boolean;
  activeColor: string;
  inactiveColor: string;
}) {
  return (
    <div className={`${isActive ? activeColor : inactiveColor} rounded-sm p-2`}>
      {isActive ? label : `Not ${label}`}
    </div>
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
    <div className="m-5 flex flex-wrap gap-5 mx-5 my-10">
      {data.map((car) => (
        <AdminCarCard key={car.id} info={car} />
      ))}
    </div>
  );
}
