// "use strict";

/**
 * @license
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Warehouseman
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
*/

/**
 * @module meteor-swagger-client
 * @license MIT
 * @requires swagger-client
 */

/*global Npm Meteor SwaggerClients:true*/

/**
 * @exports meteor-swagger-client.SwaggerClients
 * @external swagger-client
 * @see {@link https://github.com/swagger-api/swagger-js|Swagger JS library}
 */
const Swagger = Npm.require('swagger-client');

/* set up logging */
const debug = Npm.require('debug');
const errlog = debug('wm:msc:err');
const infolog = debug('wm:msc:log');
infolog.log = console.log.bind(console); // eslint-disable-line no-console

/**
 * @desc 'getSwaggerProxy' wraps the asynchronous Swagger constructor such
 * that a Swagger proxy is returned to the caller.  This method is used by
 * SwaggerClients.addRemoteHost(), and is not meant to be called directly.
 * If it is, its methods will have to be used in asynchronous fashion.
 *
 * @function getSwaggerProxy
 * @private
 * @returns {Swagger}
 */
const getSwaggerProxy = Meteor.wrapAsync(
  function wrpr(swaggerSpecURL, callback) {
    var prxySwagger = new Swagger({
      url: swaggerSpecURL,
      success: function suxs() {
        callback(null, prxySwagger);
      },
      error: function errs() {
        callback(null, prxySwagger);
      },
    });
  }
);

/**
 * @desc
 * The SwaggerClients class.
 * This is an <b>exported</b> global data structure able to hold proxies of
 * numerous remote REST API hosts.  The original asynchronous methods generated
 * by the NodeJS module 'swagger-client' are available as is, but also available
 * wrapped as synchronous methods using Meteor.wrapAsync().
 *
 * API documentation can be accessed at anytime through
 * {@link http://petstore.swagger.io/|the Swagger demo viewer}
 *
 * @see {@link https://github.com/swagger-api/swagger-js|Swagger JS library}
 * @example
 * // instantiate a host instance.
 * const swaggerSpecURL = "http://petstore.swagger.io/v2/swagger.json";
 * SwaggerClients.addRemoteHost(swaggerSpecURL);
 * const host = SwaggerClients.getHost("Swagger Petstore");
 * @example
 * // Get data from a remote host with an asynchronous call
 * host.proxy.pet.getPetById(args, hdrs, function(resp){ | do work | });
 * @example
 * // Get data from a remote host with a synchronous call
 * pet = host.sync.pet.getPetById(args, hdrs);
 * @namespace
 */
SwaggerClients = {
  /**
   * @desc
   * 'hosts' is a map of available Swagger API proxies.  It is not intended
   * to be accessed directly.  Use getHost(title) and then access the "proxy"
   * namesppace of the return object.
   * @private
   * @inner
   */
  hosts: {},
  /**
   * Using a Swagger specification obtained remotely, instantiate and store
   * a Swagger API proxy for future use.
   * @param {url} swaggerSpecURL URL of a remote JSON formatted Swagger
   * specification.
   * @param {string} [name=null] An identifier to use to get the host proxy
   * later. If none is provided then the Swagger specification element
   * "info.title" will be taken from within the retrieved JSON file.
   * @function
   * @returns {void}
   * @see {@link getHost}
   * @public
   * @inner
   */
  addRemoteHost: function addRemoteHost(swaggerSpecURL, name) {
    /** 'self' is set to the SwaggerClients namespace.
     * @type {namespace}
     */
    var self = SwaggerClients;
    /**
     * @description 'proxy' is the dynamically generated client-side
     * functionality of a remote REST API.
     * @type {namespace}
     */
    var proxy = getSwaggerProxy(swaggerSpecURL);
    /**
     * @description 'nameHost' is an identifier to use to get the host proxy
     * later. If none is provided then the Swagger specification element
     * "info.title" will be taken from within the retrieved JSON file.
     * @type {string}
     */
    var nameHost = name || proxy.info.title;
    self.hosts[nameHost] = { proxy: proxy, sync: {} };
    try {
      attachSyncMethods(self.hosts[nameHost]);
    } catch (err) {
      debug('Error adding host: %j', nameHost);
      debug(err);
    }
  },
  /**
   * Get a previously stored API proxy
   * @param {string} title An identifier of a previously stored host proxy.
   * @function
   * @returns {Swagger}
   * @see {@link SwaggerClients.addRemoteHost}
   * @public
   * @inner
   */
  getHost: function getHost(title) {
    return SwaggerClients.hosts[title];
  },
};

/**
 * @description This function encapsulates the artifacts Meteor.wrapAsync will
 * wrap.  With "entity" as the source, it adds an entity and synchronous
 * wrapped method to "synchronousEntities" according to the passed in names
 * "nameEntity" and "nameMethod".
 * @param  {namespace} synchronousEntities The "sync" data structure into
 * which the wrapped entity methods will be recorded.
 * @param  {string} nameEntity The name of the entity with a method to be
 * wrapped
 * @param  {string} nameMethod    The name of the method to be wrapped
 * @param  {namespace} entity A Swagger proxy of a single entity with its
 * asynchronous methods
 * @return {void}
 * @private
 */
function wrapIt( synchronousEntities, nameEntity, nameMethod, entity ) {
  const msg = 'synchronous access to remote entity method, "%s.%s()".';
  const msgGood = 'Successful ' + msg;
  const msgBad = 'Unsuccessful ' + msg;
  synchronousEntities[nameEntity][nameMethod] = Meteor.wrapAsync(
      function wrpr(args, headers, callback) {
//      function (args, headers, success) {
        entity[nameMethod](
            args
          , headers
          , function suxs( theResult ) {
              infolog(msgGood, nameEntity, nameMethod);
              callback(null, theResult);
            }
          , function errs( theError ) {
              errlog(msgBad, nameEntity, nameMethod);
              callback(null, theError);
            }
        );
      }
  );
}

/**
 * @description This object understands how to find and wrap asynchronous
 * methods for synchronous use.  Entities and their methods are marshalled into
 * the "sync" data structure in the same layout as in the "proxy" layout in
 * which the unwrapped functions are found.
 *
 * @type {Object}
 * @private
 * @namespace
 */
const apiComprehension = {
  /**
   * @description
   * 'sync' is a map of synchronous methods on entities of Swagger generated
   * API proxies.  It is not intended to be accessed directly.  Use
   * getHost(title) and the access the sync namespace of the return proxy
   * instead.
   * @private
   * @inner
   */
  sync: {},
  /**
   * @description
   * Called by attachSyncMethods(host), this is the callback function on the
   * forEach of the proxy entities.  In its turn sets up forEach iteration of
   * each of the methods on the passed in entity.
   * @param  {namespace} entity A Swagger generated entity
   * @return {void}
   * @this apiComprehension
   * @function
   */
  getEntitiesAndTheirMethods: function getEntitiesAndTheirMethods(entity) {
    var self = apiComprehension;
//      console.log(entity.name);
    var pkg = {
      map: self.sync,
      entity: self.proxy[entity.name],
    };
    self.sync[entity.name] = {};
    self.proxy[entity.name].name = entity.name;
    entity.operationsArray.forEach(self.wrapOperation, pkg);
  },
  /**
   * @description
   * Called by getEntitiesAndTheirMethods(entity), this is the callback
   * function on the forEach of the entity's methods. It sets up the variable
   * scope for calling wrapIt().
   * @param  {namespace} operation A single method on a proxy's entity.
   * @return {void}
   * @this getEntitiesAndTheirMethods.pkg
   * @function
   */
  wrapOperation: function wrapOperation(operation) {
    wrapIt(this.map, this.entity.name, operation.nickname, this.entity);
  },
};

/**
 * @summary attachSyncMethods
 * @description  Iterates through all the API entities of the provided host
 * proxy attaching a sync method for each async method.
 * @param  {swagger} host A remote host proxy generated by swagger-client.
 * @return {void}
 * @private
 */
function attachSyncMethods(host) {
  apiComprehension.proxy = host.proxy;
  host.proxy.apisArray.forEach(
      apiComprehension.getEntitiesAndTheirMethods
    , apiComprehension
  );
  host.sync = apiComprehension.sync;
}
