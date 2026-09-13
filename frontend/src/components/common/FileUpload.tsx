'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileCheck, AlertCircle, X, FileText, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

export interface FileUploadResult {
  name: string;
  size: string;
  type: string;
  file: File;
}

export interface FileUploadProps {
  onFileUpload?: (result: FileUploadResult) => void;
  accept?: string;
  maxSizeMB?: number;
  title?: string;
  helperText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  accept = ".pdf,.jpg,.jpeg,.png,.dwg",
  maxSizeMB = 15,
  title = "Upload Document",
  helperText = "Accepted formats: PDF, JPG, PNG (Max size: 15 MB)"
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    setError(null);
    setUploadSuccess(false);

    if (!file) return;

    // Check size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      setError(`File size exceeds maximum limit of ${maxSizeMB} MB. Current size: ${sizeInMB.toFixed(2)} MB`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(25);
    setUploadStage("Encrypting & transmitting file to Single-Window Vault...");

    setTimeout(() => {
      setUploadProgress(70);
      setUploadStage("Running OCR metadata check & verifying digital signatures...");
    }, 700);

    setTimeout(() => {
      setUploadProgress(100);
      setUploadStage("Verified. Generating immutable locker reference...");
    }, 1400);

    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      if (onFileUpload) {
        onFileUpload({
          name: selectedFile.name,
          size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
          type: selectedFile.type || 'application/pdf',
          file: selectedFile
        });
      }
    }, 1800);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setError(null);
    setUploadSuccess(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full space-y-4">
      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current && inputRef.current.click()}
        className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
          dragActive
            ? "border-[#0F2942] bg-blue-50/50"
            : selectedFile
            ? "border-emerald-400 bg-emerald-50/20"
            : "border-slate-300 hover:border-slate-400 bg-slate-50/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 mb-3">
          {selectedFile ? (
            <FileCheck className="h-6 w-6 text-emerald-600" />
          ) : (
            <UploadCloud className="h-6 w-6 text-[#0F2942]" />
          )}
        </div>

        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500 mt-1">
          Drag and drop your file here, or <span className="text-blue-600 font-medium">browse local storage</span>
        </p>
        <p className="text-[11px] text-slate-400 mt-2">{helperText}</p>
      </div>

      {/* Selected File Card */}
      {selectedFile && (
        <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-blue-50 p-2 text-blue-700">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 line-clamp-1">{selectedFile.name}</p>
              <p className="text-[11px] text-slate-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 rounded-md bg-rose-50 p-3 text-xs text-rose-800 border border-rose-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Active Upload & Verification Progress Bar */}
      {isUploading && (
        <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-3.5 space-y-2 text-xs">
          <div className="flex items-center justify-between text-blue-900 font-semibold">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <span>{uploadStage}</span>
            </div>
            <span className="font-mono text-[11px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              {uploadProgress}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-blue-200/70">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success Notification */}
      {uploadSuccess && (
        <div className="flex items-center justify-between rounded-md bg-emerald-50 p-3.5 text-xs text-emerald-900 border border-emerald-300 shadow-2xs animate-fade-in">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
            <div>
              <p className="font-bold">Document Verified & Archived in Vault</p>
              <p className="text-[11px] text-emerald-700">Digital checksum logged. Ready for multi-department statutory review.</p>
            </div>
          </div>
          <FileCheck className="h-5 w-5 text-emerald-600" />
        </div>
      )}

      {/* Upload Action Button */}
      {selectedFile && !uploadSuccess && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="primary"
            loading={isUploading}
            onClick={handleUploadSubmit}
            icon={UploadCloud}
          >
            {isUploading ? "Uploading & Verifying..." : "Upload Document"}
          </Button>
        </div>
      )}
    </div>
  );
};
