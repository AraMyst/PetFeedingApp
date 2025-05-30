import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // 1) Ignore build outputs and dependencies
  {
    ignores: ['dist', 'build', 'node_modules'],
  },

  // 2) Apply these rules to all JS/JSX files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        React: 'readonly', // JSX runtime injects React automatically
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Base JavaScript recommended rules
      ...js.configs.recommended.rules,

      // React JSX-specific recommended rules
      ...react.configs.recommended.rules,

      // Enforce the Rules of Hooks
      ...reactHooks.configs.recommended.rules,

      // Warn if you export non-components when using React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // No unused vars, but allow component names (PascalCase) and constants (UPPER_SNAKE)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
]
