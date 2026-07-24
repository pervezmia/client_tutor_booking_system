import { ShieldCheck, Clock, Wallet, Star } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Tutors",
    description:
      "Every tutor's institution and experience is reviewed before they can list a session.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Book sessions around your own routine with time slots that actually fit your day.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "Hourly fees are shown upfront, no hidden charges or surprise costs later.",
  },
  {
    icon: Star,
    title: "Subject Variety",
    description:
      "From Higher Math to Computer Science, find tutors across a wide range of subjects.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Why Choose TutorBooking
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg">
            Built to make finding the right tutor simple, fast, and reliable.
          </p>
        </div>

        <div  data-aos="fade-right" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-brand-500 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-500 text-white mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;