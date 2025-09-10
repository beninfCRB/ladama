"use client";

import { ChevronLeft, ChevronRight, FileText, Home } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import MenuButton from "./MenuButton";
import { useUserStore } from "@/stores/user.store";

interface SidebarNavigationProps {
  isMobile?: boolean;
  onMobileToggle?: () => void;
}

const SidebarNavigation = ({
  isMobile = false,
  onMobileToggle,
}: SidebarNavigationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const isDashboardActive = location.pathname.includes("dashboard");
  const isDokumenActive = location.pathname === "/dokumen";

  const SidebarContent = () => (
    <div className="flex flex-col py-4 h-full bg-[#10a249]">
      <div className="flex items-center justify-between px-4 mb-4">
        {(isExpanded || isMobile) && (
          <span className="text-lg font-semibold text-gray-50">Menu</span>
        )}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-50 hover:bg-gray-50 hover:text-[#f9b128] transition-colors"
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      <div className="space-y-2 px-2">
        <MenuButton
          isActive={isDashboardActive}
          label="Dashboard"
          icon={Home}
          isExpanded={isExpanded}
          isMobile={isMobile}
          onClick={() => {
            if (isMobile && onMobileToggle) onMobileToggle();
            navigate(`/${user?.role_user}/dashboard`);
          }}
        />
        <MenuButton
          isActive={isDokumenActive}
          label="Dokumen"
          icon={FileText}
          isExpanded={isExpanded}
          isMobile={isMobile}
          onClick={() => {
            if (isMobile && onMobileToggle) onMobileToggle();
            navigate("/dokumen");
          }}
        />
      </div>
    </div>
  );

  return isMobile ? (
    <SidebarContent />
  ) : (
    <div
      className={`${
        isExpanded ? "w-64" : "w-16"
      } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out hidden lg:flex flex-col`}
    >
      <SidebarContent />
    </div>
  );
};

export default SidebarNavigation;
