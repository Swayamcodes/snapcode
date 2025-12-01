import type { UIComponent } from "@/src/types/types";

export function generateSvelteCode(components: UIComponent[]) {
  let markup = "";

  components.forEach((c) => {
    if (c.type === "button") {
      markup += `
<button class="px-4 py-2 bg-blue-600 text-white rounded-md">
  ${c.text || "Button"}
</button>
`;
    }

    if (c.type === "text" || c.type === "heading") {
      markup += `
<p class="text-gray-800">
  ${c.text || "Text"}
</p>
`;
    }

    if (c.type === "input") {
      markup += `
<input
  type="text"
  placeholder="${c.text || "Input"}"
  class="border px-3 py-2 rounded-md"
/>
`;
    }
  });

  return `
<script></script>

<div class="flex flex-col gap-4 p-4">
  ${markup}
</div>
`;
}
