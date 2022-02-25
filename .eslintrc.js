module.exports = {
  plugins: ['simple-import-sort', 'react-hooks'],
  extends: ['standard-with-typescript', 'eslint-config-prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'no-void': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
