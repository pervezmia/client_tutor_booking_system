"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
//   console.log(searchParams);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("searchTerm", search);
    } else {
      params.delete("searchTerm");
    }
    router.push(`/all-tutors?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (

    <div className="flex items-center w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-full shadow-sm focus-within:ring-4 focus-within:ring-orange-500/10 focus-within:border-orange-500 transition-all">
      <Search className="w-5 h-5 ml-4 sm:ml-5 text-slate-400 shrink-0" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Search tutors by subject name, tutor name, location and institution"
        className="flex-1 min-w-0 h-12 px-2 sm:px-3 outline-none bg-transparent text-slate-700 placeholder:text-slate-400 text-xs sm:text-sm"
      />

      <button
        onClick={handleSearch}
        className="h-9 px-4 sm:px-6 mr-1.5 rounded-full bg-orange-500 text-white text-xs sm:text-sm font-semibold hover:bg-orange-600 active:scale-95 transition-all shrink-0"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;