import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      ".qa-dist/**",
      "node_modules/**",
      "artifacts/**",
      "server/cpanel/vendor/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
