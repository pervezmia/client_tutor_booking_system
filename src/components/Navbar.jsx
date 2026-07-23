"use client";

import { useState, useEffect, useRef } from "react";

import { BookOpen, Menu, X, User, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";

const PUBLIC_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tutors", href: "/all-tutors" },
];

const AUTH_NAV_LINKS = [
  { label: "Add Tutor", href: "/add-tutor" },
  { label: "My Tutors", href: "/my-tutors" },
  { label: "My Booked Sessions", href: "/my-bookings" },
];

const DEFAULT_AVATAR = "/default-avatar.png"; // public/ ফোল্ডারে একটা placeholder রাখবেন

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("!Log out Successfully!");
    router.push("/");
  };

  const navLinks = [...PUBLIC_NAV_LINKS, ...AUTH_NAV_LINKS];

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 
        
        backdrop-blur-md shadow-sm  
          bg-slate-50 dark:bg-slate-900 py-4`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-brand-400 dark:bg-brand-950 rounded-xl group-hover:rotate-12 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                TutorBooking
              </span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-slate-700 dark:text-slate-300 hover:text-brand-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side: auth / profile */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle></ThemeToggle>
            {!session && !isPending ? (
              <>
                <Link
                  href="/login"
                  className="font-medium text-slate-700 dark:text-slate-300 hover:text-brand-400 transition-colors"
                >
                  Login
                </Link>
                <Link href="/register">
                  <Button
                    color="primary"
                    className="font-bold rounded-full px-8 shadow-lg shadow-brand-400/20"
                  >
                    Join Free
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    aria-label="Open profile menu"
                    aria-expanded={isDropdownOpen}
                    className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <Image
                      width={40}
                      height={40}
                      src={ session?.user?.image ||DEFAULT_AVATAR}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-400/10"
                    />
                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-bold truncate max-w-25 text-slate-900 dark:text-white">
                        {session?.user?.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Student</p>
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col py-2 z-50">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Welcome back!</p>
                        <p className="text-xs truncate text-slate-500 dark:text-slate-400">
                          {session?.user?.email}
                        </p>
                      </div>
                      
                      <Link
                        href="/my-bookings"
                        className="px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors"
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 flex items-center gap-3 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
        
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle></ThemeToggle>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-slate-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
            {!isPending && !session ? (
            <div className="grid grid-cols-2 gap-4">
              <Link href="/login">
                <Button variant="bordered" className="rounded-xl w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button color="primary" className="rounded-xl w-full ">
                  Join Free
                </Button>
              </Link>
            </div>
          ) : ( 
            <div className="flex flex-col gap-2">
              <p className="px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {session?.user?.name} 
              </p>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl"
              >
                Log Out
              </button>
            </div>
            )} 
          </div>
        </div>
        
      )}
      
    </nav>
  );
}