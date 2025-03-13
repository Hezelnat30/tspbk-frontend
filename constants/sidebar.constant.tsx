import { CiGrid41 } from "react-icons/ci";
import { LuListMusic } from "react-icons/lu";
import { MdOutlineEventNote } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";

const sidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <CiGrid41 size={22} />,
  },
  {
    key: "services",
    label: "Services",
    href: "/dashboard/services",
    icon: <MdOutlineEventNote size={22} />,
  },
  {
    key: "songs",
    label: "Songs",
    href: "/dashboard/songs",
    icon: <LuListMusic size={22} />,
  },
  {
    key: "worshipLeaders",
    label: "Worship Leaders",
    href: "/dashboard/worship-leaders",
    icon: <PiUserListBold size={22} />,
  },
];

export { sidebarItems };
