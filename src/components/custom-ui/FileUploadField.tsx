"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, FileText, X, Eye, ImageIcon } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type FileTypeMode = "image" | "document";

interface FileUploadFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  mode: FileTypeMode;
  description?: string;
}

function FileUploadField<T extends FieldValues>({
  name,
  control,
  label,
  mode,
  description,
}: FileUploadFieldProps<T>) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Tentukan accept berdasarkan mode
  const accept =
    mode === "image"
      ? "image/*"
      : ".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: FileList | null) => void
  ) => {
    const files = e.target.files;
    onChange(files);

    if (files?.[0]) {
      if (fileUrl) URL.revokeObjectURL(fileUrl);

      setFileName(files[0].name);
      setFileType(files[0].type);
      setFileUrl(URL.createObjectURL(files[0]));
    } else {
      resetFile(onChange);
    }
  };

  const resetFile = (onChange?: (value: FileList | null) => void) => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileName(null);
    setFileType(null);
    setFileUrl(null);

    if (onChange) onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">
            {label} <span className="text-red-500">*</span>
          </FormLabel>
          {description && (
            <div className="text-xs text-gray-500 mb-2">{description}</div>
          )}

          {/* Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center hover:border-gray-400 transition-colors">
            <input
              ref={inputRef}
              type="file"
              id={name}
              className="hidden"
              accept={accept}
              onChange={(e) => handleFileChange(e, field.onChange)}
            />
            <label htmlFor={name} className="cursor-pointer">
              <Upload className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {fileName || "Klik untuk mengunggah file"}
              </p>
            </label>
          </div>

          {/* Actions */}
          {fileUrl && (
            <div className="mt-3 flex items-center justify-between border rounded-md p-2 bg-muted/40">
              <div className="flex items-center space-x-2">
                {mode === "image" ? (
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <FileText className="w-5 h-5 text-gray-500" />
                )}
                <span className="text-sm">{fileName}</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setOpen(true)}
                >
                  <Eye className="w-4 h-4 mr-1" /> Preview
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => resetFile(field.onChange)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Modal Preview */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Preview File</DialogTitle>
              </DialogHeader>

              {mode === "image" && fileUrl ? (
                <img
                  src={fileUrl}
                  alt={fileName ?? "Preview"}
                  className="max-h-[70vh] mx-auto rounded-md"
                />
              ) : mode === "document" && fileType === "application/pdf" ? (
                <iframe
                  src={fileUrl ?? ""}
                  className="w-full h-[70vh] rounded-md"
                  title="preview"
                />
              ) : (
                <div className="p-4 text-center">
                  <FileText className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Preview tidak tersedia.{" "}
                    <a
                      href={fileUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Klik di sini untuk membuka
                    </a>
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FileUploadField;
