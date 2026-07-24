# TutorBooking

A full-stack tutor booking platform where students can discover, filter, and book sessions with verified tutors across a wide range of subjects — and tutors can list themselves and manage their sessions with ease.

**Live Site:** [https://client-tutor-booking-system.vercel.app/](https://client-tutor-booking-system.vercel.app/)

## Key Features

- **Smart Tutor Search & Filtering** — Search tutors by subject, name, institution, or location, and sort results by hourly fee (low to high or high to low) to quickly find the right fit.
- **Seamless Session Booking** — Book a tutor in a few clicks with a pre-filled, validated booking form (including Bangladeshi phone number validation) and real-time slot/date availability checks.
- **Secure Authentication** — Email/password and Google sign-in powered by Better Auth, with JWT-secured API routes and protected private pages (Add Tutor, My Tutors, My Booked Sessions).
- **Full Tutor Management (CRUD)** — Logged-in users can list themselves as a tutor, and update or delete their own tutor listings through a dedicated "My Tutors" dashboard.
- **Personal Booking Dashboard** — A "My Booked Sessions" page lets students view and cancel their active bookings at any time.
- **Light & Dark Mode** — A fully themeable interface with a one-click light/dark toggle applied consistently across every page and component.
- **Fully Responsive Design** — Built mobile-first with Tailwind CSS and HeroUI, ensuring a smooth experience across phones, tablets, and desktops.

## Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, HeroUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** Better Auth (JWT-based)
- **Deployment:** Vercel