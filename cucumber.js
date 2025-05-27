module.exports = {
  ui: {
    requireModule: ['ts-node/register'],
    require: [
      'support/world.ts',
      'support/hooks.ts',
      'features/ui/step-definitions/**/*.ts'
    ],
    format: [
      '@cucumber/pretty-formatter',
      'json:reports/ui-report.json'
    ],
    paths: ['features/ui/**/*.feature'],
    publishQuiet: true
  },

  api: {
    requireModule: ['ts-node/register'],
    require: [
      'support/world.ts',
      'support/hooks.ts',
      'features/api/step-definitions/**/*.ts'
    ],
    format: [
      '@cucumber/pretty-formatter',
      'json:reports/api-report.json'
    ],
    paths: ['features/api/**/*.feature'],
    publishQuiet: true
  }
};