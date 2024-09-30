"use client";

import {useForm, SubmitHandler} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {carSchema} from "@/validations/addCarSchema";
import UpLoadWiget from "@/components/UpLoadWiget";
import SendCarData from "@/utils/sendCarData";

type Inputs = {
  brand: string;
  year: number;
  vin: string;
  color: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  doors: number;
  driveType: string;
  bodyStyle: string;
  horsepower: number;
  torque: number;
  model: string;
};

export default function FormCart() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({
    resolver: zodResolver(carSchema),
  });

  async function SendFormData(data: Inputs) {
    const fechtData = await SendCarData(data);
    if (fechtData) {
      alert("Data send succesfully");
    } else {
      alert("Data send fail");
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    SendFormData(data);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-t from-slate-50 to-white my-20 p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto my-20 space-y-8"
      >
        <div className="space-y-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Add New Car</h1>
            <div className="w-full h-1 bg-gradient-to-r from-blue-300 to-blue-600 mt-2 animate-pulse" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                type="text"
                id="brand"
                placeholder="Ex. Toyota"
                {...register("brand")}
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">
                  {errors.brand.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                type="text"
                id="model"
                placeholder="Ex. Corolla"
                {...register("model")}
              />
              {errors.model && (
                <p className="text-red-500 text-sm">
                  {errors.model.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                type="number"
                id="year"
                placeholder="Ex. 2020"
                {...register("year")}
              />
              {errors.year && (
                <p className="text-red-500 text-sm">
                  {errors.year.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vin">VIN (Vehicle Identification Number)</Label>
              <Input
                type="text"
                id="vin"
                placeholder="Enter VIN"
                {...register("vin")}
              />
              {errors.vin && (
                <p className="text-red-500 text-sm">
                  {errors.vin.message?.toString()}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  type="text"
                  id="color"
                  placeholder="Ex. Red"
                  {...register("color")}
                />
                {errors.color && (
                  <p className="text-red-500 text-sm">
                    {errors.color.message?.toString()}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  type="number"
                  id="mileage"
                  placeholder="Ex. 50000"
                  {...register("mileage")}
                />
                {errors.mileage && (
                  <p className="text-red-500 text-sm">
                    {errors.mileage.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Details</h2>
            <div className="w-full h-1 bg-gradient-to-r from-blue-300 to-blue-600 mt-2 animate-pulse" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fuelType">Fuel Type</Label>
              <select
                id="fuelType"
                {...register("fuelType")}
                className="w-full p-2 border rounded bg-transparent"
              >
                <option value="">Choose fuel type</option>
                <option value="electric">Electric</option>
                <option value="diesel">Diesel</option>
                <option value="gas">Gas</option>
                <option value="gasoline">Gasoline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <select
                id="transmission"
                {...register("transmission")}
                className="w-full p-2 border rounded bg-transparent"
              >
                <option value="">Choose transmission type</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="cvt">CVT</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doors">Number of Doors</Label>
              <Input
                type="number"
                id="doors"
                placeholder="Ex. 2, 4"
                {...register("doors")}
              />
              {errors.doors && (
                <p className="text-red-500 text-sm">
                  {errors.doors.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="driveType">Drive Type</Label>
              <select
                id="driveType"
                {...register("driveType")}
                className="w-full p-2 border rounded bg-transparent"
              >
                <option value="">Choose drive type</option>
                <option value="awd">AWD</option>
                <option value="fwd">FWD</option>
                <option value="rwd">RWD</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyStyle">Body Style</Label>
              <select
                id="bodyStyle"
                {...register("bodyStyle")}
                className="w-full p-2 border rounded bg-transparent"
              >
                <option value="">Choose body style</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="truck">Truck</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horsepower">Horsepower</Label>
              <Input
                type="number"
                id="horsepower"
                placeholder="Ex. 150"
                {...register("horsepower")}
              />
              {errors.horsepower && (
                <p className="text-red-500 text-sm">
                  {errors.horsepower.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="torque">Torque (Nm)</Label>
              <Input
                type="number"
                id="torque"
                placeholder="Ex. 250"
                {...register("torque")}
              />
              {errors.torque && (
                <p className="text-red-500 text-sm">
                  {errors.torque.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 w-full flex justify-center items-center">
          <UpLoadWiget></UpLoadWiget>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
