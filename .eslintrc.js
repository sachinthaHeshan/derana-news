module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser'
  plugins: ['jsx-a11y', 'import', 'prettier', '@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
  extends: [
    'airbnb', // Airbnb style guide
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    // prettier
    'prettier/prettier': ['error'],
    camelcase: 'off',
    'react/require-default-props': 'off',
    // React
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
    'react/prop-types': ['off', {}],
    'jsx-a11y/click-events-have-key-events': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.d.ts'],
      },
      typescript: {
        alwaysTryTypes: true,
      }, // this loads <rootdir>/aatsconfig.json to eslint
      project: '.',
    },
    'import/extensions': ['.js', '.ts', '.mjs', '.jsx', '.tsx'],
    'import/core-modules': ['test-utils'],
  },
};
