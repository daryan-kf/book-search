import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules', 'dist'],
  },

  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json', // Point to your tsconfig.json
      },
      globals: globals.browser,
    },
    plugins: [
      'jest',
      {
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'), // Load TypeScript plugin
      },
    ],
    extends: ['plugin:jest/recommended'],
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(__dirname, 'tsconfig.json'), // Resolve paths from tsconfig.json
        },
      },
    },
    rules: {
      'no-unused-vars': 'off', // Turn off default no-unused-vars
      '@typescript-eslint/no-unused-vars': ['error'], // Use TypeScript-aware rule
      '@typescript-eslint/consistent-type-imports': 'warn', // Enforce consistent type imports
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ], // Enforce import order
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
