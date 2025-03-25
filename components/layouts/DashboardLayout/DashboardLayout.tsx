"use client";
import { sidebarItems } from "@/constants/sidebar.constant";
import React from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import DashboardLayoutTopbar from "./DashboardLayoutTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-3xl flex min-h-screen gap-4 p-4 overflow-hidden 3xl:container bg-[#f9fdff]">
      <DashboardLayoutSidebar sidebarItems={sidebarItems} />
      <div className="h-[calc(100vh-2rem)] w-full">
        <DashboardLayoutTopbar />
        {children}
      </div>
    </div>
  );
}
