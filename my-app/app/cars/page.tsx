"use client";

import {useState, useEffect} from "react";
import {toast, Toaster} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import GetAllCarsInfo from "@/utils/getAllCarsInfo";
import GetAllCarsInfoFiltered from "@/utils/getAllCarsInfoFitered";
import GetAllColors from "@/utils/getAllColors";
import GetAllBrands from "@/utils/getAllInfoBrands";
import {Data, FilterData, Filters} from "@/types/tsTypes";
import {MultipleCarInfo} from "@/components/CardCarInfo";

export default function ListCars() {
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

  function handleChangeFilters(
    name: string | number,
    value: string | number,
    isChecked?: boolean
  ) {
    setFilters((prev) => {
      let newFilters;
      if (typeof isChecked === "boolean") {
        newFilters = {
          ...prev,
          [name]: isChecked ? value : null,
        };
      } else if (typeof value === "number" || typeof value === "string") {
        const parsedValue = value === "" ? null : parseFloat(value as string);
        newFilters = {
          ...prev,
          [name]:
            parsedValue === null || Number.isNaN(parsedValue)
              ? null
              : parsedValue,
        };
      } else {
        newFilters = {
          ...prev,
          [name]: value,
        };
      }
      console.log("New filter applied:", newFilters);
      return newFilters;
    });
  }

  async function fetchDataFiltered(filters: string) {
    try {
      console.log("Filter passed to fetch:", filters);
      setData(undefined);
      const responseFilteredCars = await GetAllCarsInfoFiltered(filters);
      if (responseFilteredCars.getAllCarsInfo.length > 0) {
        setData(responseFilteredCars);
        toast.success("Showing filtered cars");
      } else {
        toast.error("No cars found with those filters");
      }
    } catch (error) {
      toast.error(`Failed: ${error}`);
    }
  }

  useEffect(() => {
    const filterStr = makeFilter(filters);
    fetchDataFiltered(filterStr);
  }, [filters]);

  function makeFilter(data: Filters) {
    let filterStr = "";
    Object.entries(data).forEach(([key, value]) => {
      if (value != null && typeof value === "string") {
        filterStr += `${key}: "${value}", `;
      } else if (value != null && typeof value === "number") {
        filterStr += `${key}: ${value}, `;
      }
    });
    return filterStr;
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
          toast.success("Showing all available cars");
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
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Toaster richColors position="bottom-left" />
      <aside className="w-full md:w-80 p-6 border-r">
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Filters</h1>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Colors</h2>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`rounded-full w-8 h-8 cursor-pointer ${
                          filters.color === color.name
                            ? "ring-2 ring-primary"
                            : "ring-1 ring-border"
                        }`}
                        style={{backgroundColor: `${color.name}`}}
                        title={color.name}
                        onClick={() =>
                          handleChangeFilters(
                            "color",
                            color.name,
                            filters.color !== color.name
                          )
                        }
                      ></div>
                      <span className="text-xs mt-1">{color.name}</span>
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
                        onCheckedChange={(checked) =>
                          handleChangeFilters("brand", brand.name, checked)
                        }
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
                        onCheckedChange={(checked) =>
                          handleChangeFilters("driveType", type, checked)
                        }
                      />
                      <Label htmlFor={`drive-${type}`}>
                        {type.toUpperCase()}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Transmission Type
                </h2>
                <div className="space-y-2">
                  {transmissionTypes.map((type, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`transmission-${type}`}
                        onCheckedChange={(checked) =>
                          handleChangeFilters("transmissionType", type, checked)
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
                        onCheckedChange={(checked) =>
                          handleChangeFilters("fuelType", type, checked)
                        }
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-price">Min</Label>
                    <Input
                      id="min-price"
                      type="number"
                      placeholder="Min Price"
                      value={filters.priceMin ?? ""}
                      onChange={(e) =>
                        handleChangeFilters(
                          "priceMin",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-price">Max</Label>
                    <Input
                      id="max-price"
                      type="number"
                      placeholder="Max Price"
                      value={filters.priceMax ?? ""}
                      onChange={(e) =>
                        handleChangeFilters(
                          "priceMax",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Kilometers Range</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-km">Min</Label>
                    <Input
                      id="min-km"
                      type="number"
                      placeholder="Min Km"
                      value={filters.mileageMin ?? ""}
                      onChange={(e) =>
                        handleChangeFilters(
                          "mileageMin",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-km">Max</Label>
                    <Input
                      id="max-km"
                      type="number"
                      placeholder="Max Km"
                      value={filters.mileageMax ?? ""}
                      onChange={(e) =>
                        handleChangeFilters(
                          "mileageMax",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>
      <main className="flex-1 p-6">
        {data && data.getAllCarsInfo.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MultipleCarInfo data={data.getAllCarsInfo} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
