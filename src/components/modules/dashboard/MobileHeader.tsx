"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";
import { useLogout } from "@/stores/auth.store";
import { useLocation } from "react-router";

function MobileHeader() {
  const { setDialog } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const capitalizedPath =
    pathSegments.length > 2
      ? pathSegments[2].charAt(0).toUpperCase() + pathSegments[2].slice(1)
      : "";

  return (
    <div className="lg:hidden flex items-center p-4 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 mb-4">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white">
          <SidebarNavigation
            isMobile
            onMobileToggle={() => setIsOpen(false)}
            onLogout={() => setDialog(true)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2">
        <span className="text-gray-600">🏠</span>
        <span className="font-semibold text-gray-800">{capitalizedPath}</span>
      </div>
    </div>
  );
}

export default MobileHeader;
