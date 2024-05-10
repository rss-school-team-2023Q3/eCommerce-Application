module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'prettier',
    'airbnb',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'prettier',
    '@typescript-eslint',
    'import',
  ],

  rules: {
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-shadow': 'off',
    'import/no-unresolved': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-duplicates': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': ['error', 'always'],
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['return', 'function', 'if', 'export', 'switch'],
      },
      { blankLine: 'always', prev: ['if', 'switch'], next: '*' },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: 'expression',
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'index',
          'sibling',
          'parent',
          'internal',
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 1,
        when: 'multiline',
      },
    ],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
    'max-len': [
      'error',
      {
        code: 90,
        ignoreComments: true,
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase', 'UPPER_CASE'],
        prefix: ['is', 'IS_', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: 'interface',
        format: ['StrictPascalCase'],
        prefix: ['I'],
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
    ],
  },
};
