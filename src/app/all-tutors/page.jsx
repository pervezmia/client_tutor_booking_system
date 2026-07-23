// import TutorsHeader from "@/components/TutorsHeader";
import TutorCard from "@/components/TutorCard";
import { Button } from "@heroui/react";
import { Users, Filter, } from "lucide-react";
import { fetchTutors } from "@/lib/tutors/data";
import SearchBar from "@/components/SearchBar";
import TutorsHeader from "@/components/TutorsHeader";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";

export const metadata = {
  title: "All tutor page in my-tutor project",
  description: "This is my details page.",
};


const TutorsPage = async ({searchParams}) => {
    const sParams = await searchParams;
    // console.log(sParams);

    const tutors = await fetchTutors(sParams?.searchTerm || "", sParams?.sortBy || "" );
    // console.log(tutors);


    return (
        <div className="min-h-screen bg-slate-50">
            <TutorsHeader></TutorsHeader>


            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center space-y-5 mb-12">
                    <Link href={"/all-tutors"}>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="w-6 h-6 text-brand-500" />
                        All Tutors
                    </h2>
                    </Link>

                    
                    <FilterBar></FilterBar>
                    {/* <Button
                        variant="flat"
                        startContent={<Filter className="w-4 h-4" />}
                        className="rounded-full font-bold bg-brand-100 text-brand-700"
                    >
                        Filters
                    </Button> */}

                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {
                        tutors?.map((tutor) => (
                            <TutorCard 
                                key={tutor._id}
                                tutor={tutor}
                            />
                        ))
                    }

                </div>


            </main>

        </div>
    );
};


export default TutorsPage;