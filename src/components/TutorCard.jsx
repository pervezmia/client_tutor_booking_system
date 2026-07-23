"use client"
import { Button, Card, CardFooter } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
// import { Card, CardBody, CardFooter, Button } from "@heroui/react";


const TutorCard = ({ tutor }) => {


    return (

        <Card data-aos="fade-up" className="h-full overflow-hidden shadow-md hover:shadow-xl transition">

            <div className="relative w-full h-56">

                <Image
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    fill
                    className="object-cover"
                />

            </div>


            <Card className="space-y-2">

                <h3 className="text-xl font-bold">
                    {tutor.tutorName}
                </h3>


                <p className="text-sm text-gray-600">
                    Subject: 
                    <span className="font-semibold text-brand-600">
                        {" "}{tutor.subjectName}
                    </span>
                </p>


                <p className="text-sm">
                    📍 {tutor.location}
                </p>


                <p className="text-sm">
                    💰 {tutor.hourlyFee} Tk/hour
                </p>


                <p className="text-sm">
                    Mode: {tutor.teachingMode}
                </p>


            </Card>



            <CardFooter>

                <Link 
                    href={`/all-tutors/${tutor._id}`}
                    className="w-full"
                >

                    <Button
                        className="w-full bg-brand-500 text-white font-bold hover:bg-brand-600"
                    >
                        Book Session
                    </Button>

                </Link>

            </CardFooter>


        </Card>

    );
};


export default TutorCard;