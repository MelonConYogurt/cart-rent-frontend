"use client";

import GetAllCarsInfo from "@/utils/getAllCarsInfo";
import {useState, useEffect} from "react";
import {Data} from "@/types/tsTypes";
import {AdminCarList} from "@/components/AdminCardInfo";
import {toast, Toaster} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";

function Manage() {
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
    <main className="m-5 flex felx-row">
      <Toaster richColors />
      {data && data.data.length > 0 ? (
        <section className="m-5 flex flex-wrap gap-5 mx-5 my-10">
          <AdminCarList data={data.data} />
        </section>
      ) : (
        <section className="h-screen m-5 flex flex-wrap gap-5 mx-5 my-10">
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
    </main>
  );
}

export default Manage;
