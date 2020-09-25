// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'inspecasa-graphql-api',
      // URL to the GraphQL API
      url: 'https://localhost:5000'
    },
    // Files processed by the extension
    includes: [
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.tsx'
    ]
  }
}
