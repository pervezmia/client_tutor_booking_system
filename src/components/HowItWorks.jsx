import { Search, CalendarCheck, GraduationCap } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Tutor",
    description:
      "Browse verified tutors by subject, institution, or location and pick the one that fits your learning goals.",
  },
  {
    icon: CalendarCheck,
    title: "Book a Session",
    description:
      "Choose an available time slot and confirm your booking in just a few clicks, no back-and-forth messaging.",
  },
  {
    icon: GraduationCap,
    title: "Start Learning",
    description:
      "Join your session on the scheduled date and start improving your grades with personalized guidance.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg">
            Getting started with TutorBooking takes just three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 mb-5">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="absolute top-4 right-5 text-4xl font-extrabold text-slate-100 dark:text-slate-700">
                  {index + 1}
                </span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;