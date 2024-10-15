"use client";

import {useState, useEffect} from "react";
import {toast, Toaster} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Data, FilterData, Filters} from "@/types/tsTypes";
import {MultipleCarInfo} from "@/components/CardCarInfo";
import GetAllCarsInfoFiltered from "@/utils/getAllCarsInfoFitered";
import GetAllColors from "@/utils/getAllColors";
import GetAllBrands from "@/utils/getAllInfoBrands";
import {RotateCcw} from "lucide-react";
import {Separator} from "@/components/ui/separator";

export default function ListCars() {
  const [data, setData] = useState<Data>();
  const [colors, setColors] = useState<FilterData[]>([]);
  const [brands, setBrands] = useState<FilterData[]>([]);
  const [pagination, setPagination] = useState({
    maxPage: 0,
    actualPage: 0,
    itemsPerPage: 3,
  });
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
    console.log("Recibalo alla", filters);
    const filterStr = makeFilter(filters);
    console.log("Guardelo ahi", filters);
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
    const sizeData = data?.getAllCarsInfo.length ?? 0;
    setPagination((prev) => ({
      ...prev,
      maxPage: Math.ceil(sizeData / prev.itemsPerPage),
    }));
  }, [data]);

  function resetFilters() {
    const reset = Object.fromEntries(
      Object.entries(filters).map(([key]) => [key, null])
    );
    setFilters(reset as Filters);
  }

  function incrementPagination() {
    setPagination((prev) => ({
      ...prev,
      actualPage: prev.actualPage + 1,
    }));
  }

  function decrementPagination() {
    setPagination((prev) => ({
      ...prev,
      actualPage: prev.actualPage - 1,
    }));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const filterStr = makeFilter(filters);
        const response = await GetAllCarsInfoFiltered(filterStr);
        if (response) {
          console.log(response);
          setData(response);
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
  }, [filters]);

  useEffect(() => {
    async function fetchFilterData() {
      try {
        const responseColors = await GetAllColors();
        const responseBrands = await GetAllBrands();
        setColors(responseColors);
        setBrands(responseBrands);
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    }
    fetchFilterData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Toaster richColors position="bottom-left" />
      <aside className="w-full md:w-80 p-6 border-r">
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-6">
            <div className=" flex justify-center items-center gap-2">
              <h1 className="text-2xl font-bold ">Filters</h1>
              <button type="button" onClick={() => resetFilters()}>
                <RotateCcw />
              </button>
            </div>
            <Separator />
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
                        className={`ml-2 rounded-full w-8 h-8 cursor-pointer  ring-black ${
                          filters.color === color.name
                            ? "ring-red-600 ring-4"
                            : "ring-1"
                        }`}
                        style={{backgroundColor: `${color.name}`}}
                        title={color.name}
                      ></div>
                      <input
                        type="checkbox"
                        value={color.name}
                        id={`${color.name}`}
                        onClick={() => handleChangeFilters("color", color.name)}
                      />
                      <label htmlFor={`${color.name}`}>{color.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Brands</h2>
                <div className="space-y-2">
                  {brands.map((brand, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`brand-${index}`}
                        onChange={(e) =>
                          handleChangeFilters(
                            "brand",
                            brand.name,
                            e.target.checked
                          )
                        }
                      />
                      <label htmlFor={`brand-${index}`}>{brand.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Drive Type</h2>
                <div className="space-y-2">
                  {driveTypes.map((type, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`drive-${type}`}
                        onChange={(e) =>
                          handleChangeFilters(
                            "driveType",
                            type,
                            e.target.checked
                          )
                        }
                      />
                      <label htmlFor={`drive-${type}`}>
                        {type.toUpperCase()}
                      </label>
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
                      <input
                        type="checkbox"
                        id={`transmission-${type}`}
                        onChange={(e) =>
                          handleChangeFilters(
                            "transmissionType",
                            type,
                            e.target.checked
                          )
                        }
                      />
                      <label htmlFor={`transmission-${type}`}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Fuel Type</h2>
                <div className="space-y-2">
                  {fuelTypes.map((type, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`fuel-${type}`}
                        onChange={(e) =>
                          handleChangeFilters(
                            "fuelType",
                            type,
                            e.target.checked
                          )
                        }
                      />
                      <label htmlFor={`fuel-${type}`}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                <div className="flex space-x-2">
                  <div className="space-y-1">
                    <label htmlFor="min-price">Min</label>
                    <input
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
                  <div className="space-y-1">
                    <label htmlFor="max-price">Max</label>
                    <input
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
                <div className="flex space-x-2">
                  <div className="space-y-1">
                    <label htmlFor="min-km">Min</label>
                    <input
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
                  <div className="space-y-1">
                    <label htmlFor="max-km">Max</label>
                    <input
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
          <div className="flex flex-wrap gap-10">
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
        <div className="flex justify-center items-center my-20 gap-5">
          <button
            disabled={pagination.actualPage <= 0}
            onClick={() => decrementPagination()}
            className={`flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              pagination.actualPage <= 0 ? "cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span className="text-base font-medium text-gray-500">
            {pagination.actualPage}/{pagination.maxPage}
          </span>
          <button
            onClick={() => incrementPagination()}
            disabled={pagination.actualPage >= pagination.maxPage}
            className={`flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              pagination.actualPage >= pagination.maxPage
                ? "cursor-not-allowed"
                : ""
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
