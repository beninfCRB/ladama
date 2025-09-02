"use client";

import { Home, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface SidebarNavigationProps {
  isMobile?: boolean;
  onMobileToggle?: () => void;
}

function SidebarNavigation({
  isMobile = false,
  onMobileToggle,
}: SidebarNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const SidebarContent = () => (
    <div className="flex flex-col py-4 h-full">
      <div className="flex items-center justify-between px-4 mb-4">
        {(isExpanded || isMobile) && (
          <span className="text-lg font-semibold text-gray-800">Menu</span>
        )}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
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
        <button
          className={`w-full flex items-center ${
            isExpanded || isMobile ? "justify-start px-3" : "justify-center"
          } h-12 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors`}
          onClick={isMobile ? onMobileToggle : undefined}
        >
          <Home className="w-5 h-5" />
          {(isExpanded || isMobile) && (
            <span className="ml-3 text-sm font-medium">Dashboard</span>
          )}
        </button>
        <button
          className={`w-full flex items-center ${
            isExpanded || isMobile ? "justify-start px-3" : "justify-center"
          } h-12 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors`}
          onClick={isMobile ? onMobileToggle : undefined}
        >
          <FileText className="w-5 h-5" />
          {(isExpanded || isMobile) && (
            <span className="ml-3 text-sm font-medium">Dokumen</span>
          )}
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return <SidebarContent />;
  }

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-16"
      } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out hidden lg:flex flex-col`}
    >
      <SidebarContent />
    </div>
  );
}

export default SidebarNavigation;
