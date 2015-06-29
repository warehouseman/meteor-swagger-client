# warehouseman:meteor-swagger-client  [![Build Status](https://travis-ci.org/warehouseman/meteor-swagger-client.svg?branch=master)](https://travis-ci.org/warehouseman/meteor-swagger-client)

Specify the addresses of a RESTful server, and of its Swagger spec, and then immediately interact with it.

Swagger is a powerful tool for creating REST APIs.  With a comprehensive JSON specification both client and server interfaces can be generated automatically.

This Meteor package encapsulates the NodeJs module "swagger-client" adding a synchronous version of every asynchronous API method.

### Further information:

 - [Typical Swagger API documentation](http://petstore.swagger.io/)
 - [The underlying JSON file](http://codebeautify.org/jsonviewer/ec183d)
 - [The NodeJS module `swagger-client` on GitHub](https://github.com/swagger-api/swagger-js)

### jsDoc generated documentation:

 - [documentation.md](./documentation.md)

## Getting started evaluating prior to use:

### Environment variables (eg; in .bashrc) required to run Tinytests
 
    * `export MONGO_URL="mongodb://?:?@ds?.mongolab.com:?/meteor-node-trello"`
    * `export TRELLO_SPEC="http://192.168.122.169:8000/TrelloAPI.json"`
    * `export TRELLO_SPEC="https://raw.githubusercontent.com/warehouseman/trello-swagger-generator/master/TrelloAPI.json"`
    * `export TRELLO_A_BOARD="KEEnUvSY"`
    * `export PET_STORE_SPEC="http://petstore.swagger.io/v2/swagger.json"`
    * `export TRELLO_KEY="dc7bb1d947  ???  d0a71245c7"`
    * `export TRELLO_USER_A="alphawarehouseman"`
    * `export TRELLO_TOKEN_A="fcbb1c7cf9d33ae54   ???   239e7def3c6eb0d5b53dfbd"`
    * `export TRELLO_USER_B="bravowarehouseman"`
    * `export TRELLO_TOKEN_B="2b64529be4a2a67d4   ???   b3f5a668826a3be52defaca"`
    * `export TRELLO_USER_C="charliewarehouseman"`
    * `export TRELLO_TOKEN_C="3c183da0e7719301b   ???   07b504459c68b07e675ad9a"`

### The command line to run the tests :

#### Minimal

    meteor test-packages ../meteor-swagger-client

#### With logging errors only

    env DEBUG=wm:msc:err meteor test-packages ./packages/meteor-swagger-client

#### With logging all

    env DEBUG=wm:msc:* meteor test-packages ./packages/meteor-swagger-client

#### With logging all and node-inspector

    env NODE_OPTIONS='--debug' DEBUG=wm:msc:* meteor test-packages ../meteor-swagger-client

### The command line to verify coding standards

    eslint package.js 
    eslint meteor-swagger-client.js 
    eslint tests/meteor-swagger-client-tests.js

### The command line to generate HTML documentation

    jsdoc ./*.js -p -d ./jsdoc  --readme ./README.md

