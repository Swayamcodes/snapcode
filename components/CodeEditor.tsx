"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  onChange,
}: {
  code: string;
  onChange?: (value: string | undefined) => void;
}) {
  return (
    <div className="h-full w-full border rounded">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
