"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center p-4 bg-white border-b border-gray-200">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white">
          <SidebarNavigation
            isMobile={true}
            onMobileToggle={() => setIsOpen(false)}
          />
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <span className="text-gray-600">🏠</span>
        <span className="font-semibold text-gray-800">Dashboard</span>
      </div>
    </div>
  );
}

export default MobileHeader;
