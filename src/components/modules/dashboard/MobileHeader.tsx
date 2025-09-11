"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    console.log("User logged out");
    window.location.href = "/auth/login";
  };

  return (
    <div className="lg:hidden flex items-center p-4 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
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
            onLogout={() => setIsLogoutDialogOpen(true)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2">
        <span className="text-gray-600">🏠</span>
        <span className="font-semibold text-gray-800">Dashboard</span>
      </div>

      {/* Dialog dipindahkan keluar dari Sidebar */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Anda yakin ingin melanjutkan log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsLogoutDialogOpen(false)}
            >
              Batalkan
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MobileHeader;
