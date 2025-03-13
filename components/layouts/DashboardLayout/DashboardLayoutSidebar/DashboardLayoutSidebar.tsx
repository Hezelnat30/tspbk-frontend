"use client";
import nexticon from "@/public/nexticon.svg";
import { cn } from "@/utils/cn";
import { Listbox, ListboxItem, Tooltip } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaChevronLeft } from "react-icons/fa";

type SidebarItem = {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
};

interface DashboardLayoutSidebarProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarItems: SidebarItem[];
}

export default function DashboardLayoutSidebar(
  props: DashboardLayoutSidebarProps
) {
  const pathname = usePathname();
  const { isOpen, setOpen, sidebarItems } = props;
  console.log;

  return (
    <Fragment>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed z-40 max-w-[300px] min-h-[calc(100vh-2rem)] w-full border-1 shadow border-default-200 bg-primary-yellow p-3 transition-all ease-in-out duration-200 lg:relative lg:translate-x-0 rounded-xl md:block hidden",
          { "translate-x-0": isOpen },
          { "max-w-[83px]": !isOpen }
        )}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 border-1.5 border-default-200 absolute -right-[18px] bg-white rounded-full justify-center !z-50 items-center top-1/2 -translate-y-1/2 shadow-sm hidden lg:flex"
        >
          <FaChevronLeft
            size={18}
            className={cn("transition-all ease-in-out duration-200", {
              "rotate-180": !isOpen,
            })}
          />
        </button>
        <div className="flex flex-col justify-between items-center gap-4 h-full py-2">
          <div
            className={cn(
              "w-full text-left flex items-center px-2 py-4 h-16 gap-1.5 border-b-1 border-primary-lightgray"
            )}
          >
            <div className="w-[40px] h-[40px] flex-shrink-0">
              <Image src={nexticon} width={50} height={50} alt="nexticon" />
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
          <Listbox
            items={sidebarItems}
            className="flex-1"
            aria-label="dashboard-sidebar"
          >
            {(item) => (
              <ListboxItem
                key={item.key}
                startContent={<div className={cn("px-1.5")}>{item.icon}</div>}
                href={item.href}
                as={Link}
                aria-labelledby={item.label}
                aria-describedby={item.label}
                className={cn(
                  "h-12 my-1 space-x-0.5 overflow-hidden hover:!bg-primary-lightgray/70 transition-all ease-in-out duration-200",
                  {
                    "bg-white": pathname.startsWith(item.href),
                  }
                )}
              >
                <p
                  className={cn(
                    "text-base origin-left transition-all duration-200 ease-in-out"
                  )}
                >
                  {item.label}
                </p>
              </ListboxItem>
            )}
          </Listbox>
          <div className={cn("flex items-center px-1 w-full")}>
            <button
              onClick={() => signOut()}
              className={cn(
                "h-12 hover:bg-primary-lightgray text-base flex items-center justify-start bg-transparent text-left overflow-hidden transition-all ease-in-out duration-200 w-full rounded-xl px-4"
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
                    "bg-white": pathname.startsWith(href),
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
