import type { UIComponent } from "@/src/types/types"



export function generateReactCode(components: UIComponent[]) {
  let jsx = "";

  components.forEach((c) => {
    if (c.type === "button") {
      jsx += `
<button className="px-4 py-2 bg-blue-600 text-white rounded-md">
  ${c.text || "Button"}
</button>
`;
    }

    if (c.type === "text" || c.type === "heading") {
      jsx += `
<p className="text-gray-800">
  ${c.text || "Text"}
</p>
`;
    }

    if (c.type === "input") {
      jsx += `
<input
  type="text"
  placeholder="${c.text || "Input"}"
  className="border px-3 py-2 rounded-md"
/>
`;
    }

    if (c.type === "image") {
      jsx += `
<img
  src="${c.src || ""}"
  alt="Image"
  className="w-32 h-32 rounded-md"
/>
`;
    }
  });

  // Wrap inside a parent container
  return `
export default function GeneratedUI() {
  return (
    <div className="flex flex-col gap-4 p-4">
      ${jsx}
    </div>
  );
}
`;
}
