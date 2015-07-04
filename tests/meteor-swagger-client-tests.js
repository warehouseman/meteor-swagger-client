const title = 'Swagger Client : ';

/* global Npm SwaggerClients Tinytest */

/* set up logging */
const debug = Npm.require('debug');
const errlog = debug('wm:msc:err');
const infolog = debug('wm:msc:log');
infolog.log = console.log.bind(console); // eslint-disable-line no-console


Tinytest.add(
  'Sanity check',
  function chk(test) {
    test.equal(
      true,
      true,
      'TinyTest is working.'
    );
  }
);

Tinytest.add(
  'Have my developer key :: ' + process.env.TRELLO_KEY,
  function getKey(test) {
    test.equal(
      process.env.TRELLO_KEY.length,
      32,
      'This is the REST API developer access key'
    );
  }
);

Tinytest.add(
  title + 'Have the UID of user A',
  function getUid(test) {
    test.equal(
      process.env.TRELLO_USER_A,
      'alphawarehouseman',
      'Need the user ID and an authorization token from three fictitious users'
    );
  }
);

Tinytest.add(
  title + 'Have an authentication token from user A: '
        + process.env.TRELLO_TOKEN_A,
  function getTkn(test) {
    test.equal(
      process.env.TRELLO_TOKEN_A.length,
      64,
      'Need the user ID and an authorization token fromthree fictitious users'
    );
  }
);

Tinytest.add(
  title + 'Have the UID of user B',
  function getUid(test) {
    test.equal(
      process.env.TRELLO_USER_B,
      'bravowarehouseman',
      'Need the user ID and an authorization token from three fictitious users'
    );
  }
);

Tinytest.add(
  title + 'Have an authentication token from user B: '
        + process.env.TRELLO_TOKEN_B,
  function getTkn(test) {
    test.equal(
      process.env.TRELLO_TOKEN_B.length,
      64,
      'Need the user ID and an authorization token from three fictitious users'
    );
  }
);

Tinytest.add(
  title + 'Have the UID of user C',
  function getUid(test) {
    test.equal(
      process.env.TRELLO_USER_C,
      'charliewarehouseman',
      'Need the user ID and an authorization token from three fictitious users'
    );
  }
);

Tinytest.add(
  title + 'Have an authentication token from user C: '
        + process.env.TRELLO_TOKEN_C,
  function getTkn(test) {
    test.equal(
      process.env.TRELLO_TOKEN_C.length,
      64,
      'Need the user ID and an authorization token fromthree fictitious users'
    );
  }
);


Tinytest.add(
  title + 'Have the URL of Swagger specification for site A',
  function getUrlA(test) {
    var goodURL = process.env.TRELLO_SPEC.indexOf('http://') > -1
     || process.env.TRELLO_SPEC.indexOf('https://') > -1;
    test.isTrue(
      goodURL,
      'Need a valid URL of a Swagger JSON file'
    );
  }
);

Tinytest.add(
  title + 'Have the URL of Swagger specification for site B',
  function getUrlB(test) {
    test.isTrue(
      process.env.PET_STORE_SPEC.indexOf('http://') > -1,
      'Need a valid URL of a Swagger JSON file'
    );
  }
);


Tinytest.add(
  title + 'Can add the spec for A to the collection',
  function addSpec(test) {
    var rslt = false;
    SwaggerClients.addRemoteHost(process.env.TRELLO_SPEC);
    try {
      rslt = true;
    } catch (err) {
      errlog('Could not add host\' swagger specification');
    }

    test.isTrue(
      rslt,
      'Need a swagger client object here'
    );
  }
);

Tinytest.add(
  title + 'Have an ID for client A object',
  function haveBoardId(test) {
    test.equal(
      process.env.TRELLO_A_BOARD.length,
      8,
      'Need the ID of a user\'s Welcom Board in Trello'
    );
  }
);

Tinytest.add(
  title + 'Have a client proxy for site A',
  function havePrxy(test) {
    var nameHost = 'Trello API';
    var host = SwaggerClients.getHost(nameHost);
    test.equal(
      nameHost,
      host.proxy.info.title,
      'Need a swagger client object here'
    );
  }
);

const basicArguments = {
    'key': process.env.TRELLO_KEY,
  'token': process.env.TRELLO_TOKEN_A,
};

Tinytest.add(
  title + 'Can get a "board" from Alpha\'s account',
  function getBoardForA(test) {
    var nameHost = 'Trello API';
    var host = SwaggerClients.getHost(nameHost);
    var response = null;

    basicArguments.idBoard = process.env.TRELLO_A_BOARD;

    try {
      host.proxy.board.getBoardsByIdBoard(
          basicArguments
        , { responseContentType: 'application/json' }
        , function sxs(board) {
            response = JSON.parse(board.data);
            infolog('Board is :: %j', response.name);
          }
        , function errs(error) {
            errlog(error);
            errlog('Error getting board :: %j', basicArguments.idBoard);
          }
      );
    } catch (err) {
      errlog(err);
      errlog('Above error was with an asynchronous call');
    }

    test.equal(
      process.env.TRELLO_TOKEN_A.length,
      64,
      'Need the user ID and an authorization token from three fictitious users'
    );
  }
);


Tinytest.add(
  title + 'Can get object A from user A\'s account',
  function getObj(test) {
    var nameHost = 'Trello API';
    var response = null;
    var host = SwaggerClients.getHost(nameHost);
    var board = null;
    var expected = 'Welcome Board';

    basicArguments.idBoard = process.env.TRELLO_A_BOARD;

    board = host.sync.board.getBoardsByIdBoard(
        basicArguments
      , { responseContentType: 'application/json' }
    );

    response = JSON.parse(board.data);
    infolog('Got the board :: ' + response.name);

    test.equal(response.name, expected
      , 'Expected :: ' + expected);
  }
);

Tinytest.add(
  title + 'Get an informative alert if unable to get object from the host',
  function getObj(test) {
    var nameHost = 'Trello API';
    var response = null;
    var host = SwaggerClients.getHost(nameHost);
    var board = null;
    var expected = 'invalid id';

    basicArguments.idBoard = '999';

    board = host.sync.board.getBoardsByIdBoard(
      basicArguments,
      { responseContentType: 'application/json' }
    );

    response = board.data.replace(/^\s+|\s+$/g, '');
    infolog('Message :: ' + response);

    test.equal(response, expected
      , 'Expected :: >' + expected + '< vs >' + response + '<');
  }
);

Tinytest.add(
  title + 'Can get help for site A spec',
  function getHelpA(test) {
    var nameHost = 'Trello API';
    var host = SwaggerClients.getHost(nameHost);
    var frag = 'operations for the';
    test.isTrue(host.proxy.help(true).indexOf(frag) > -1
      , 'Top level Swagger should contain "' + frag + '"');
  }
);


