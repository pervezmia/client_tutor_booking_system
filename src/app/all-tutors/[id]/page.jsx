import BookingModal from "@/components/BookingModal";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock,
  DollarSign,
  Laptop,
  Layers,
  MapPin,
} from "lucide-react";
import moment from "moment";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const generateMetadata = async ({params}) => {
  const {id} = await params;
  
  const singleTutor = await fetchSingleTutor(id);
  
  return {
    title: singleTutor.subjectName,
    description: singleTutor.tutorName,
  }

}


const fetchSingleTutor = async (id, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all-tutors/${id}`,{
      headers: {
        authorization: `Bearer ${token}` || ""
      }
    });
  const data = await res.json();
  return data || {};
};

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  // console.log(id);
  
    const {token} = await auth.api.getToken({
      headers: await headers() 
});
// console.log(token);
   
  const singleTutor = await fetchSingleTutor(id, token);
  // console.log(singleTutor,"single route");

  if (!singleTutor) {
    notFound();
  }

  const formattedStartDate = singleTutor.sessionStartDate
  ? moment(singleTutor.sessionStartDate).format("MMMM D, YYYY")
  : "Not specified";
  
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sessionDate = singleTutor.sessionStartDate
    ?  new Date(singleTutor.sessionStartDate) : null;

  if(sessionDate) sessionDate.setHours(0, 0, 0, 0);

  const isBookingAvailable = sessionDate ? today <= sessionDate : true;

  const isSlotAvailable = singleTutor.totalSlot > 0;



  const details = [
    { icon: Building2, label: "Institution", value: singleTutor.institution },
    { icon: Layers, label: "Experience", value: singleTutor.experience },
    { icon: MapPin, label: "Location", value: singleTutor.location },
    { icon: Laptop, label: "Teaching Mode", value: singleTutor.teachingMode },
    { icon: Clock, label: "Available Days", value: singleTutor.availableDays },
    { icon: Clock, label: "Available Time", value: singleTutor.availableTime },
    {
      icon: CalendarDays,
      label: "Session Start Date",
      value: formattedStartDate,
    },
    {
      icon: Layers,
      label: "Total Slot",
      value: singleTutor.totalSlot
        ? `${singleTutor.totalSlot} slots`
        : "Not specified",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/all-tutors"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all tutors
        </Link>

        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Photo */}
            <div className="md:col-span-2 relative aspect-square md:aspect-auto">
              <Image
                src={singleTutor?.photo}
                alt={singleTutor?.tutorName}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="md:col-span-3 p-8 sm:p-10 space-y-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full">
                  {singleTutor?.subjectName}
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {singleTutor?.tutorName}
                </h1>
                <div className="flex items-center gap-2 text-brand-500 font-bold text-xl">
                  <DollarSign className="w-5 h-5" />
                  {singleTutor?.hourlyFee}
                  <span className="text-sm font-medium text-slate-400">
                    / hour
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {details.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 bg-slate-50 rounded-2xl p-4"
                  >
                    <Icon className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        {value || "Not specified"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              
              <BookingModal singleTutor={singleTutor} isBookingAvailable={isBookingAvailable} isSlotAvailable={isSlotAvailable}></BookingModal>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorDetailsPage;
