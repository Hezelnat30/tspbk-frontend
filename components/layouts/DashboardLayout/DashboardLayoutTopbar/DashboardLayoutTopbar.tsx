"use client";
import userpic from "@/public/userpicdummy.jpg";
import { capitalizeFirstLetter } from "@/utils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { CgLogOut } from "react-icons/cg";

export default function DashboardLayoutTopbar() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const username = capitalizeFirstLetter(session?.user?.username);
  return (
    <div className="border-b-1.5 border-default-200 h-14 md:h-16 flex items-center justify-between md:justify-end bg-gradient-to-r from-primary-yellow to-primary-lightyellow rounded-xl shadow px-2.5">
      <div className="flex items-center gap-2.5">
        <div className="flex order-2 md:order-1 flex-col items-start md:items-end">
          <h5 className="text-sm md:text-base font-medium">{username}</h5>
          <p className="text-xs md:text-sm">
            {role === "admin" ? "Music Director" : "Musician"}
          </p>
        </div>
        <div className="w-9 h-9 md:w-10 md:h-10 order-1 md:order-2  bg-teal-400 rounded-full overflow-hidden">
          <Image
            alt="profile-picture"
            className="object-cover w-full"
            src={userpic}
            width={30}
            height={30}
          />
        </div>
      </div>
      <button onClick={() => signOut()} className="md:hidden text-center p-2">
        <CgLogOut size={22} />
      </button>
    </div>
  );
}
