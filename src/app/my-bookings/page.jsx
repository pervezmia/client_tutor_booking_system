import BookedCard from '@/components/BookedCard';
import BookingModal from '@/components/BookingModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

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
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile */}
                <div className="w-full md:w-1/4">
                    <div className="p-6 bg-white border rounded-2xl">
                        <Image
                            src={session?.user?.image}
                            alt={session?.user?.name}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full"
                        />

                        <h2 className="text-xl font-bold mt-4">
                            {session?.user?.name}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {session?.user?.email}
                        </p>
                    </div>
                </div>

                {/* Booked  */}
                <div className="w-full md:w-3/4">
                    <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>

                    <div className="space-y-4">
                    
                        
                        <BookedCard bookedData={bookedData}></BookedCard>


                    </div>

                </div>
            </div>
        </div >
    );
};

export default MyBookingsSessions;