"use client"

import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useDebounce } from "@/hooks/use-debounce";

const Search = () => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategoryId = searchParams?.get("category");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        category: currentCategoryId,
        title: debouncedValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname])


  return (
    <div className="relative">
      <SearchIcon
        className="h-4 w-4 absolute top-3 left-3 text-slate-600"
      />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-neutral-100 focus-visible:ring-neutral-200"
        placeholder="商品を探す"
      />
    </div>
  )
}

export default Search
