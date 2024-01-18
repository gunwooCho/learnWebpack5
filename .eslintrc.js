module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended"
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'webpack.config.js',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "react/function-component-definition": "off",
    "arrow-parens": ["error", "as-needed"],
    "react/button-has-type": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }]
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {}
    }
  }
};
