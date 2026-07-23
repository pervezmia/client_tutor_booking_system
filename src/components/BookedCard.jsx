import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import React from "react";
// import CancelEnrollButton from "./CancelEnrolButton";
import Link from "next/link";
import CancelButton from "./CancelButton";

const BookedCard = ({bookedData}) => {
  // console.log(bookedData);
    return (
         <>
      <div className="w-full md:w-3/4">
        
        {bookedData.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 border rounded-2xl">
            <p className="mb-4">No booked yet</p>
            <Link href="/all-tutors">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookedData.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 bg-white border rounded-xl"
              >
            
                <Image
                  src={item?.photo}
                  alt={item?.tutorName}
                  width={120}
                  height={90}
                  className="rounded-lg object-cover"
                />

                <div className="flex flex-col grow justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold">Tutor: {item?.tutorName}</h3>
                    <p className="text-sm text-slate-500">
                      Subject: {item?.subject}
                    </p>
                    <p className="text-sm text-slate-500">
                      Student: {item?.studentName}
                    </p>
                    <p className="text-sm text-slate-500">Student gmail: {item?.studentEmail}</p>
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <Chip color="success" size="sm" className="font-semibold bg-green-200 rounded-xl px-3">
                      Active
                    </Chip>

                    {/* <CancelEnrollButton courseId={bookedData.courseId} /> */}
                    <CancelButton tutorId={item.tutorId}></CancelButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
    );
};

export default BookedCard;