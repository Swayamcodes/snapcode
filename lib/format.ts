import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";

export async function formatCode(code: string) {
  return await prettier.format(code, {
    parser: "babel",
    plugins: [parserBabel],
  });
}
