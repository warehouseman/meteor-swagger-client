Package.describe({
  name: 'warehouseman:meteor-swagger-client',
  version: '0.0.1',
  summary: 'Specify the addresses of a RESTful server, and of its Swagger spec, and immediately interact with it.',
  git: 'git@github.com:warehouseman/meteor-swagger-client.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('meteor-swagger-client.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('warehouseman:meteor-swagger-client');
  api.addFiles('meteor-swagger-client-tests.js');
});
