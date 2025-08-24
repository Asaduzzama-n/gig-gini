import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
      rules: {
      // Disable unused vars warning
      "@typescript-eslint/no-unused-vars": "warn",

      // Allow 'any'
      "@typescript-eslint/no-explicit-any": "warn",

      // Allow unescaped entities like ' or "
      "react/no-unescaped-entities": "warn",

      // Ignore exhaustive deps in hooks
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
