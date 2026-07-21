import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const BookedButton = ({ singleTutor, formData }) => {
  // console.log(singleTutor);

  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  // console.log(session);
  const handleButton = async () => {
    if (
      singleTutor?.sessionStartDate &&
      new Date() < new Date(singleTutor.sessionStartDate)
    ) {
      toast.error("Booking is not available yet for this tutor");
      return;
    }
    const { data: jwtData } = await authClient.token();
    // // console.log(jwtData);
    const token = jwtData?.token;

    if (!token) {
      toast.error("Authentication failed! Booked not add!");
      return;
    }

    const updateData = {
      tutorId: singleTutor?._id,
      tutorName: singleTutor?.tutorName,
      studentName: formData.studentName,
      studentEmail: formData.email,
      studentId: session?.user?.id,
      phone: formData.phone,
      photo: singleTutor?.photo,
      subject: singleTutor?.subjectName,
    };
    // console.log(updateData);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/booked/${singleTutor?._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      },
    );
    // console.log(res);
    const data = await res.json();
    // console.log(data);

    if (!res.ok) {
      toast.error(data?.message || "Something is wrong!");
      return;
    }

    toast.success("This tutor is booked!");

    router.push("/my-bookings");
  };
  console.log(handleButton);
  return (
    <div>
      <Button onPress={handleButton} slot="close">
        Confirm tutor Book
      </Button>
    </div>
  );
};

export default BookedButton;
