/* eslint-disable @next/next/no-img-element */
"use client";

import {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {carSchema} from "@/validations/addCarSchema";
import {Toaster, toast} from "sonner";
import UpLoadWiget from "@/components/UpLoadWiget";
import SendCarData from "@/utils/sendCarData";
import {z} from "zod";

type Inputs = z.infer<typeof carSchema>;

export default function FormCart() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(carSchema),
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Form submitted", data);
    if (imageUrl) {
      const updatedData = {
        ...data,
        mediaUrl: imageUrl,
      };
      try {
        const fetchData = await SendCarData(updatedData);
        if (fetchData) {
          toast.success("Data sent successfully");
          reset();
          setImageUrl("");
          setIsDisabled(false);
        } else {
          toast.warning("Data send failed");
        }
      } catch (error) {
        console.error("Error sending data:", error);
        toast.error("An error occurred while sending data");
      }
    } else {
      toast.warning("No image found, please upload one");
    }
  };

  function handelCancelImg() {
    setImageUrl("");
    setIsDisabled(false);
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-t from-slate-50 to-white my-20 p-10">
      <Toaster richColors />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto my-20 space-y-8 ring-1 p-8 rounded-lg"
      >
        <div className="space-y-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Add New Car</h1>
            <div className="w-full h-1 bg-gradient-to-r from-blue-300 to-blue-600 mt-2 animate-pulse rounded-lg" />
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
            <div className="w-full h-1 bg-gradient-to-r from-blue-300 to-blue-600 mt-2 animate-pulse rounded-lg" />
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
              {errors.fuelType?.message && (
                <p className="text-red-500 text-sm">
                  {errors.fuelType.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmissionType">Transmission</Label>
              <select
                id="transmissionType"
                {...register("transmissionType")}
                className="w-full p-2 border rounded bg-transparent"
              >
                <option value="">Choose transmission type</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="cvt">CVT</option>
              </select>
              {errors.transmissionType?.message && (
                <p className="text-red-500 text-sm">
                  {errors.transmissionType.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="doors">Number of Doors</Label>
              <Input
                type="number"
                id="numberOfDoors"
                placeholder="Ex. 2, 4"
                {...register("numberOfDoors")}
              />
              {errors.numberOfDoors && (
                <p className="text-red-500 text-sm">
                  {errors.numberOfDoors.message?.toString()}
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
              {errors.driveType?.message && (
                <p className="text-red-500 text-sm">
                  {errors.driveType.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyType">Body Style</Label>
              <select
                id="bodyType"
                {...register("bodyType")}
                className="w-full p-2 border rounded bg-transparent"
              >
                <option value="">Choose body style</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="truck">Truck</option>
              </select>
              {errors.bodyType?.message && (
                <p className="text-red-500 text-sm">
                  {errors.bodyType.message?.toString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="horsePower">Horsepower</Label>
              <Input
                type="number"
                id="horsePower"
                placeholder="Ex. 150"
                {...register("horsePower")}
              />
              {errors.horsePower && (
                <p className="text-red-500 text-sm">
                  {errors.horsePower.message?.toString()}
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

        <div className="space-y-4 w-full flex flex-col gap-5 justify-center items-center rounded-lg">
          <UpLoadWiget
            onUploadComplete={(url: string) => {
              setImageUrl(url);
              setIsDisabled(true);
            }}
            isDisabledProp={isDisabled}
          ></UpLoadWiget>
          {imageUrl ? (
            <div className="relative">
              <img
                src={imageUrl}
                alt="img"
                className="w-full h-32 object-cover rounded-lg ring-1"
              />
              <div
                onClick={() => handelCancelImg()}
                className="absolute -top-1 -right-1 rounded-full w-5 h-5 bg-blue-600 inline-flex items-center justify-center text-white cursor-pointer"
              >
                x
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <Button
            type="submit"
            className="w-full bg-transparent text-black border border-blue-500 hover:bg-blue-300 transition-colors"
          >
            Submit
          </Button>
          <Button
            type="reset"
            className="w-full bg-transparent text-black border border-red-500 hover:bg-red-300 transition-colors"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
