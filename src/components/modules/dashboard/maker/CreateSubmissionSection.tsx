import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function CreateSubmissionSection() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-gray-600 font-medium">
          BUAT PENGAJUAN
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8 space-y-4 flex-1">
        <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
        <Button
          variant="ghost"
          className="text-green-600 hover:text-green-700 p-0 h-auto"
        >
          Buat Pengajuan
        </Button>
      </CardContent>
    </Card>
  );
}

export default CreateSubmissionSection;
