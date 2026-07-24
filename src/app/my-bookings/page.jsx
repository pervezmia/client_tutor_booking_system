import BookedCard from '@/components/BookedCard';
import BookingModal from '@/components/BookingModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

export const metadata = {
  title: "My Booked Sessions",
  description: "This is my booked page.",
};

const MyBookingsSessions = async () => {
    const {token} = await auth.api.getToken({
        headers: await headers()
    });

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booked/${session?.user?.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const bookedData = await res.json();


    
    // console.log(bookedData);
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 bg-slate-50 dark:bg-slate-900">
            <div className="flex flex-col md:flex-row ">
                
                {/* Booked  */}
                <div className="w-full ">
                    <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">My Enrolled Courses</h1>

                    <div className="space-y-4">
                    
                        
                        <BookedCard bookedData={bookedData}></BookedCard>


                    </div>

                </div>
            </div>
        </div >
    );
};

export default MyBookingsSessions;