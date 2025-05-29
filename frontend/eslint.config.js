export default [
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react: require('eslint-plugin-react'),
    },
    languageOptions: {
      parser: require.resolve('@babel/eslint-parser'),
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react/jsx-uses-react': 'off', // React 17+
      'react/react-in-jsx-scope': 'off', // React 17+
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
    },
  },
]