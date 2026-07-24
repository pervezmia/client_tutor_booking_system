# TutorBooking

A full-stack tutor booking platform where students can discover, filter, and book sessions with verified tutors across a wide range of subjects — and tutors can list themselves and manage their sessions with ease.

**Live Site:** [https://client-tutor-booking-system.vercel.app/](https://client-tutor-booking-system.vercel.app/)

## Key Features

- **Smart Tutor Search & Filtering** — Search tutors by subject, name, institution, or location, sort results by hourly fee, and filter by session start date range to instantly find tutors available in a specific window.
- **Seamless Session Booking** — Book a tutor in a few clicks with a pre-filled, validated booking form (including Bangladeshi phone number validation), real-time slot availability, and session date restrictions.
- **Secure JWT Authentication** — Email/password and Google sign-in powered by Better Auth, with JWT-secured API routes and protected private pages across the entire app.
- **Full Tutor Management (CRUD)** — Logged-in users can list themselves as a tutor with a category dropdown for subject and teaching mode, then update or delete their own listings from a dedicated "My Tutors" dashboard.
- **Booking Dashboard with Cancellation** — A table-based "My Booked Sessions" page lets students track booking status at a glance and cancel a session, which automatically frees up the tutor's slot.
- **Editable User Profile** — A private profile page where users can update their display name and photo at any time.
- **Light & Dark Mode** — A fully themeable interface with a one-click light/dark toggle applied consistently across every page and component.
- **Fully Responsive Design** — Built mobile-first with Tailwind CSS and HeroUI, ensuring a smooth experience across phones, tablets, and desktops.

## Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, HeroUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** Better Auth (JWT-based)
- **Deployment:** Vercel