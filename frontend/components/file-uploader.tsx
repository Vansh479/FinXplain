"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, X, AlertCircle, CheckCircle, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FileUploaderProps {
  onFileUploaded?: () => void;
  onFileSelect?: (file: File) => void;
}

export function FileUploader({ onFileUploaded, onFileSelect }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // Upped to 10MB for large annual reports

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles && rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === "file-too-large") {
          setError(`Report exceeds 10MB limit.`);
        } else if (rejection.errors[0].code === "file-invalid-type") {
          setError(`Only PDF reports are accepted.`);
        } else {
          setError(`Invalid document: ${rejection.errors[0].message}`);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setIsUploading(true);
        
        // Simulate local processing/indexing delay
        setTimeout(() => {
          setFile(selectedFile);
          setIsUploading(false);
          if (onFileUploaded) onFileUploaded();
          if (onFileSelect) onFileSelect(selectedFile);
        }, 800);
      }
    },
    [onFileUploaded, onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    disabled: isUploading,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      {error && (
        <Alert variant="destructive" className="mb-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-teal-500 bg-teal-50/50 scale-[1.01]"
              : "border-slate-200 hover:border-teal-400 hover:bg-slate-50"
          } ${isUploading ? "opacity-70" : ""}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <FileText className={`h-12 w-12 mb-3 ${isDragActive ? "text-teal-600" : "text-slate-400"}`} />
            <p className="text-sm text-slate-600 font-medium">
              Drop fiscal report here, or <span className="text-teal-600 underline">browse files</span>
            </p>
            <p className="text-xs text-slate-400 mt-2">
              PDF Standard • Max 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-xl p-5 bg-white border-teal-200 shadow-sm transition-all animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-teal-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-teal-600" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900 truncate max-w-[250px]">{file.name}</p>
                <p className="text-slate-500 text-xs font-mono">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFile(null)}
              className="hover:bg-red-50 hover:text-red-600 rounded-full h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}