// import TutorsHeader from "@/components/TutorsHeader";
import TutorCard from "@/components/TutorCard";
import { Button } from "@heroui/react";
import { Users, Filter } from "lucide-react";
import { fetchTutors } from "@/lib/tutors/data";
import SearchBar from "@/components/SearchBar";
import TutorsHeader from "@/components/TutorsHeader";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import DateFilterBar from "@/components/DateFilterBar";

export const metadata = {
  title: "All tutor page in my-tutor project",
  description: "This is my details page.",
};

const TutorsPage = async ({ searchParams }) => {
  const sParams = await searchParams;
  // console.log(sParams);

  // const tutors = await fetchTutors(sParams?.searchTerm || "", sParams?.sortBy || "" );
  // console.log(tutors);
  const tutors = await fetchTutors(
    sParams?.searchTerm || "",
    sParams?.sortBy || "",
    sParams?.startDate || "",
    sParams?.endDate || "",
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <TutorsHeader></TutorsHeader>

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-5 mb-12">
          <Link href={"/all-tutors"}>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Users className="w-6 h-6 text-brand-500" />
              All Tutors
            </h2>
          </Link>
            <DateFilterBar></DateFilterBar>
          {/* <FilterBar></FilterBar> */}
          
            
            <FilterBar></FilterBar>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors?.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TutorsPage;
