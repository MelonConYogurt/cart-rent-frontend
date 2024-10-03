"use client";

import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <form
        className="flex flex-col gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <div className="flex ">
          <Input
            id="search"
            name="search"
            type="text"
            className="border border-black rounded-sm mx-3 "
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
