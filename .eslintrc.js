module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@tanstack/query', 'simple-import-sort', 'import'],
  rules: {
    'arrow-parens': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'function-paren-newline': 'off',
    'no-extra-boolean-cast': 'off',
    'no-confusing-arrow': 'off',
    'no-unused-expressions': 'off',
    'no-alert': 'off',
    'no-restricted-globals': 'off',
    'react/prop-types': 'off',
    'consistent-return': 'off',
    'prefer-destructuring': 'off',
    'no-nested-ternary': 'off',

    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/jsx-wrap-multilines': 'off',
    'react/no-array-index-key': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-curly-newline': 'off',
    'react/no-unused-prop-types': 'off',

    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/interactive-supports-focus': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',

    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/prefer-default-export': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        types: 'always',
        styles: 'always',
        ts: 'never',
        tsx: 'never',
        svg: 'always',
        png: 'always',
        webp: 'always',
      },
    ],
  },
  ignorePatterns: ['config', 'dist', '*.config.*'],
};
