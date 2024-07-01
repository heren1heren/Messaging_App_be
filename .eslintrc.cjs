module.exports = {
  env: {
    browser: true,
    es2021: true,

    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'comma-dangle': 'off',
  },
};
