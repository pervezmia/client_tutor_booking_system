"use client";

import { useState } from "react";
// import { Button, Input, Select, SelectItem } from "@heroui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapPin, Clock, DollarSign, Layers, Building2, User } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button, Input, Select } from "@heroui/react";
import SelectSubject from "@/components/SelectSubject";
import TeachingMode from "@/components/TeachingMode";



const INPUT_STYLES =
  "border-2 border-slate-200 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-14 bg-white w-full rounded-2xl";



const AddTutorPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [sessionStartDate, setSessionStartDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const tutorData = Object.fromEntries(formData.entries());
    

    const payload = {
      ...tutorData,
      hourlyFee: Number(tutorData.hourlyFee),
      totalSlot: Number(tutorData.totalSlot),
      sessionStartDate,
      tutorEmail: session?.user?.email,
      tutorName: tutorData.name,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.insertedId) {
        toast.error("Something went wrong!");
        return;
      }

      toast.success("Tutor added successfully!");
      console.log(form);
      form.reset();
      // setCategory(new Set());
      // setTeachingMode(new Set());
      setSessionStartDate(null);
      router.push("/all-tutors");
    } catch (error) {
      // toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Add a <span className="text-brand-400">Tutor</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Fill in the details below to list yourself as a tutor
            </p>
          </div>

          

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">
                  Tutor Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Enter tutor's full name"
                  startContent={<User className="w-5 h-5 text-slate-400" />}
                  className={INPUT_STYLES}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="photo" className="text-sm font-bold text-slate-700 ml-1">
                  Photo 
                </label>
                <Input
                  id="photo"
                  name="photo"
                  required
                  type="url"
                  placeholder="https://i.ibb.co/..."
                  className={INPUT_STYLES}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">
                  Subject Name
                </label>
                <Input
                  id="subjectName"
                  name="subjectName"
                  required
                  placeholder="Enter tutor's full name"
                  startContent={<User className="w-5 h-5 text-slate-400" />}
                  className={INPUT_STYLES}
                />
              </div>
              <div className="space-y-2">
                {/* <SelectSubject INPUT_STYLES={INPUT_STYLES} ></SelectSubject> */}
                <TeachingMode INPUT_STYLES={INPUT_STYLES}></TeachingMode>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="availableDays" className="text-sm font-bold text-slate-700 ml-1">
                  Available Days
                </label>
                <Input
                  id="availableDays"
                  name="availableDays"
                  required
                  placeholder="e.g. Sun - Thu"
                  startContent={<Clock className="w-5 h-5 text-slate-400" />}
                  className={INPUT_STYLES}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="availableTime" className="text-sm font-bold text-slate-700 ml-1">
                  Available Time Slot
                </label>
                <Input
                  id="availableTime"
                  name="availableTime"
                  required
                  placeholder="e.g. 5:00 PM - 8:00 PM"
                  startContent={<Clock className="w-5 h-5 text-slate-400" />}
                  className={INPUT_STYLES}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="hourlyFee" className="text-sm font-bold text-slate-700 ml-1">
                  Hourly Fee
                </label>
                <Input
                  id="hourlyFee"
                  name="hourlyFee"
                  required
                  type="number"
                  min="0"
                  placeholder="e.g. 500"
                  startContent={<DollarSign className="w-5 h-5 text-slate-400" />}
                  className={INPUT_STYLES}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="totalSlot" className="text-sm font-bold text-slate-700 ml-1">
                  Total Slot
                </label>
                <Input
                  id="totalSlot"
                  name="totalSlot"
                  required
                  type="number"
                  min="1"
                  placeholder="e.g. 10"
                  startContent={<Layers className="w-5 h-5 text-slate-400" />}
                  className={INPUT_STYLES}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Session Start Date
              </label>
              <DatePicker
                name="startDate"
                selected={sessionStartDate}
                onChange={(date) => setSessionStartDate(date)}
                minDate={new Date()}
                placeholderText="Select a start date"
                required
                className={`${INPUT_STYLES} px-4`}
                wrapperClassName="w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="institution" className="text-sm font-bold text-slate-700 ml-1">
                  Institution
                </label>
                <Input
                  id="institution"
                  name="institution"
                  required
                  placeholder="e.g. University of Dhaka"
                  startContent={<Building2 className="w-5 h-5 text-slate-400" />}
                  className={INPUT_STYLES}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="experience" className="text-sm font-bold text-slate-700 ml-1">
                  Experience
                </label>
                <Input
                  id="experience"
                  name="experience"
                  required
                  placeholder="e.g. 3 years"

                  className={INPUT_STYLES}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-bold text-slate-700 ml-1">
                Location (Area/City)
              </label>
              <Input
                id="location"
                name="location"
                required
                placeholder="e.g. Dhanmondi, Dhaka"
                startContent={<MapPin className="w-5 h-5 text-slate-400" />}
                className={INPUT_STYLES}
              />
            </div>

            <Button
              color="primary"
              type="submit"
              className="w-full h-14 text-lg rounded-2xl shadow-xl shadow-brand-400/20  bg-brand-500 text-white font-bold hover:bg-brand-600"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTutorPage;