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
    "plugin:@typescript-eslint/recommended"
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
    "@typescript-eslint/no-var-requires": "warn",
    "arrow-parens": ["error", "as-needed"],
    "react/function-component-definition": "off",
    "react/button-has-type": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "import/no-extraneous-dependencies": "warn",
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
