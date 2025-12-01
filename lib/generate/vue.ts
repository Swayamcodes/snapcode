import type { UIComponent } from "@/src/types/types"

export function generateVueCode(components: UIComponent[]) {
  let template = "";

  components.forEach((c) => {
    if (c.type === "button") {
      template += `
<button class="px-4 py-2 bg-blue-600 text-white rounded-md">
  ${c.text || "Button"}
</button>
`;
    }

    if (c.type === "text" || c.type === "heading") {
      template += `
<p class="text-gray-800">
  ${c.text || "Text"}
</p>
`;
    }

    if (c.type === "input") {
      template += `
<input
  type="text"
  placeholder="${c.text || "Input"}"
  class="border px-3 py-2 rounded-md"
/>
`;
    }
  });

  return `
<template>
  <div class="flex flex-col gap-4 p-4">
    ${template}
  </div>
</template>

<script setup></script>

<style scoped></style>
`;
}
