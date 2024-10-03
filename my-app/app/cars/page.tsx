"use client";

import GetAllCarsInfo from "@/utils/getAllCarsInfo";
import {useState, useEffect} from "react";
import {Data} from "@/types/tsTypes";
import {MultipleCarInfo} from "@/components/CardCarInfo";
import {toast, Toaster} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";

function ListCars() {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllCarsInfo();
        console.log(response);
        if (response) {
          console.log(response);
          setData(response);
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
    <div className="flex felx-row">
      <div className="h-full w-96 flex flex-col justify-center items-center">
        <h2 className="text-xl">Filtros</h2>
      </div>
      <Toaster richColors />
      {data && data.data.length > 0 ? (
        <MultipleCarInfo data={data.data} />
      ) : (
        <section className="h-screen flex flex-wrap gap-5 mx-5 my-10">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-[225px] w-[450px] rounded-xl animate-pulse" />
              <div className="space-y-2">
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
