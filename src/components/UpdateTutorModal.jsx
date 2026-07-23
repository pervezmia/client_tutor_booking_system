"use client";

import { useState } from "react";
import { Button, Input, Modal, Surface } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const INPUT_STYLES =
  "border-2 border-slate-200 dark:border-slate-700 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-12 bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-full rounded-xl";

const LABEL_STYLES = "text-sm font-bold text-slate-700 dark:text-slate-300";

const UpdateTutorModal = ({ tutor }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sessionStartDate, setSessionStartDate] = useState(
    tutor.sessionStartDate ? new Date(tutor.sessionStartDate) : null,
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    updatedData.sessionStartDate = sessionStartDate;

    const { data: jwtData } = await authClient.token();
    const token = jwtData?.token;

    if (!token) {
      toast.error("Authentication failed!");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${tutor._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Update failed!");
        setIsSubmitting(false);
        return;
      }

      toast.success("Tutor updated successfully!");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <Button size="sm" variant="secondary" className="gap-1">
        <Pencil className="w-4 h-4" />
        Update
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Update Tutor Information</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Tutor Name</label>
                      <Input
                        name="name"
                        required
                        defaultValue={tutor.tutorName}
                        className={INPUT_STYLES}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Photo URL</label>
                      <Input
                        name="photo"
                        type="url"
                        required
                        defaultValue={tutor.photo}
                        className={INPUT_STYLES}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Subject Name</label>
                      <Input
                        name="subjectName"
                        required
                        defaultValue={tutor.subjectName}
                        className={INPUT_STYLES}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Teaching Mode</label>
                      <Input
                        name="teachingMode"
                        required
                        defaultValue={tutor.teachingMode}
                        className={INPUT_STYLES}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Available Days</label>
                      <Input
                        name="availableDays"
                        required
                        defaultValue={tutor.availableDays}
                        className={INPUT_STYLES}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Available Time</label>
                      <Input
                        name="availableTime"
                        required
                        defaultValue={tutor.availableTime}
                        className={INPUT_STYLES}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Hourly Fee</label>
                      <Input
                        name="hourlyFee"
                        type="number"
                        min="0"
                        required
                        defaultValue={tutor.hourlyFee}
                        className={INPUT_STYLES}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Total Slot</label>
                      <Input
                        name="totalSlot"
                        type="number"
                        min="0"
                        required
                        defaultValue={tutor.totalSlot}
                        className={INPUT_STYLES}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Institution</label>
                      <Input
                        name="institution"
                        required
                        defaultValue={tutor.institution}
                        className={INPUT_STYLES}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Session Start Date</label>
                      <DatePicker
                        selected={sessionStartDate}
                        onChange={(date) => setSessionStartDate(date)}
                        minDate={new Date()}
                        placeholderText="Select a start date"
                        required
                        className={`${INPUT_STYLES} px-4`}
                        wrapperClassName="w-full"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={LABEL_STYLES}>Experience</label>
                      <Input
                        name="experience"
                        required
                        defaultValue={tutor.experience}
                        className={INPUT_STYLES}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={LABEL_STYLES}>Location</label>
                    <Input
                      name="location"
                      required
                      defaultValue={tutor.location}
                      className={INPUT_STYLES}
                    />
                  </div>

                  <Modal.Footer>
                    <Button type="button" slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      isDisabled={isSubmitting}
                      slot="close"
                    >
                      {isSubmitting ? "Updating..." : "Save Changes"}
                    </Button>
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

export default UpdateTutorModal;