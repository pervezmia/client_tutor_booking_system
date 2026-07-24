import ProfileForm from "@/components/ProfileForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "My Profile",
  description: "View and update your profile information.",
};

const ProfilePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              My <span className="text-brand-400">Profile</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Update your personal information
            </p>
          </div>

          <ProfileForm user={session?.user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;