import Image from 'next/image';
import React from 'react';

const ProfilePage = () => {
    return (
        <div>
            {/* Profile */}
                <div className="w-full md:w-1/4">
                    <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
                        <Image
                            src={session?.user?.image}
                            alt={session?.user?.name}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full"
                        />

                        <h2 className="text-xl font-bold mt-4 text-slate-900 dark:text-white">
                            {session?.user?.name}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {session?.user?.email}
                        </p>
                    </div>
                </div>

        </div>
    );
};

export default ProfilePage;