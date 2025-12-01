"use client";

import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import UploadBox from "@/components/UploadBox";
import { useState } from "react";

import { generateReactCode } from "@/lib/generate/react";
import { formatCode } from "@/lib/format";

import CodeEditor from "@/components/CodeEditor";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LivePreview from "@/components/LivePreview";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";

// Type for UI component (safe version)
interface UIComponent {
  id: string;
  type: string;
  text?: string;
  src?: string;
  [key: string]: unknown;
}

export default function Studio() {
  const [components, setComponents] = useState<UIComponent[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [framework, setFramework] = useState<"react" | "vue" | "svelte">("react");


  async function analyzeImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/analyze-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("AI Output:", data);

    const parsedComponents: UIComponent[] = data.components || [];

    setComponents(parsedComponents);
    setUploadedImageUrl(data.imageUrl || null);

    const rawCode = generateReactCode(parsedComponents);
    const formatted = await formatCode(rawCode);
    setGeneratedCode(formatted);
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <Navbar />

      {/* MAIN 3-PANEL WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-[320px] border-r bg-white p-4 overflow-auto">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3">Upload</h2>
            <UploadBox onImageSelect={(file) => analyzeImage(file)} />
          </Card>
        </div>

        {/* MIDDLE PANEL */}
        <div className="w-[360px] border-r bg-white p-4 overflow-auto">
          <Card className="p-4 h-full">
            <h2 className="text-lg font-semibold mb-3">Detected Components</h2>

            {components.length === 0 ? (
              <p className="text-sm text-gray-500">No components detected yet.</p>
            ) : (
              <ul className="space-y-2">
                {components.map((c) => (
                  <li key={c.id} className="text-sm p-2 border rounded">
                    <b>{c.type}</b> — {c.text || "No text"}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white p-4 overflow-auto">
          <Card className="p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-3">Output</h2>

            <Tabs defaultValue="code" className="flex-1 flex flex-col">
                <div className="mb-4">
  <Select onValueChange={(v) => setFramework(v as any)} defaultValue="react">
    <SelectTrigger className="w-40">
      <SelectValue placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
    </SelectContent>
  </Select>
</div>

              <TabsList className="w-48">
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="flex-1">
                <CodeEditor
                  code={generatedCode}
                  onChange={(val) => setGeneratedCode(val || "")}
                />
              </TabsContent>

              <TabsContent value="preview" className="flex-1">
                <LivePreview code={generatedCode} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

      </div>
    </div>
  );
}
