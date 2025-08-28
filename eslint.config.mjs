import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js,
      react: pluginReact, // Подключаем ESLint для React
      prettier: pluginPrettier,
    },
    extends: [
      'js/recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime', // 🚀 Убирает ошибку про React в JSX
      prettier,
    ],
    settings: {
      react: {
        version: 'detect', // Автоопределение версии React
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  tseslint.configs.recommended,
]);
