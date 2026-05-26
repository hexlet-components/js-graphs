import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  js.configs.recommended,

  importPlugin.flatConfigs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/extensions': ['error', 'ignorePackages'],
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/order': ['warn', { alphabetize: { order: 'asc' } }],
    },
  },

  {
    files: ['__tests__/**'],
    ...jestPlugin.configs['flat/recommended'],
  },

  {
    ignores: ['dist', 'node_modules', 'docs'],
  },
];
