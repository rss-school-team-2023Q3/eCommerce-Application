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
  plugins: ['react-refresh', 'prettier', '@typescript-eslint', 'import'],

  rules: {
    'react-refresh/only-export-components': ['off', { allowConstantExport: true }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, optionalDependencies: false, peerDependencies: false },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-shadow': 'off',
    'import/no-unresolved': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
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
      { blankLine: 'always', prev: ['const', 'let'], next: 'expression' },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'index', 'sibling', 'parent', 'internal'],
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
    'no-await-in-loop': 'off',
    'no-shadow': 'off',
    'no-void': 'off',
    'linebreak-style': 'off',
    'no-undef': 'warn',
    camelcase: ['error'],
    'eol-last': ['error'],
    'object-curly-spacing': ['error', 'always'],
    curly: ['error'],
    'for-direction': ['error'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'use-isnan': ['error'],
    'arrow-parens': ['error'],
    'no-else-return': ['error'],
    'valid-typeof': ['error'],
    'object-shorthand': ['error'],
    'prefer-arrow-callback': ['error'],
    'prefer-const': ['error'],
    'prefer-destructuring': ['error'],
    'prefer-template': ['error'],
    'no-empty': ['error'],
    'no-var': ['error'],
    'no-array-constructor': ['error'],
    'no-lonely-if': ['error'],
    'no-multiple-empty-lines': ['error'],
    'no-extra-boolean-cast': ['error'],
    'no-empty-pattern': ['error'],
    'no-fallthrough': ['error'],
    'no-implicit-coercion': ['error'],
    'no-return-await': ['error'],
    'no-self-assign': ['error'],
    'no-useless-catch': ['error'],
    'no-useless-escape': ['error'],
    'require-await': ['error'],
    'no-extra-semi': ['error'],
    'no-promise-executor-return': ['error'],
    'no-unreachable': ['error'],
    'no-unreachable-loop': ['error'],
    'no-unsafe-negation': ['error'],
    'no-async-promise-executor': ['error'],
    'no-dupe-args': ['error'],
    'no-dupe-keys': ['error'],
    'no-duplicate-case': ['error'],
    'no-dupe-else-if': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    'no-unused-vars': 'off',
    'no-array-constructor': 'off',
    'no-loss-of-precision': 'off',
    'no-implied-eval': 'off',
    'require-await': 'off',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-duplicate-type-constituents': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-enum-comparison': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/restrict-template-expressions': 'error',
    '@typescript-eslint/unbound-method': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^[_]+$' }],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
  },
};
