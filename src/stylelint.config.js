module.exports = {
  plugins: ['stylelint-selector-bem-pattern'],
  extends: ['stylelint-config-standard'],
  rules: {
    'unit-allowed-list': null,
    'selector-max-id': 0,
    'selector-class-pattern': [
      '^[a-z][a-z0-9-]*(__[a-z0-9][a-z0-9-]*)?(--[a-z0-9][a-z0-9-]*)?$',
      { message: 'Expected BEM-style class name (block__element--modifier)' },
    ],
  },
};
