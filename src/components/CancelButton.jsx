"use client";


import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CancelButton = ({tutorId}) => {
    // console.log(tutorId);

    const router = useRouter();


    const handleCancel = async () => {
        const {data: jwdData} = await authClient.token();
        const token = jwdData?.token;
        const res = await fetch (
            `${process.env.NEXT_PUBLIC_API_URL}/booked/${tutorId}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                },
                
            }
        )
        
        if(!res.ok){
            toast.error("Something is wrong");
            return 
        }
        const data = await res.json();
        // console.log(data, "delete data");

        
        if(data) {
            toast.success("Cancel done!");
            router.refresh();
        }
    }

    return (
        <AlertDialog>
            <Button
                
                color="danger"
                variant="light"
                size="sm"
                className={"bg-red-500"}
            >
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
                            <p className="text-slate-600">
                                Are you sure you want to cancel this enrollment? This action cannot be undone and you
                                will lose access to the course materials.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button
                                slot="close"
                                variant="tertiary"
                            >
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