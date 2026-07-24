"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarRange } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";


const DATE_INPUT_STYLES =
  "border-2 border-slate-200 dark:border-slate-700 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-12 bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-full rounded-xl px-4";

const DateFilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null
  );
  const [endDate, setEndDate] = useState(
    searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null
  );

  const applyFilter = (newStart, newEnd) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newStart) {
      params.set("startDate", newStart.toISOString());
    } else {
      params.delete("startDate");
    }

    if (newEnd) {
      params.set("endDate", newEnd.toISOString());
    } else {
      params.delete("endDate");
    }

    router.push(`/all-tutors?${params.toString()}`);
  };

  const handleStartChange = (date) => {
    setStartDate(date);
    applyFilter(date, endDate);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
    applyFilter(startDate, date);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <CalendarRange className="w-4 h-4 text-slate-400 shrink-0" />
        <DatePicker
          selected={startDate}
          onChange={handleStartChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="From date"
          className={DATE_INPUT_STYLES}
          wrapperClassName="w-full sm:w-40"
        />
      </div>
      <DatePicker
        selected={endDate}
        onChange={handleEndChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="To date"
        className={DATE_INPUT_STYLES}
        wrapperClassName="w-full sm:w-40"
      />
      <Link href={"/all-tutors"}>
            <Button className={DATE_INPUT_STYLES} >
              
              Reset Filter
            </Button>
          </Link>
    </div>
  );
};

export default DateFilterBar;