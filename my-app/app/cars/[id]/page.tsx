/* eslint-disable @next/next/no-img-element */
"use client";

import {useEffect, useState} from "react";
import {Heart, Calendar, Info} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {Datum} from "@/types/tsTypes";
import {Toaster, toast} from "sonner";
import GetAllCarsInfoFiltered from "@/utils/getAllCarsInfoFitered";

export default function CarRentalPage({params}: {params: {id: number}}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rentDays, setRentDays] = useState(1);
  const [car, setCar] = useState<Datum>();

  useEffect(() => {
    fetchData(params.id);
  }, [params.id]);

  async function fetchData(id: number) {
    try {
      const filter = `(filters: {carId: ${id}})`;
      const response = await GetAllCarsInfoFiltered(filter);
      const data = response.getAllCarsInfo;
      setCar(data[0]);
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error}`);
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleRentDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRentDays(parseInt(e.target.value) || 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster richColors />
      {car ? (
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold">
                {car.brand} {car.model} ({car.year})
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFavorite}
                    >
                      <Heart
                        className={
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500"
                        }
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={car.mediaUrl}
                  alt={`${car.brand} ${car.model}`}
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Color</Label>
                    <p>{car.color}</p>
                  </div>
                  <div>
                    <Label>Mileage</Label>
                    <p>{car.mileage} miles</p>
                  </div>
                  <div>
                    <Label>Fuel Type</Label>
                    <p>{car.fuelType}</p>
                  </div>
                  <div>
                    <Label>Transmission</Label>
                    <p>{car.transmissionType}</p>
                  </div>
                  <div>
                    <Label>Drive Type</Label>
                    <p>{car.driveType}</p>
                  </div>
                  <div>
                    <Label>Body Type</Label>
                    <p>{car.bodyType}</p>
                  </div>
                  <div>
                    <Label>Horse Power</Label>
                    <p>{car.horsePower} HP</p>
                  </div>
                  <div>
                    <Label>Torque</Label>
                    <p>{car.torque} lb-ft</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label htmlFor="rent-days">Rental Period (Days)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="rent-days"
                      type="number"
                      min="1"
                      value={rentDays}
                      onChange={handleRentDaysChange}
                      className="w-20 mr-2"
                    />
                    <Calendar className="text-gray-500" />
                  </div>
                </div>
                <div>
                  <Label>Total Price</Label>
                  <p className="text-2xl font-bold">${car.price * rentDays}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center">
              <Info className="mr-2 text-blue-500" />
              <span className="text-sm text-gray-500">
                Last serviced: {car.lastService}
              </span>
            </div>
            <Button>Rent Now</Button>
          </CardFooter>
        </Card>
      ) : (
        <div
          className="h-screen w-full flex justify-center items-center text-2xl"
          onClick={() => console.log(car)}
        >
          We are having problems, please reload the page 😕
        </div>
      )}
    </div>
  );
}
