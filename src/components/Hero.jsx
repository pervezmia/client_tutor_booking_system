"use client";
import { Button } from "@heroui/react";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const SLIDES = [
  {
    badge: "Trusted by 10,000+ Students",
    titleStart: "Learn Directly from",
    highlight: "Expert",
    titleEnd: "Tutors",
    description:
      "From math to coding — find verified, experienced tutors in any subject and book your first session today.",
    image: "https://images.unsplash.com/photo-1629360057380-18b15b42e650",
    stat: "500+ tutors currently active",
  },
  {
    badge: "1-on-1 Personalized Learning",
    titleStart: "Learn at",
    highlight: "Your Own",
    titleEnd: "Pace",
    description:
      "Book sessions on a flexible schedule and track your progress after every class — all on one platform.",
    image: "https://plus.unsplash.com/premium_photo-1661714188599-e132395b5bf8",
    stat: "24/7 booking available",
  },
  {
    badge: "Verified & Rated Tutors",
    titleStart: "Choose the",
    highlight: "Right",
    titleEnd: "Tutor",
    description:
      "Decide with full transparency by checking each tutor's ratings, reviews, and subject expertise.",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd",
    stat: "4.8/5 average rating",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32 from-brand-50 via-slate-50 to-slate-50">
      <Swiper
        navigation
        pagination={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.image}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-400/10 rounded-full border border-brand-400/20 text-brand-400 font-bold text-sm">
                    <Star className="w-4 h-4 fill-brand-400" />
                    <span>{slide.badge}</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                    {slide.titleStart}{" "}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-400 to-brand-700">
                      {slide.highlight}
                    </span>{" "}
                    {slide.titleEnd}
                  </h1>
                  <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      href="/tutors"
                      color="primary"
                      size="lg"
                      className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-brand-400/30 group"
                    >
                      Find a Tutor{" "}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500 pt-2">{slide.stat}</p>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-primary to-brand-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                    <Image
                      src={slide.image}
                      alt={slide.titleStart}
                      fill
                      priority={index === 0}
                      className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                          {[1, 2, 3, 4].map((i) => (
                            <Image
                              key={i}
                              src={`https://i.pravatar.cc/100?img=${i + 10}`}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                              alt="student avatar"
                            />
                          ))}
                        </div>
                        <div>
                          <p className="font-bold text-sm">Join the community</p>
                          <p className="text-xs text-slate-500">
                            120+ new enrollments today
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;