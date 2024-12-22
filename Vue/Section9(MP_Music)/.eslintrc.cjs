/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module', // Enable ECMAScript modules

  },
  rules: {
    // Customize rules as needed
    'no-console': 'warn', // Warn on console.log
    'no-unused-vars': 'warn', // Warn on unused variables
    'vue/no-unused-vars': 'warn', // Warn on unused Vue variables
    // Add other custom rules here
  },
  overrides: [
      {
          files: ['*.vue'], // Specific rules for .vue files
          rules: {
              // Place additional rules for .vue files if necessary
          },
      },
  ],

}
