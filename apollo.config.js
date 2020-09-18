// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'inspecasa-graphql-api',
      // URL to the GraphQL API
      url: 'http://localhost:5000/graphql'
    },
    // Files processed by the extension
    includes: [
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.tsx'
    ]
  }
}
