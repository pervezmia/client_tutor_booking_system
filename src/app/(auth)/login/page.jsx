"use client";

import { Button, Input } from "@heroui/react";

import Link from "next/link";

import { Mail, Lock, ArrowRight } from "lucide-react";

import Image from "next/image";
import toast from "react-hot-toast";
import { authClient, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());
    const { data, error } = await signIn.email({
      ...loginData,
      callbackURL: "/",
    });
    if (error) {
      toast.error("Something went wrong!");
      return;
    }
    if (data) {
      toast.success("Logged in successfully!");
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Welcome <span className="text-brand-400">Back</span>
              </h2>
              <p className="text-slate-500 font-medium">
                Continue your learning journey today
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onPress={handleGoogleLogin}
                variant="bordered"
                className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
              >
                <Image
                  width={20}
                  height={20}
                  src="https://www.google.com/favicon.ico"
                  className="w-5 h-5"
                  alt="Google"
                />
                Sign in with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                  Or with email
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  required
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  startContent={<Mail className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  required
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  startContent={<Lock className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm font-bold text-brand-400 hover:underline underline-offset-4 transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                color="primary"
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-brand-400/20 group bg-brand-500 text-white hover:bg-brand-600"
              >
                Sign In{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                New to TutorBooking?{" "}
                <Link
                  href="/register"
                  className="text-brand-400 font-black hover:underline underline-offset-4 transition-all"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;