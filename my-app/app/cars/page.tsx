"use client";

import GetAllCarsInfo from "@/utils/getAllCarsInfo";
import GetAllColors from "@/utils/getAllColors";
import GetAllBrands from "@/utils/getAllInfoBrands";
import {useState, useEffect} from "react";
import {Data, FilterData} from "@/types/tsTypes";
import {MultipleCarInfo} from "@/components/CardCarInfo";
import {toast, Toaster} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Filters} from "@/types/tsTypes";

function ListCars() {
  const [data, setData] = useState<Data>();
  const [colors, setColors] = useState<FilterData[]>([]);
  const [brands, setBrands] = useState<FilterData[]>([]);
  const driveTypes = ["rwd", "fwd", "awd"];
  const transmissionTypes = ["manual", "automatic", "cvt"];
  const fuelTypes = ["electric", "gas", "diesel", "gasoline"];

  const [filters, setFilters] = useState<Filters>({
    brand: null,
    color: null,
    fuelType: null,
    driveType: null,
    transmissionType: null,
    mileageMin: null,
    mileageMax: null,
    priceMin: null,
    priceMax: null,
  });

  function handleChangeFilters(name: string | number, value: string | number) {
    console.log(name, value);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllCarsInfo();
        const responseColors = await GetAllColors();
        const responseBrands = await GetAllBrands();
        if (response) {
          console.log(response);
          setData(response);
          setColors(responseColors);
          setBrands(responseBrands);
          toast.success("Showing all cars available");
        } else {
          const error = await response.json();
          const result = error.data;
          toast.error(`Error: ${result}`);
        }
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-row">
      <Toaster richColors />
      {data && data.getAllCarsInfo.length > 0 ? (
        <section className="mx-10 my-20 grid grid-cols-[300px_minmax(900px,_1fr)]">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-4">Filters</h1>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Colors</h2>
              <div className="flex flex-col gap-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div
                      className={`rounded-full w-8 h-8 cursor-pointer  ring-black ${
                        filters.color === color.name
                          ? "ring-red-600 ring-4"
                          : "ring-1"
                      }`}
                      style={{backgroundColor: `${color.name}`}}
                      title={color.name}
                    ></div>
                    <Checkbox
                      value={color.name}
                      id={`${color.name}`}
                      onClick={() => handleChangeFilters("color", color.name)}
                    />
                    <Label htmlFor={`${color.name}`}>{color.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Brands</h2>
              <div className="space-y-2">
                {brands.map((brand, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${index}`}
                      onClick={() => handleChangeFilters("brand", brand.name)}
                    />
                    <Label htmlFor={`brand-${index}`}>{brand.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Drive Type</h2>
              <div className="space-y-2">
                {driveTypes.map((type, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`drive-${type}`}
                      onClick={() => handleChangeFilters("driveType", type)}
                    />
                    <Label htmlFor={`drive-${type}`}>
                      {type.toUpperCase()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Transmission Type</h2>
              <div className="space-y-2">
                {transmissionTypes.map((type, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`transmission-${type}`}
                      onClick={() =>
                        handleChangeFilters("transmissionType", type)
                      }
                    />
                    <Label htmlFor={`transmission-${type}`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Fuel Type</h2>
              <div className="space-y-2">
                {fuelTypes.map((type, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fuel-${type}`}
                      onClick={() => handleChangeFilters("fuelType", type)}
                    />
                    <Label htmlFor={`fuel-${type}`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Price Range</h2>
              <div className="flex space-x-2">
                <div className="space-y-1">
                  <Label htmlFor="min-price">Min</Label>
                  <Input
                    id="min-price"
                    type="number"
                    placeholder="Min Price"
                    value={filters.priceMin ?? ""}
                    onChange={(e) =>
                      handleChangeFilters("priceMin", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="max-price">Max</Label>
                  <Input
                    id="max-price"
                    type="number"
                    placeholder="Max Price"
                    value={filters.priceMax ?? ""}
                    onChange={(e) =>
                      handleChangeFilters("priceMax", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Kilometers Range</h2>
              <div className="flex space-x-2">
                <div className="space-y-1">
                  <Label htmlFor="min-km">Min</Label>
                  <Input
                    id="min-km"
                    type="number"
                    placeholder="Min Km"
                    value={filters.mileageMin ?? ""}
                    onChange={(e) =>
                      handleChangeFilters("mileageMin", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="max-km">Max</Label>
                  <Input
                    id="max-km"
                    type="number"
                    placeholder="Max Km"
                    value={filters.mileageMax ?? ""}
                    onChange={(e) =>
                      handleChangeFilters("mileageMax", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mx-5 my-10">
            <MultipleCarInfo data={data.getAllCarsInfo} />
          </div>
        </section>
      ) : (
        <section className="h-screen flex flex-wrap gap-5 mx-5 my-10">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-[620px] w-[450px] rounded-xl animate-pulse" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default ListCars;
