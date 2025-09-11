import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useJenisDokumen } from "@/stores/jenisDokumen.store";
import { Download, FileText, ImageIcon } from "lucide-react";

function getDocumentIcon(type?: string) {
  switch (type) {
    case "pdf":
      return <FileText className={`w-5 h-5 text-red-500`} />;
    case "xlsx":
      return <FileText className={`w-5 h-5 text-green-500`} />;
    case "png":
    case "jpg":
    case "jpeg":
      return <ImageIcon className={`w-5 h-5 text-yellow-500`} />;
    case "docx":
      return <FileText className={`w-5 h-5 text-blue-500`} />; // Anda bisa mengganti ikon sesuai kebutuhan
    default:
      return <FileText className={`w-5 h-5 text-gray-500`} />;
  }
}

function DocumentGrid() {
  const documents = useJenisDokumen().useGlobalStore(
    (s) => s["getJenisDokumenData"]
  );

  const handleDownload = (filePath?: string) => {
    const fileUrl = `${String(import.meta.env.VITE_PUBLIC_BASE_URL).replace(
      "/api",
      ""
    )}/storage/${filePath}`;

    const newWindow = window.open(fileUrl, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents?.data
        ?.filter((item) => item?.dokumen != null)
        .map((doc) => (
          <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 mt-1">
                  {getDocumentIcon(doc.dokumen?.file_path?.split(".").pop())}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 leading-relaxed line-clamp-3">
                    {doc.dokumen?.group?.replace("Unggah", "")}
                  </h3>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                onClick={() => handleDownload(doc.dokumen?.file_path)}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default DocumentGrid;
