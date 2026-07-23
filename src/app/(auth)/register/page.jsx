"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";

import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";

const validatePassword = (password) => {
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include an uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must include a lowercase letter";
  }
  return "";
};

const RegisterPage = () => {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // console.log(formData);
    const registerData = Object.fromEntries(formData.entries());
    // console.log(registerData);

    const validationError = validatePassword(registerData.password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    setPasswordError("");

    const { data, error } = await signUp.email({
      ...registerData,
    });
    if (error) {
      toast.error("Something went wrong!");
      return;
    }
    if (data) {
      toast.success("Registered successfully!");
    }
    router.push("/login");
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 dark:bg-slate-900 py-12">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Join <span className="text-brand-400">TutorBooking</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Create your account to start learning
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onPress={handleGoogleLogin}
                variant="bordered"
                className="w-full h-12 font-bold rounded-2xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors gap-3"
              >
                <Image
                  width={20}
                  height={20}
                  src="https://www.google.com/favicon.ico"
                  className="w-5 h-5"
                  alt="Google"
                />
                Sign up with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100 dark:border-slate-700"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-800 px-4 text-slate-400 dark:text-slate-500 font-bold tracking-widest">
                  Or with email
                </span>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  required
                  placeholder="Enter your name"
                  name="name"
                  startContent={<User className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 dark:border-slate-700 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-14 bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
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
                  className="border-2 border-slate-200 dark:border-slate-700 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-14 bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >
                  Profile Image URL
                </label>
                <Input
                  id="image"
                  placeholder="https://images.unsplash.com/..."
                  type="url"
                  name="image"
                  startContent={<User className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 dark:border-slate-700 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-14 bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  required
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  isInvalid={!!passwordError}
                  errorMessage={passwordError}
                  onChange={() => passwordError && setPasswordError("")}
                  startContent={<Lock className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 dark:border-slate-700 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-14 bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-full rounded-2xl"
                />
                <p className="text-xs text-slate-400 dark:text-slate-500 ml-1">
                  At least 6 characters, with an uppercase and a lowercase letter.
                </p>
              </div>

              <Button
                color="primary"
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-brand-400/20 group  bg-brand-500 text-white hover:bg-brand-600"
              >
                Create Account{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-brand-400 font-black hover:underline underline-offset-4 transition-all"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;