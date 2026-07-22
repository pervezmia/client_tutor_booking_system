"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-60" />
            <div className="relative w-24 h-24 bg-white border-2 border-red-100 rounded-[2rem] flex items-center justify-center shadow-xl">
              <AlertTriangle className="w-12 h-12 text-red-500" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Something went wrong
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            An unexpected error occurred while processing your request.
            Don&apos;t worry, you can try again or head back home.
          </p>
        </div>

        {error?.message && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Error Details
            </p>
            <p className="text-sm text-slate-600 font-mono break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-400 hover:bg-brand-500 text-white font-bold rounded-2xl shadow-lg shadow-brand-400/20 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 hover:border-brand-400/50 text-slate-700 font-bold rounded-2xl transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;