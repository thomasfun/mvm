module.exports = {
<<<<<<< HEAD
  "$schema": "http://json.schemastore.org/prettierrc",
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "arrowParens": "always"
};
=======
  $schema: 'http://json.schemastore.org/prettierrc',
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  overrides: [
    {
      files: '*.sol',
      options: {
        // These options are native to Prettier.
        printWidth: 100,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: true,
        // These options are specific to the Solidity Plugin
        explicitTypes: 'always',
        compiler: '0.8.9',
      },
    },
  ],
}
>>>>>>> 2c741af18943321173153180956f4bf84445a337
