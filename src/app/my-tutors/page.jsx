import DeleteTutorButton from "@/components/DeleteTutorButton";
import UpdateTutorModal from "@/components/UpdateTutorModal";
import { auth } from "@/lib/auth";
import { Users } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";


export const metadata = {
  title: "My-tutors",
  description: "This is my tutors page.",
};

const fetchMyTutors = async (email, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-tutors/${email}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();
  return data || [];
};

const MyTutorsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const { token } = await auth.api.getToken({ headers: await headers() });

  const email = session?.user?.email;
  const myTutors = await fetchMyTutors(email, token)

  return (
    <div className="min-h-[80vh] bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            My <span className="text-brand-400">Tutors</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Tutors you have added to the platform
          </p>
        </div>

        {myTutors.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-slate-200 p-16 text-center space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-slate-600 font-bold text-lg">
              You have not added any tutors yet
            </p>
            <p className="text-slate-400 text-sm">
              Start by adding your first tutor to the platform
            </p>
            <Link
              href="/add-tutor"
              className="inline-block mt-2 px-6 py-3 bg-brand-400 text-white font-bold rounded-2xl"
            >
              Add Tutor
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Fee
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Slot
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {myTutors.map((tutor) => (
                  <tr
                    key={tutor._id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {tutor.tutorName}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {tutor.subjectName}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      ৳{tutor.hourlyFee}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {tutor.totalSlot}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <UpdateTutorModal tutor={tutor} />
                        <DeleteTutorButton tutorId={tutor._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTutorsPage;
