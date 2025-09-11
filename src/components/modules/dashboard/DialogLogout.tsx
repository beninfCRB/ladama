import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { handlerLogout } from "@/handlers/auth/login.handler";
import { useLogout } from "@/stores/auth.store";

function DialogLogout() {
  const { dialog, setDialog } = useLogout();

  const handleLogout = () => {
    setDialog(false);
    handlerLogout();
  };

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Logout</DialogTitle>
          <DialogDescription>
            Anda yakin ingin melanjutkan log out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setDialog(false)}>
            Batalkan
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogLogout;
