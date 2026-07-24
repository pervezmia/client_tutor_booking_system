"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CancelButton = ({ bookingId }) => {
    const router = useRouter();

    const handleCancel = async () => {
        const { data: jwdData } = await authClient.token();
        const token = jwdData?.token;

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/booked/cancel/${bookingId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "cancelled" }),
            }
        );

        if (!res.ok) {
            toast.error("Something is wrong");
            return;
        }

        const data = await res.json();

        if (data) {
            toast.success("Booking cancelled!");
            router.refresh();
        }
    };

    return (
        <AlertDialog>
            <Button color="danger" variant="light" size="sm" className={"bg-red-500"}>
                Cancel
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Confirm Cancellation</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p className="text-slate-600 dark:text-slate-300">
                                Are you sure you want to cancel this booking? This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCancel}
                                slot="close"
                                color="danger"
                                className="font-bold bg-red-500"
                            >
                                Yes, Cancel
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default CancelButton;