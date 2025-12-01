"use client";

import { useEffect, useRef } from "react";

export default function LivePreview({ code }: { code: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!doc) return;

    // Base HTML template inside the iframe
    const html = `
      <html>
        <head>
          <style>
            body { margin: 0; padding: 20px; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <div id="root"></div>

          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

          <script type="text/babel">
            ${code}
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(React.createElement(GeneratedUI));
          </script>

          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(html);
    doc.close();
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border rounded bg-white"
    />
  );
}
