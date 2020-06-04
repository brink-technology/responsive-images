const objectPattern = {
  minProperties: 2,
  multiline: true,
  consistent: true,
};

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
  ],
  rules: {
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: objectPattern,
        ImportDeclaration: objectPattern,
        ExportDeclaration: 'always',
      },
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
      }
    ]
  },
};
