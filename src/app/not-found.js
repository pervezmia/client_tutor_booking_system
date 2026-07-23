"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Compass, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="relative inline-flex">
          <div className="absolute inset-0 bg-brand-400/10 rounded-full blur-3xl"></div>
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-brand-50 dark:bg-brand-950 rounded-3xl border border-brand-200 dark:border-brand-800">
            <Compass className="w-12 h-12 text-brand-400" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-7xl font-black text-brand-400 tracking-tight">404</p>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            This page took a wrong turn
          </h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            The page you are looking for does not exist or may have been moved.
            Let us get you back to finding the right tutor.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link href="/">
            <Button
              color="primary"
              size="lg"
              className="h-12 px-8 font-bold rounded-full w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/all-tutors">
            <Button
              variant="bordered"
              size="lg"
              className="h-12 px-8 font-bold rounded-full w-full sm:w-auto dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Search className="w-4 h-4 mr-2" />
              Browse Tutors
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}