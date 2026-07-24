import { Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Calendar } from "lucide-react";
import CancelButton from "./CancelButton";

const BookedCard = ({ bookedData }) => {
  return (
    <div className="w-full">
      {bookedData.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 p-16 text-center space-y-3">
          <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <p className="text-slate-600 dark:text-slate-300 font-bold text-lg">
            No booked sessions yet
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            Start by booking your first tutor session
          </p>
          <Link href="/all-tutors">
            <Button className="mt-2 bg-brand-500 text-white font-bold rounded-2xl">
              Browse Tutors
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                  Tutor
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                  Subject
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                  Student
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookedData.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-100 dark:border-slate-700 last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">
                        {item?.tutorName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {item?.subject}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {item?.studentName}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {item?.studentEmail}
                  </td>
                  <td className="px-6 py-4">
                    <Chip
                      color={item?.status === "cancelled" ? "danger" : "success"}
                      size="sm"
                      className={
                        item?.status === "cancelled"
                          ? "font-semibold bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-xl px-3"
                          : "font-semibold bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-xl px-3"
                      }
                    >
                      {item?.status === "cancelled" ? "Cancelled" : "Active"}
                    </Chip>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      {item?.status !== "cancelled" && (
                        <CancelButton bookingId={item._id}></CancelButton>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookedCard;