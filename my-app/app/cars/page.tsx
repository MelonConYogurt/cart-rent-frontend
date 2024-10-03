"use client";

import GetAllCarsInfo from "@/utils/getAllCarsInfo";
import {useState, useEffect} from "react";
import {Data} from "@/types/tsTypes";
import {MultipleCarInfo} from "@/components/CardCarIndo";
import {toast, Toaster} from "sonner";

function ListCars() {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllCarsInfo();
        if (response) {
          setData(response);
          toast.success("Showing all cars available");
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
      {data ? (
        <MultipleCarInfo data={data.data} />
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-black text-2xl">
            We are having problems, reload the page 😕
          </h1>
        </div>
      )}
    </div>
  );
}

export default ListCars;
