"use client";

import { useState, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";


export default function UploadBox({ onImageSelect }: { onImageSelect: (file: File) => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onImageSelect(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <Card
      className={`p-4 border-dashed rounded-lg transition ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {!preview ? (
          <>
            <p className="text-sm text-gray-600 mb-2">Drag & drop your UI screenshot here</p>
            <p className="text-xs text-gray-500 mb-3">or click to upload</p>

            <Button
              onClick={() => document.getElementById("fileInput")?.click()}
              className="text-sm"
            >
              Choose File
            </Button>

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </>
        ) : (
          <Image
  src={preview}
  alt="Preview"
  width={300}
  height={300}
  unoptimized
  className="rounded-md border mt-2 max-h-64 object-cover"
/>

        )}
      </div>
    </Card>
  );
}
