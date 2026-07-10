import { Button } from "@heroui/react";
import { Users } from "lucide-react";
import TutorCard from "./TutorCard";
import { popularTutors } from "@/lib/tutors/data";


const Popular = async () => {

    const popularTutor = await popularTutors();
    console.log(popularTutor); 

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            {/* <TutorsHeader /> */}


            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center mb-12">

                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="w-6 h-6 text-brand-500" />
                        Popular Tutors
                    </h2>

                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {
                        popularTutor?.map((tutor) => (
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

export default Popular;