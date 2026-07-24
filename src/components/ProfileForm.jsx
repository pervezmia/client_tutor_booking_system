"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { User, ImageIcon, Mail } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const INPUT_STYLES =
  "border-2 border-slate-200 dark:border-slate-700 hover:border-brand-400/50 focus-within:border-brand-400 transition-all duration-300 h-14 bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-full rounded-2xl";

const DEFAULT_AVATAR = "/default-avatar.png";

const ProfileForm = ({ user }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsSubmitting(true);

    const { error } = await authClient.updateUser({
      name,
      image,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to update profile!");
      return;
    }

    toast.success("Profile updated successfully!");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <Image
          src={image || DEFAULT_AVATAR}
          alt={name || "User avatar"}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover ring-4 ring-brand-400/10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
          Full Name
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          startContent={<User className="w-5 h-5 text-slate-400" />}
          className={INPUT_STYLES}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
          Profile Image URL
        </label>
        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          type="url"
          startContent={<ImageIcon className="w-5 h-5 text-slate-400" />}
          className={INPUT_STYLES}
        />
      </div>


      <Button
        type="submit"
        color="primary"
        isDisabled={isSubmitting}
        className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-brand-400/20 bg-brand-500 text-white hover:bg-brand-600"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};

export default ProfileForm;