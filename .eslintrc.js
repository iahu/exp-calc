module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'prefer-const': ['warn'],
    'no-control-regex': 'off',
  },
  overrides: [
    {
      files: ['dist/**/*.js', 'node_modules/**/*.stories.ts', 'test/**/*.js'],
      rules: {
        indent: ['warn', 4, { SwitchCase: 1 }],
        semi: 'off',
        quotes: 'off',
        'no-func-assign': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-global-assign': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['test/**/*.js'],
      rules: {
        indent: ['warn', 2, { SwitchCase: 1 }],
      },
    },
    {
      files: ['build/*.js'],
      rules: {
        indent: ['warn', 2, { SwitchCase: 1 }],
      },
    },
    {
      files: ['src/**/*.stories.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
}
