const title = 'Swagger Client : ';

/* global Npm SwaggerClients Tinytest */

/* set up logging */
const debug = Npm.require('debug');
const errlog = debug('wm:msc:err');
const infolog = debug('wm:msc:log');
infolog.log = console.log.bind(console); // eslint-disable-line no-console

const basicArguments = {
    'key': process.env.TRELLO_KEY,
  'token': process.env.TRELLO_TOKEN_A,
};

const basicHeader = { responseContentType: 'application/json' };

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
  'Have developer key :: ' + process.env.TRELLO_KEY.substring(0, 10) + ' . . .',
  function getKey(test) {
    test.equal(
      process.env.TRELLO_KEY.length,
      32,
      'This is the REST API developer access key'
    );
  }
);

Tinytest.add(
  title + 'Have an ID for client A object',
  function haveBoardId(test) {
    test.equal(
      process.env.TRELLO_A_WELCOME_BOARD.length,
      8,
      'Need the ID of a user\'s Welcome Board in Trello'
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


//  ************************************************************* //
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
  title + 'Can add the spec for B to the collection',
  function addSpec(test) {
    var rslt = false;
    SwaggerClients.addRemoteHost(process.env.PET_STORE_SPEC);
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
//  ************************************************************* //

Tinytest.add(
  title + 'Can get help for the site B spec',
  function getHelpB(test) {
    var nameHost = 'Swagger Petstore';
    var host = SwaggerClients.getHost(nameHost);
    var frag = 'operations for the';
    var help = host.proxy.help(true);
    infolog('Board help :: %s', help);
    test.isTrue(help.indexOf(frag) > -1
      , 'Top level Swagger help should contain "' + frag + '"');
  }
);

Tinytest.add(
  title + 'Can get help for a site B entity',
  function getHelpBBoard(test) {
    var nameHost = 'Swagger Petstore';
    var host = SwaggerClients.getHost(nameHost);
    var frag = 'getPetById: Find pet by ID';
    var help = host.proxy.pet.help(true);
    infolog('Board help :: %s', help);
    test.isTrue(help.indexOf(frag) > -1
      , 'Board help should contain "' + frag + '"');
  }
);


Tinytest.add(
  title + 'Can get a  "pet" (asynchronous)',
  function getPetFromB(test) {
    var nameHost = 'Swagger Petstore';
    var host = SwaggerClients.getHost(nameHost);
    var response = null;

    basicArguments.petId = '1436382031546';

    try {
      host.proxy.pet.getPetById(
          basicArguments, basicHeader
        , function sxs(pet) {
            response = JSON.parse(pet.data);
            infolog('Pet is :: %j', response.name);
          }
        , function errs(error) {
            errlog(error);
            errlog('Error getting board :: %j', basicArguments.name);
          }
      );
    } catch (err) {
      errlog(err);
      errlog('Above error was with an asynchronous call');
    }

    delete basicArguments.petId;

    test.equal(
      process.env.TRELLO_TOKEN_A.length,
      64,
      'Need the user ID and an authorization token from three fictitious users'
    );
  }
);

Tinytest.add(
  title + 'Can add a "pet" (asynchronous)',
  function addPetToBasync(test) {
    var nameHost = 'Swagger Petstore';
    var host = SwaggerClients.getHost(nameHost);
    var response = null;

    basicArguments.body = {
      'name': 'Flamingo Tongue Snail',
      'status': 'pending',
    };

    try {
      host.proxy.pet.addPet(
          basicArguments, basicHeader
        , function sxs(pet) {
            response = JSON.parse(pet.data);
            infolog('Pet is :: %j', response.name);
          }
        , function errs(error) {
            errlog(error);
            errlog('Error getting board :: %j', basicArguments.name);
          }
      );
    } catch (err) {
      errlog(err);
      errlog('Above error was with an asynchronous call');
    }

    delete basicArguments.body;

    test.equal(
      process.env.TRELLO_TOKEN_A.length,
      64,
      'Need the user ID and an authorization token from three fictitious users'
    );
  }
);


Tinytest.add(
  title + 'Can add a "pet" (synchronous)',
  function addPetToBasync(test) {
    var nameHost = 'Swagger Petstore';
    var host = SwaggerClients.getHost(nameHost);
    var response = null;
    var expected = 'Blue Footed Booby';
    var payload = {'name': expected, 'status': 'pending'};
    var pet = null;

    basicArguments.body = payload;

    response = host.sync.pet.addPet(
      basicArguments, basicHeader
    );
    delete basicArguments.body;
    pet = JSON.parse(response.data);
    infolog('Got a pet :: ' + pet.name + ' (' + pet.id + ')');

    test.equal(pet.name, expected
      , 'Expected :: ' + expected);
  }
);


Tinytest.add(
  title + 'Can get help for site A spec',
  function getHelpA(test) {
    var nameHost = 'Trello API';
    var host = SwaggerClients.getHost(nameHost);
    var frag = 'operations for the';
    var help = host.proxy.help(true);

    test.isTrue(help.indexOf(frag) > -1
      , 'Top level Swagger help should contain "' + frag + '"');
  }
);

Tinytest.add(
  title + 'Can get help for a site A entity',
  function getHelpABoard(test) {
    var nameHost = 'Trello API';
    var host = SwaggerClients.getHost(nameHost);
    var frag = 'addBoards: addBoards()';
    var help = host.proxy.board.help(true);

    test.isTrue(help.indexOf(frag) > -1
      , 'Board help should contain "' + frag + '"');
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


Tinytest.add(
  title + 'Can list ids of user A\'s boards',
  function getObj(test) {
    var nameHost = 'Trello API';
    var response = null;
    var host = SwaggerClients.getHost(nameHost);
    var boards = null;
    var boardIds = [];
    var testName = 'Welcome Board';
    var expected = process.env.TRELLO_A_WELCOME_BOARD;
    var found = -1;
    var idx = found;

    basicArguments.idMember = 'me';
//    basicArguments.filter = 'open';

    response = host.sync.member.getMembersBoardsByIdMember(
      basicArguments, basicHeader
    );
    delete basicArguments.idMember;
//    delete basicArguments.filter;

    boards = JSON.parse(response.data);

    boards.forEach(function collectBoardIds(board) {
        boardIds.push(board.shortLink);
        infolog('Board :: ' + board.name + ' ('
                            + board.shortLink + '. Closed? '
                            + board.closed + ')');
        ++idx;
        if ( board.name === testName ) found = idx;
      }
    );
    infolog('Got the board :: ' + boardIds[found]);

    test.equal(boardIds[found], expected
      , 'Expected :: ' + expected);
  }
);

Tinytest.add(
  title + 'Can get a "board" from Alpha\'s account (asynchronous)',
  function getBoardForA(test) {
    var nameHost = 'Trello API';
    var host = SwaggerClients.getHost(nameHost);
    var response = null;

    basicArguments.idBoard = process.env.TRELLO_A_WELCOME_BOARD;

    try {
      host.proxy.board.getBoardsByIdBoard(
          basicArguments, basicHeader
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
    delete basicArguments.idBoard;

    test.equal(
      process.env.TRELLO_TOKEN_A.length,
      64,
      'Need the user ID and an authorization token from three fictitious users'
    );
  }
);


Tinytest.add(
  title + 'Will get an informative alert if request fails (synchronous)',
  function getObj(test) {
    var nameHost = 'Trello API';
    var response = null;
    var host = SwaggerClients.getHost(nameHost);
    var board = null;
    var expected = 'invalid id';

    basicArguments.idBoard = '999';

    board = host.sync.board.getBoardsByIdBoard(
      basicArguments, basicHeader
    );
    delete basicArguments.idBoard;

    response = board.data.replace(/^\s+|\s+$/g, '');
    infolog('Message :: ' + response);

    test.equal(response, expected
      , 'Expected :: >' + expected + '< vs >' + response + '<');
  }
);


Tinytest.add(
  title + 'Can get the Welcome Board from user A\'s account. (synchronous)',
  function getObj(test) {
    var nameHost = 'Trello API';
    var response = null;
    var host = SwaggerClients.getHost(nameHost);
    var board = null;
    var expected = 'Welcome Board';

    basicArguments.idBoard = process.env.TRELLO_A_WELCOME_BOARD;

    board = host.sync.board.getBoardsByIdBoard(
        basicArguments, basicHeader
    );
    delete basicArguments.idBoard;

    response = JSON.parse(board.data);
    infolog('Got the board :: ' + response.name);

    test.equal(response.name, expected
      , 'Expected :: ' + expected);
  }
);

Tinytest.add(
  title + 'Can get the lists of a board of user A\'s account. (synchronous)',
  function getObj(test) {
    var nameHost = 'Trello API';
    var response = null;
    var host = SwaggerClients.getHost(nameHost);
    var board = null;
    var expected = 'Welcome Board';

    basicArguments.idBoard = process.env.TRELLO_A_WELCOME_BOARD;

    board = host.sync.board.getBoardsByIdBoard(
        basicArguments, basicHeader
    );
    delete basicArguments.idBoard;

    response = JSON.parse(board.data);
    infolog('Got the board :: ' + response.name);

    test.equal(response.name, expected
      , 'Expected :: ' + expected);
  }
);

//  ************************************************************* //
function addOrGetTestBoardOfUser(syncHost, idMember, nameBoard) {
  var foundBoard = null;
  var response = null;

  var payload = {
    'name': nameBoard,
    'desc': 'Test board added by warehouseman:meteor-swagger-client.',
  };

  /*  Get all the member's boards  */
  basicArguments.idMember = idMember;

  response = syncHost.member.getMembersBoardsByIdMember(
    basicArguments, basicHeader
  );

  delete basicArguments.idMember;

  /*  Search the boards for the one we might have to create */
  JSON.parse(response.data).forEach(
    function searchBoardNames(board) {
      infolog('Board :: ' + board.name + ' ('
                          + board.shortLink + '. Closed? '
                          + board.closed + ')');
      if ( board.name === nameBoard ) foundBoard = board;
    }
  );

  /*  See if we have what we need  */
  if (foundBoard !== null && foundBoard.name === nameBoard) {
    /* No need to create it.  That was done already  */
    infolog('Got the board :: ' + foundBoard.name);
  } else {
    /* Seems there is no such board yet; make one. */
    infolog('Adding the board :: ' + nameBoard);

    basicArguments.body = payload;
    response = syncHost.board.addBoards(
      basicArguments, basicHeader
    );
    delete basicArguments.body;

    foundBoard = JSON.parse(response.data);

    /*  Check that we got what we asked for */
    if (foundBoard !== null && foundBoard.name === nameBoard) {
      infolog(foundBoard);
      infolog('Board :: ' + foundBoard.name + ' ('
                          + foundBoard.url + ')');
    }
  }

  return foundBoard;
}

function addOrGetTestListOfUser(syncHost, idBoard, nameList) {
  var board = null;
  var addedList = null;
  var foundList = null;
  var response = null;

  var payload = {
    'name': nameList,
    'pos': 'bottom',
  };

  /*  Get the board where we want to create the list  */
  basicArguments.idBoard = idBoard;

  response = syncHost.board.getBoardsByIdBoard(
      basicArguments, basicHeader
  );

  board = JSON.parse(response.data);
  infolog('Got the board :: ' + board.name);

  /* Quit if there is no such board. */
  if (board === null || board.name === null) {
    delete basicArguments.idBoard;
    return null;
  }

  infolog('Got the board :: ' + board.name);

  /* Get all the lists of the board. */
  response = syncHost.board.getBoardsListsByIdBoard(
    basicArguments, basicHeader
  );

  /*  Search the lists for the one we might have to create */
  JSON.parse(response.data).forEach(
    function searchBoardNames(list) {
      infolog('List :: ' + list.name + ' ('
                          + list.id + ')');
      if ( list.name === nameList ) foundList = list;
    }
  );

  if (foundList === null || foundList.name === null) {
    basicArguments.body = payload;
    response = syncHost.board.addBoardsListsByIdBoard(
      basicArguments, basicHeader
    );
    delete basicArguments.body;
    delete basicArguments.idBoard;

    infolog(response.data);
    addedList = JSON.parse(response.data);

    if (addedList !== null && addedList.name === nameList) {
      infolog(addedList);
      infolog('List :: ' + addedList.name);
    }
    foundList = addedList;
  }

  delete basicArguments.idBoard;
  return foundList;
}

function addOrGetTestCardOfUser(syncHost, idList, nameCard) {
  var list = null;
  var addedCard = null;
  var foundCard = null;
  var response = null;

  var payload = {
     'due': null,
    'name': nameCard,
    'desc': 'Test card added by warehouseman:meteor-swagger-client.',
  };

  /*  Get the list where we want to create the card  */
  basicArguments.idList = idList;

  infolog('*********** :: ');
  infolog(basicArguments);

  response = syncHost.list.getListsByIdList(
      basicArguments, basicHeader
  );


  list = JSON.parse(response.data);
  infolog('Got the list :: ' + list.name);

  /* Quit if there is no such list. */
  if (list === null || list.name === null) {
    infolog('*********** :: ');
    delete basicArguments.idList;
    return null;
  }

  infolog('Got the list :: ' + list.name);

  /* Get all the cards of the list. */
  response = syncHost.list.getListsCardsByIdList(
    basicArguments, basicHeader
  );

  /*  Search the cards for the one we might have to create */
  JSON.parse(response.data).forEach(
    function searchCardNames(card) {
      infolog('Card :: ' + card.name + ' ('
                          + card.id + ')');
      if ( card.name === nameCard ) foundCard = card;
    }
  );

  if (foundCard === null || foundCard.name === null) {
    basicArguments.body = payload;
    response = syncHost.list.addListsCardsByIdList(
      basicArguments, basicHeader
    );
    delete basicArguments.body;
    delete basicArguments.idList;

    infolog(response.data);
    addedCard = JSON.parse(response.data);

    if (addedCard !== null && addedCard.name === nameCard) {
      infolog(addedCard);
      infolog('Card :: ' + addedCard.name);
    }
    foundCard = addedCard;
  }

  delete basicArguments.idBoard;
  return foundCard;
}
//  ************************************************************* //


Tinytest.add(
  title + 'Can add a new board to user A\'s account.',
  function getObj(test) {
    var idMember = 'me';
    var nameBoard = 'Aa';
    var nameHost = 'Trello API';

    var host = SwaggerClients.getHost(nameHost);

    var board = addOrGetTestBoardOfUser(host.sync, idMember, nameBoard);

    test.equal(board.name, nameBoard
      , 'Expected :: ' + nameBoard);
  }
);

Tinytest.add(
  title + 'Can add a list to a board in user A\'s account.',
  function getObj(test) {
    var idMember = 'me';
    var nameBoard = 'Aa';
    var nameList = 'AaListAa';
    var nameHost = 'Trello API';

    var host = SwaggerClients.getHost(nameHost);

    var board = addOrGetTestBoardOfUser(host.sync, idMember, nameBoard);

    var list = addOrGetTestListOfUser(host.sync, board.id, nameList);

    test.equal(list.name, nameList
      , 'Expected :: ' + nameList);
  }
);

Tinytest.add(
  title + 'Can add a card to a list to a board in user A\'s account.',
  function getObj(test) {
    var nameHost = 'Trello API';
    var idMember = 'me';
    var nameBoard = 'Aa';
    var nameList = 'AaListAa';
    var nameCard = 'AaListAaCardAa';

    var host = SwaggerClients.getHost(nameHost);

    var board = addOrGetTestBoardOfUser(host.sync, idMember, nameBoard);

    var list = addOrGetTestListOfUser(host.sync, board.id, nameList);

    var card = addOrGetTestCardOfUser(host.sync, list.id, nameCard);

    test.equal(card.name, nameCard
      , 'Expected :: ' + nameCard);
  }
);


Tinytest.add(
  title + 'Can alter a card in user A\'s account.',
  function getObj(test) {
    var nameHost = 'Trello API';
    var idMember = 'me';
    var nameBoard = 'Aa';
    var nameList = 'AaListAa';
    var nameCard = 'AaListAaCardAa';
    var response = null;
    var alteredCard = null;
    var payload = {
       'due': new Date(),
      'desc': 'Test card altered by warehouseman:meteor-swagger-client.',
    };

    var host = SwaggerClients.getHost(nameHost);

    var board = addOrGetTestBoardOfUser(host.sync, idMember, nameBoard);

    var list = addOrGetTestListOfUser(host.sync, board.id, nameList);

    var card = addOrGetTestCardOfUser(host.sync, list.id, nameCard);

    var dueDate = new Date();
    dueDate.setTime(dueDate.getTime() + 7 * 86400000);
    dueDate = dueDate.toISOString();

    payload.due = dueDate;

    infolog('Card due :: ' + dueDate);
//    infolog('Card due :: ' + dueDate.toISOString());

    if (card !== null || card.name === nameCard) {
      basicArguments.idCard = card.id;
      basicArguments.body = payload;
      response = host.sync.card.updateCardsByIdCard(
        basicArguments, basicHeader
      );
      delete basicArguments.body;
      delete basicArguments.idCard;

      infolog(response.data);
      alteredCard = JSON.parse(response.data);

      if (alteredCard !== null && alteredCard.due === nameCard) {
        infolog(alteredCard);
        infolog('Sent :: >' + dueDate + '< due : >' + alteredCard.due + '<');
      }
    }

    test.equal(alteredCard.due, dueDate
      , 'Expected :: ' + dueDate);
  }
);

Tinytest.add(
  title + 'Can delete a card in user A\'s account.',
  function getObj(test) {
    var nameHost = 'Trello API';
    var idMember = 'me';
    var nameBoard = 'Aa';
    var nameList = 'AaListAa';
    var nameCard = 'AaListAaCardAa';
    var expected = 'DELETE : 200';
    var response = null;

    var host = SwaggerClients.getHost(nameHost);

    var board = addOrGetTestBoardOfUser(host.sync, idMember, nameBoard);

    var list = addOrGetTestListOfUser(host.sync, board.id, nameList);

    var card = addOrGetTestCardOfUser(host.sync, list.id, nameCard);

    infolog('Deleting . . . ' + basicArguments.key);
    if (card !== null || card.name === nameCard) {
      basicArguments.idCard = card.id;
      response = host.sync.card.deleteCardsByIdCard(
        basicArguments, basicHeader
      );
      delete basicArguments.idCard;

      infolog(response.method + ' : ' + response.status);
    }

    test.equal(response.method + ' : ' + response.status, expected
      , 'Expected :: ' + expected);
  }
);
