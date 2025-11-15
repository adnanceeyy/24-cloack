import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignore dist
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx}"],

    ignores: ["dist/**", "node_modules/**"],

    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,     // React JSX linting
      reactHooks.configs.flat.recommended, // Correct rules for hooks
      reactRefresh.configs.vite,           // Vite fast refresh support
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // Allow unused uppercase constants (e.g. DEFERRED_PROMPT)
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],

      // Required for React 18 apps
      "react/react-in-jsx-scope": "off",

      // Enforce good JSX formatting
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
    },
  },
]);
