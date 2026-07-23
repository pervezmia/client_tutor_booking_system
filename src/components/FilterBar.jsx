"use client";

import { Select, Label, ListBox } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDownWideNarrow } from "lucide-react";

const sortOptions = [
  { key: "price_low", label: "Price: Low to High" },
  { key: "price_high", label: "Price: High to Low" },
];

const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }

    router.push(`/all-tutors?${params.toString()}`);
  };

  return (
    <Select
      placeholder="Sort by price"
      value={searchParams.get("sortBy") || null}
      onChange={handleSortChange}
    >
      <Label className="sr-only">Sort by price</Label>
      <Select.Trigger className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm data-[hover=true]:border-brand-500">
        <ArrowDownWideNarrow className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-2" />
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <ListBox>
          {sortOptions.map((option) => (
            <ListBox.Item
              key={option.key}
              id={option.key}
              textValue={option.label}
              className="text-slate-700 dark:text-slate-200 data-[hover=true]:bg-slate-100 dark:data-[hover=true]:bg-slate-700"
            >
              {option.label}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default FilterBar;