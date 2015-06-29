/*globals Tinytest */
/*
Tinytest.add(title + 'Can add the spec for B to the collection', function (test) {
  rslt = false
  try {
    SwaggerClients.addRemoteHost(process.env.PET_STORE_SPEC);
    rslt = true
  } catch (err) {}
  test.isTrue(rslt
    , "Need a swagger client object here");
});

Tinytest.add(title + 'Have a client proxy for site B', function (test) {
  var title = "Swagger Petstore";
  test.equal(title, SwaggerClients.hosts[title].info.title
    , "Need a swagger client object here");
});

Tinytest.add(title + 'Can get help for site A spec', function (test) {
  var title = "Trello API";
  var frag = "operations for the";
  test.isTrue(SwaggerClients.hosts[title].help(true).indexOf(frag) > -1
    , "Top level Swagger should contain '" + frag + "'");
});


Tinytest.add(title + 'Have a developer key', function (test) {
  test.equal(process.env.TRELLO_KEY.length, 32
    , "This is the REST API developer access key");
});

Tinytest.add(title + 'Have the UID of user A', function (test) {
  test.equal(process.env.TRELLO_USER_A,
    "alphawarehouseman",
    "Need the user ID and an authorization token from three fictitious users");
});

Tinytest.add(title + 'Have an authentication token from user A',
  function (test) {
    test.equal(process.env.TRELLO_TOKEN_A.length,
    64,
    "Need the user ID and an authorization token from three fictitious users");
});

Tinytest.add(title + 'Have the ID for object A for user A', function (test) {
  test.equal(process.env.TRELLO_A_BOARD.length, 8
    , "Need some sort of unique ID for a primary objet in a user's space.");
});

const basic_arguments = {
  'key' : process.env.TRELLO_KEY,
  'token' : process.env.TRELLO_TOKEN_A
}

Tinytest.add(title + 'Can get object A from user A\'s account',
  function (test) {
    basic_arguments["idBoard"] = process.env.TRELLO_A_BOARD;
    var title = "Trello API";
    var frag = "operations for the";
    SwaggerClients.hosts[title].board.getBoardsByIdBoard(
        basic_arguments
      , { responseContentType : 'application/json' }
      , function(board){
          data = JSON.parse(board.data);
          console.log('Board is :: ', data.name);
        }
    );
    test.equal(
      process.env.TRELLO_TOKEN_A.length,
      64,
      "Need the user ID and authorization token from three fictitious users");
  }
);
*/

/*
Tinytest.add(title + 'Have the UID of user B', function (test) {
  test.equal(process.env.TRELLO_USER_B, "bravowarehouseman"
    , "Need the user ID and an authorization token from each of three fictitious users");
});

Tinytest.add(title + 'Have an authentication token from user B', function (test) {
  test.equal(process.env.TRELLO_TOKEN_B.length, 64
    , "Need the user ID and an authorization token from each of three fictitious users");
});

Tinytest.add(title + 'Have the UID of user C', function (test) {
  test.equal(process.env.TRELLO_USER_C, "charliewarehouseman"
    , "Need the user ID and an authorization token from each of three fictitious users");
});

Tinytest.add(title + 'Have an authentication token from user C', function (test) {
  test.equal(process.env.TRELLO_TOKEN_C.length, 64
    , "Need the user ID and an authorization token from each of three fictitious users");
});

Tinytest.add(title + 'Key is available for use', function (test) {
  test.length(basic_arguments.key, 32
    , "This packages exposes a basic_arguments object that must contain a 32 character API key");
});

Tinytest.add(title + 'A token is available for use', function (test) {
  test.length(basic_arguments.token, 64
    , "This packages exposes a basic_arguments object that must contain a 64 character authorization token");
});
*/
