"use client";
import nexticon from "@/public/nexticon.svg";
import { useSidebarStore } from "@/store/sidebar.store";
import { cn } from "@/utils/cn";
import { Tooltip } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaChevronLeft } from "react-icons/fa";

type SidebarItem = {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
};

interface DashboardLayoutSidebarProps {
  sidebarItems: SidebarItem[];
}

export default function DashboardLayoutSidebar(
  props: DashboardLayoutSidebarProps
) {
  const pathname = usePathname();
  const { sidebarItems } = props;
  const { isOpen, toggleSidebar, setSidebarOpen } = useSidebarStore();

  useEffect(() => {
    setSidebarOpen(true);
  }, []);

  return (
    <Fragment>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed z-40 max-w-[300px] min-h-[calc(100vh-2rem)] w-full shadow-md bg-white p-3 transition-all ease-in-out duration-200 lg:relative lg:translate-x-0 rounded-xl md:block hidden",
          { "translate-x-0": isOpen },
          { "max-w-[83px]": !isOpen }
        )}
      >
        <button
          onClick={toggleSidebar}
          className="p-1 border-1.5 border-default-300 absolute -right-3 bg-white rounded-full justify-center !z-50 items-center top-1/2 -translate-y-1/2 shadow-sm hidden lg:flex"
        >
          <FaChevronLeft
            size={18}
            className={cn("transition-all ease-in-out duration-200", {
              "rotate-180": !isOpen,
            })}
          />
        </button>
        <div className="flex flex-col justify-between items-center gap-4 h-full py-1">
          <div
            className={cn(
              "relative w-full text-left flex items-center p-2 h-10 gap-1.5 "
            )}
          >
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-[calc(100%-10px)] h-0.5 bg-primary-lightgray/70 rounded-full"></span>
            <div className="w-[40px] h-[40px] flex-shrink-0">
              <Image
                src={nexticon}
                width={50}
                height={50}
                alt="nexticon"
                priority
              />
            </div>
            <h3
              className={cn(
                "font-bold text-xl uppercase text-left origin-left transition-all ease-in-out",
                {
                  "scale-0 opacity-0": !isOpen,
                }
              )}
            >
              Tracking Project
            </h3>
          </div>
          <div className="w-full mt-4 px-1 flex-1 flex flex-col gap-2">
            {sidebarItems.map(({ href, icon, key, label }) => (
              <Link
                key={key}
                href={href}
                className={cn(
                  "h-12 overflow-hidden transition-all ease-in-out duration-200 flex justify-start px-3.5 items-center gap-2 hover:bg-primary-lightyellow w-full rounded-lg",
                  {
                    "bg-primary-yellow": pathname === href,
                  }
                )}
              >
                <div className="w-[22px] flex justify-center">{icon}</div>
                {isOpen && <p className="text-base ml-2">{label}</p>}
              </Link>
            ))}
          </div>
          <div className={cn("flex items-center px-1 w-full")}>
            <button
              onClick={() => signOut()}
              className={cn(
                "h-12 hover:bg-primary-lightgray text-base flex items-center justify-start bg-transparent text-left overflow-hidden transition-all ease-in-out duration-200 w-full rounded-lg px-3.5"
              )}
            >
              <div className="w-[22px] flex justify-center">
                <CgLogOut size={22} className="hover:scale-95" />
              </div>
              {isOpen && (
                <span
                  className={cn("ml-2.5 transition-all duration-200", {
                    "hidden ml-0": !isOpen,
                  })}
                >
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>
      {/* Mobile Navbar */}
      <div className="fixed z-50 flex justify-center items-center bottom-0 left-0 w-full p-4 md:hidden">
        <nav className="flex bg-primary-yellow w-full max-w-[240px] py-3 rounded-full justify-evenly items-center mx-auto">
          {sidebarItems.map(({ href, icon, key, label }) => (
            <Tooltip
              key={key}
              content={label}
              placement="top"
              offset={8}
              showArrow={true}
            >
              <Link
                key={key}
                href={href}
                className={cn(
                  "text-center rounded-full p-2 border-1 border-white hover:bg-primary-lightgray transition-all ease-in-out",
                  {
                    "bg-white": href === pathname,
                  }
                )}
              >
                {icon}
              </Link>
            </Tooltip>
          ))}
        </nav>
      </div>
    </Fragment>
  );
}
