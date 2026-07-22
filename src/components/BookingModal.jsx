"use client";
import { useSession } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import BookedButton from "./BookedButton";
import { useEffect, useState } from "react";
// import { email } from "better-auth";

const BookingModal = ({ singleTutor, isBookingAvailable, isSlotAvailable }) => {
  const { data: session } = useSession();
  // console.log(session?.user);
  const { _id, tutorName } = singleTutor;

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        studentName: session?.user?.name || "",
        email: session?.user?.email || "",
      }));
    }
  }, [session]);

  const canBook = isBookingAvailable && isSlotAvailable;

  return (
    <Modal>
      {!isBookingAvailable && (
        <p className="text-red-500 text-sm font-semibold mb-2 text-center">
          Booking is closed. This session has already started.
        </p>
      )}

      {isBookingAvailable && !isSlotAvailable && (
        <p className="text-red-500 text-sm font-semibold mb-2 text-center">
          No available slots left.
        </p>
      )}
      <Button
        color="primary"
        size="lg"
        isDisabled={!canBook}
        className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-brand-400/20"
      >
        Book This Tutor
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            {/* <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Contact Us</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below and we will get back to you. The modal adapts automatically
                when the keyboard appears on mobile.
              </p>
            </Modal.Header> */}
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField
                    className="w-full"
                    name="tutorId"
                    type="text"
                    variant="secondary"
                    defaultValue={_id}
                  >
                    <Label>Tutor Id</Label>
                    <Input placeholder="Enter your tutor id" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="tutorName"
                    type="text"
                    variant="secondary"
                    defaultValue={tutorName}
                  >
                    <Label>Tutor Name</Label>
                    <Input placeholder="Enter your tutor name" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="email"
                    type="email"
                    variant="secondary"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e }))
                    }
                  >
                    <Label>Student Email</Label>
                    <Input placeholder="Enter your email" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="studentName"
                    type="text"
                    variant="secondary"
                    value={formData.studentName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, studentName: e }))
                    }
                  >
                    <Label>Student Name</Label>
                    <Input placeholder="Enter your name" />
                  </TextField>

                  <TextField
                    className="w-full"
                    name="phone"
                    type="tel"
                    variant="secondary"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e }))
                    }
                    isRequired
                    validate={(value) => {
                      if (!value) {
                        return "Phone number is required";
                      }
                      if (!/^01\d{9}$/.test(value)) {
                        return "Enter a valid Bangladeshi phone number (e.g. 01000000008)";
                      }
                      return null;
                    }}
                  >
                    <Label>Phone</Label>
                    <Input placeholder="Enter your phone number" />
                    <Description>
                      Enter a valid 11-digit phone number (e.g. 01XXXXXXXXX)
                    </Description>
                    <FieldError></FieldError>
                  </TextField>
                  <Modal.Footer>
                    <Button type="button" slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <BookedButton
                      singleTutor={singleTutor}
                      formData={formData}
                    ></BookedButton>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default BookingModal;
