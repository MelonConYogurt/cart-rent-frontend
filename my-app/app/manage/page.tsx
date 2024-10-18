"use client";

import {useState, useEffect} from "react";
import {Datum} from "@/types/tsTypes";
import {AdminCarList} from "@/components/AdminCardInfo";
import {toast, Toaster} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";
import GetAllCarsInfoFiltered from "@/utils/getAllCarsInfoFitered";

export default function Manage() {
  const [cars, setCars] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const response = await GetAllCarsInfoFiltered("", 100, 0);
      if (response && response.data && response.data.cars) {
        setCars(response.data.cars);
        toast.success("Showing all available cars");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      toast.error(
        `Error fetching cars: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="m-5 flex flex-col">
      <Toaster richColors />
      <section className="m-5 flex flex-wrap gap-5 mx-5 my-10">
        {isLoading ? <SkeletonLoading /> : <AdminCarList data={cars} />}
      </section>
    </main>
  );
}

function SkeletonLoading() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-[620px] w-[450px] rounded-xl" />
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-[250px]" />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
