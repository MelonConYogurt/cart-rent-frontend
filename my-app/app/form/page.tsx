"use client";

import {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export default function FormCart() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    vin: "",
    color: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    doors: "",
    driveType: "",
    bodyStyle: "",
    horsepower: "",
    torque: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({...prev, [name]: value}));
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-t from-slate-50 to-white my-20 p-10">
      <form className="max-w-md mx-auto my-20 space-y-8">
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
                name="brand"
                placeholder="Ex. Toyota"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                type="text"
                id="model"
                name="model"
                placeholder="Ex. Corolla"
                value={formData.model}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                type="number"
                id="year"
                name="year"
                placeholder="Ex. 2020"
                value={formData.year}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vin">VIN (Vehicle Identification Number)</Label>
              <Input
                type="text"
                id="vin"
                name="vin"
                placeholder="Enter VIN"
                value={formData.vin}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  type="text"
                  id="color"
                  name="color"
                  placeholder="Ex. Red"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  type="number"
                  id="mileage"
                  name="mileage"
                  placeholder="Ex. 50000"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  required
                />
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
              <Select
                name="fuelType"
                onValueChange={(value) => handleSelectChange("fuelType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="gas">Gas</SelectItem>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select
                name="transmission"
                onValueChange={(value) =>
                  handleSelectChange("transmission", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose transmission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="cvt">CVT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doors">Number of Doors</Label>
              <Input
                type="number"
                id="doors"
                name="doors"
                placeholder="Ex. 2, 4"
                value={formData.doors}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="driveType">Drive Type</Label>
              <Select
                name="driveType"
                onValueChange={(value) =>
                  handleSelectChange("driveType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose drive type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awd">AWD</SelectItem>
                  <SelectItem value="fwd">FWD</SelectItem>
                  <SelectItem value="rwd">RWD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyStyle">Body Style</Label>
              <Select
                name="bodyStyle"
                onValueChange={(value) =>
                  handleSelectChange("bodyStyle", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose body style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horsepower">Horsepower</Label>
              <Input
                type="number"
                id="horsepower"
                name="horsepower"
                placeholder="Ex. 150"
                value={formData.horsepower}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="torque">Torque (Nm)</Label>
              <Input
                type="number"
                id="torque"
                name="torque"
                placeholder="Ex. 250"
                value={formData.torque}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="dropzone-file" className="block">
            Upload Image
          </Label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
