"use client";
import justinpic from "@/public/4.jpg";
import { capitalizeFirstLetter } from "@/utils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { CgLogOut } from "react-icons/cg";

export default function DashboardLayoutTopbar() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const username = capitalizeFirstLetter(session?.user?.username);

  return (
    <div className="shadow-md bg-white h-14 md:h-16 flex items-center justify-between rounded-xl px-2.5">
      <div className="hidden md:flex flex-col items-start px-2">
        <h3 className="text-base font-bold">Hello, {username}</h3>
        <p className="text-xs md:text-sm text-stone-600">
          {role === "admin" ? "Music Director" : "Musician"}
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 md:w-11 md:h-11 order-1 md:order-2 rounded-full overflow-hidden">
          <Image
            alt="profile-picture"
            className="object-cover w-full"
            src={justinpic}
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
