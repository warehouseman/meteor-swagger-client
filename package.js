/*global Package Npm*/
Package.describe({
  name: 'warehouseman:meteor-swagger-client',
  version: '0.0.1',
  summary: 'Specify the addresses of one or more RESTful servers, and of'
        + ' their Swagger specs, and interact with them immediately.',
  git: 'git@github.com:warehouseman/meteor-swagger-client.git',
  documentation: 'README.md',
});

Package.onUse(function onUse(api) {
  api.use('meteor-platform', ['server']);
  api.use('http', ['server']);
//  api.use('meteorhacks:async', ['server']);
  api.versionsFrom('1.1.0.2');

  api.addFiles('meteor-swagger-client.js', ['server']);
  api.export('SwaggerClients', ['server']);
});

Package.onTest(function onTest(api) {
  api.use('tinytest');
  api.use('warehouseman:meteor-swagger-client');
  api.addFiles('tests/meteor-swagger-client-tests.js', ['server']);
});


Npm.depends({
  'swagger-client': '2.1.1',
  'debug': '2.2.0',
});
