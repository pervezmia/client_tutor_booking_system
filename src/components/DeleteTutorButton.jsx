"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const DeleteTutorButton = ({ tutorId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const { data: jwtData } = await authClient.token();
    const token = jwtData?.token;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutors/${tutorId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      toast.error("Something is wrong");
      return;
    }

    toast.success("Tutor deleted successfully!");
    router.refresh();
  };

  return (
    <AlertDialog>
      <Button color="danger" variant="light" size="sm" className="gap-1">
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Tutor</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-slate-600">
                Are you sure you want to delete this tutor? This action
                cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                slot="close"
                color="danger"
                className="font-bold"
              >
                Yes, Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteTutorButton;