module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.app.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'react/button-has-type': 'off',
    'react/require-default-props': [
      'error',
      {
        functions: 'defaultArguments',
      },
    ],

    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: [
    //       'vite.config.ts',
    //       '**/*.test.ts',
    //       '**/*.test.tsx',
    //       '**/*.spec.ts',
    //       '**/*.spec.tsx',
    //       '**/setupTests.ts',
    //       'jest.config.*',
    //     ],
    //   },
    // ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'draft', 'acc', 'e'],
        ignorePropertyModificationsForRegex: ['^state', '^draft', '^acc', '^e'],
      },
    ],
    'no-empty-pattern': 'warn',
  },
  settings: {
    react: {
      version: '18.2.0',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['**/setupTests.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  ignorePatterns: [
    'jest.config.*',
    'vite.config.ts',
    '*.d.ts',
    'dist',
    'node_modules',
    '*.js',
    '*.cjs',
    'public/**/*',
  ],
};
