"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, X, AlertCircle, FileText, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const MAX_FILES = 5;

interface FileUploaderProps {
  onFilesChange?: (files: File[]) => void;
}

export function FileUploader({ onFilesChange }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles && rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === "file-too-large") {
          setError("Each file must be under 50MB.");
        } else if (rejection.errors[0].code === "file-invalid-type") {
          setError("Only PDF files are accepted.");
        } else if (rejection.errors[0].code === "too-many-files") {
          setError(`Maximum ${MAX_FILES} files allowed.`);
        } else {
          setError(rejection.errors[0].message);
        }
        return;
      }

      const newFiles = [...files, ...acceptedFiles].slice(0, MAX_FILES);
      setFiles(newFiles);
      if (onFilesChange) onFilesChange(newFiles);
    },
    [files, onFilesChange]
  );

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (onFilesChange) onFilesChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
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

      {files.length < MAX_FILES && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragActive
              ? "border-teal-500 bg-teal-50/50"
              : "border-slate-200 hover:border-teal-400 hover:bg-slate-50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-1">
            <Upload className={`h-5 w-5 ${isDragActive ? "text-teal-600" : "text-slate-400"}`} />
            <p className="text-xs text-slate-500">
              Drop PDFs here, or <span className="text-teal-600 underline">browse</span>
            </p>
            <p className="text-[10px] text-slate-400">
              PDF only &bull; Up to {MAX_FILES} files &bull; Max 50MB each
            </p>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2 mt-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between border rounded-lg p-3 bg-white border-slate-200">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-4 w-4 text-teal-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-800 truncate max-w-[200px]">{file.name}</p>
                  <p className="text-[10px] text-slate-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-6 w-6 p-0 rounded-full hover:bg-red-50 hover:text-red-600 shrink-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
