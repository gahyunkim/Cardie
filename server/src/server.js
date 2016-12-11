// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();


// Support receiving text in HTTP request bodies
var bodyParser = require('body-parser');

var database = require('./database');
var validate = require('express-jsonschema').validate;
var ItemSchema = require('./schemas/item.json');

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/Cardie';

var ResetDatabase = require('./resetdatabase');

MongoClient.connect(url, function(err, db) {
  // Put everything that uses `app` into this callback function.
  // from app.use(bodyParser.text());
  // all the way to
  // app.listen(3000, ...
  // Also put all of the helper functions that use mock database
  // methods like readDocument, writeDocument, ...
  var readDocument = database.readDocument;
  var writeDocument = database.writeDocument;
  var addDocument = database.addDocument;
  var getCollection = database.getCollection;
  var deleteDocument = database.deleteDocument;

  app.use('/mongo_express', mongo_express(mongo_express_config));

  app.use(express.static('../client/build'));
  app.use(bodyParser.text());
  // Support receiving JSON in HTTP request bodies
  app.use(bodyParser.json());
  /*
  * resolve user object
  * only needed for dislike and like item
  */

  /**
  * Get the user ID from a token. Returns -1 (an invalid ID)
  * if it fails.
  */
  function sendDatabaseError(res, err){
    res.status(500).send("A database error occurred: " + err);
  }

  function resolveUserObjects(userList, callback) {
     if (userList.length === 0) {
       callback(null, {});
     } else {
       var query = {
         $or: userList.map((id) => { return {_id: id } })
       };
       db.collection('users').find(query).toArray(function(err, users) {
         if (err) {
           return callback(err);
         }
         var userMap = {};
         users.forEach((user) => {
           userMap[user._id] = user;
         });
         callback(null, userMap);
       });
     }
   }
  /**
  * Get the user ID from a token. Returns -1 (an invalid ID)
  * if it fails.
  */
  function getUserIdFromToken(authorizationLine) {
    try {
      // Cut off "Bearer " from the header value.
      var token = authorizationLine.slice(7);
      // Convert the base64 string to a UTF-8 string.
      var regularString = new Buffer(token, 'base64').toString('utf8');
      // Convert the UTF-8 string into a JavaScript object.
      var tokenObj = JSON.parse(regularString);
      var id = tokenObj['id'];
      // Check that id is a number.
      if (typeof id === 'string') {
        return id;
      }
      else {
        // Not a number. Return -1, an invalid ID.
        return -1;
      }
    } catch (e) {
      // Return an invalid ID.
      return -1;
    }
  }

  /**
  * Get the feed data for a particular user.
  */
  function getFeedData(user, callback) {
    db.collection('feeds').findOne({
      _id: user
    }, function(err, feedData) {
      if (err) {
        return callback(err);
      } else if (feedData === null) {
        // Feed not found.
        return callback(null, null);
      }
      var resolvedContents = [];

      function processNextFeedItem(i) {
        getItem(feedData.items[i], function(err, feedItem) {
          if (err) {
            callback(err);
          } else {
            resolvedContents.push(feedItem);
            if (resolvedContents.length === feedData.items.length) {
              feedData.items = resolvedContents;
              callback(null, feedData);
            } else {
              processNextFeedItem(i + 1);
            }
          }
        });
      }
      if (feedData.items.length === 0) {
        callback(null, feedData);
      } else {
        processNextFeedItem(0);
      }
    });
  }

  app.get('/user/:userid/feed', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userid = req.params.userid;
    if (fromUser === userid) {
      getFeedData(new ObjectID(userid), function(err, feedData) {
        if (err) {
          res.status(500).send("Database error: " + err);
        } else if (feedData === null) {
          res.status(400).send("Could not look up feed for user " + userid);
        } else {
          res.send(feedData);
        }
      });
    } else {
      res.status(401).end();
    }
  });

  /**
  * Get the categories for a particular user.
  */
  function getCategories(user, callback) {
    db.collection('feeds').findOne({
      _id: user
    }, function(err, feedData) {
      if (err) {
        return callback(err);
      } else if (feedData === null) {
        // Feed not found.
        return callback(null, null);
      }
      var resolvedContents = [];
      function processNextCategory(i) {
        getCategorySync(feedData.categories[i], function(err, category) {
          if (err) {
            callback(err);
          } else {
            resolvedContents.push(category);
            if (resolvedContents.length === feedData.categories.length) {
              feedData.categories = resolvedContents;
              callback(null, feedData);
            } else {
              processNextCategory(i + 1);
            }
          }
        });
      }
      if (feedData.categories.length === 0) {
        callback(null, feedData);
      } else {
        processNextCategory(0);
      }
    });
  }
  function getCategorySync(categoryId, callback){
    db.collection('categories').findOne({
      _id: categoryId
    }, function(err, catagory) {
      if (err) {
        return callback(err);
      } else if (catagory === null) {
        // Feed not found.
        return callback(null, null);
      }
      var resolvedContents = [];
      function processNextFeedItem(i) {
        getItem(catagory.items[i], function(err, feedItem) {
          if (err) {
            callback(err);
          } else {
            resolvedContents.push(feedItem);
            if (resolvedContents.length === catagory.items.length) {
              catagory.items = resolvedContents;
              callback(null, catagory);
            } else {
              processNextFeedItem(i + 1);
            }
          }
        });
      }
      if (catagory.items.length === 0) {
        callback(null, catagory);
      } else {
        processNextFeedItem(0);
      }
    });
  }
  app.get('/users/:userid/feeds/categories', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === userid) {
      getCategories(new ObjectID(userid), function(err, categories) {
        if (err) {
          res.status(500).send("Database error: " + err);
        } else if (categories === null) {
          res.status(400).send("Could not look up category for user " + userid);
        } else {
          res.send(categories);
        }
      });
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });


  /**
  * Resolves a feed item. Internal to the server, since it's synchronous.
  */
  function getItem(itemId, callback) {
    db.collection('items').findOne({
      _id: itemId
    }, function(err, item) {
      if (err) {
        return callback(err);
      }
      else if (item === null) {
        return callback(null, null);
      }
      callback(null, item);
    });
  }
  app.get('/items/:itemid', function(req, res) {
    var itemid = new ObjectID(req.params.itemid);
    getItem(itemid, function(err, item) {
      if (err) {
        res.status(500).send("Database error: " + err);
      } else if (item === null) {
        res.status(400).send("Could not look up item " + req.params.itemid);
      } else {
        res.send(item);
      }
    });
  });

  /**
   * Adds a new status update to the database.
   * @param user ObjectID of the user.
   */
  function postItem(contents, name, category, description, userid, callback) {
    // The new status update. The database will assign the ID for us.
    var newItem = {
      "likeCounter": [],
      "dislikeCounter": [],
      "vendorID": userid,
      "contents": contents,
      "name": name,
      "category": category,
      "description": description
    }

    // Add the status update to the database.
    db.collection('items').insertOne(newItem, function(err, result) {
      if (err) {
        return callback(err);
      }
      // Unlike the mock database, MongoDB does not return the newly added object
      // with the _id set.
      // Attach the new feed item's ID to the newStatusUpdate object. We will
      // return this object to the client when we are done.
      // (When performing an insert operation, result.insertedId contains the new
      // document's ID.)
      newItem._id = result.insertedId;

      // Retrieve the author's user object.
      db.collection('users').findOne({ _id: userid }, function(err, userObject) {
        if (err) {
          return callback(err);
        }

      db.collection('users').updateOne({_id: new ObjectID(userid)}, {
        $push: {
          "productManager.items": new ObjectID(newItem._id)
        }
      });
      db.collection('feeds').updateMany({_id: { $ne: new ObjectID(userid)}}, {
        $push: {
          items: {
            $each: [new ObjectID(newItem._id)]
          }
        },
        function(err){
          if(err){
            return callback(err);
          }
          callback(null, newItem);
        }
      });
      db.collection('categories').updateOne({_id: newItem.category}, {
        $push: {
          items: new ObjectID(newItem._id)
        }
      });
      });
    });
  }

  app.post('/upload/:userid', function(req, res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userid = req.params.userid;
    if (fromUser === userid) {
      postItem(req.body.contents, req.body.name, req.body.category, req.body.description, userid, function(err, newUpdate) {
      if (err) {
        // A database error happened.
        // 500: Internal error.
        res.status(500).send("A database error occurred: " + err);
      } else {
        // When POST creates a new resource, we should tell the client about it
        // in the 'Location' header and use status code 201.
        res.status(201);
        res.set('Location', '/feeditem/' + newUpdate._id);
          // Send the update!
        res.send(newUpdate);
      }
    });
      /*
      var feeds = getCollection('feeds');
      var feedKeys = Object.keys(feeds);
      var newItem = {
        "likeCounter": [],
        "dislikeCounter": [],
        "vendorID": userid,
        "contents": req.body.contents,
        "name": req.body.name,
        "category": req.body.category,
        "description": req.body.description
      }
      newItem = addDocument('items', newItem);
      var feed;
      feedKeys.forEach((key) => {
        if( key !== userid ){
          feed = readDocument('feeds', key);
          feed.items.push(newItem._id);
          writeDocument('feeds', feed);
        }
      });
      var vendor = readDocument('users', userid);
      vendor.productManager.items.push(newItem._id);
      writeDocument('users', vendor);
      res.send();
    */} else {
      res.status(401).end();
    }

  });



  // Like an item.
  app.put('/users/:userid/feeds/items/:itemid/like', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var itemId = new ObjectID(req.params.itemid, 10);
    var userId = req.params.userid;
    if (fromUser === userId) {
      // First, we can update the like counter.
      db.collection('items').updateOne({ _id: itemId },
        {
          $addToSet: {
            likeCounter: new ObjectID(userId)
          }
        }, function(err) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          db.collection('items').findOne({ _id: itemId }, function(err, item) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            resolveUserObjects(item.likeCounter, function(err, userMap) {
              if (err) {
                return sendDatabaseError(res, err);
              }
              item.likeCounter.map((userId) => userMap[userId]);
            });
          }
        );
      });
      db.collection('feeds').updateOne({_id: new ObjectID(userId)},
        {
          $pull: { items: itemId }
        }, function(err) {
            if (err){
              return sendDatabaseError(res,err);
            }
      });
      res.send();
    } else {
      res.status(401).end();
    }
  });


  // disike an item.
  app.put('/users/:userid/feeds/items/:itemid/dislike', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var itemId = new ObjectID(req.params.itemid, 10);
    var userId = req.params.userid;
    if (fromUser === userId) {
      // First, we can update the like counter.
      db.collection('items').updateOne({ _id: itemId },
        {
          $addToSet: {
            dislikeCounter: new ObjectID(userId)
          }
        }, function(err) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          db.collection('items').findOne({ _id: itemId }, function(err, item) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            resolveUserObjects(item.dislikeCounter, function(err, userMap) {
              if (err) {
                return sendDatabaseError(res, err);
              }
              item.dislikeCounter.map((userId) => userMap[userId]);
            });
          }
        );
      });
      db.collection('feeds').updateOne({_id: new ObjectID(userId)},
        {
          $pull: { items: itemId }
        }, function(err) {
            if (err){
              return sendDatabaseError(res,err);
            }
      });
      res.send();
    } else {
      res.status(401).end();
    }
  });
function getProductManager(user, cb){
  db.collection('users').findOne({
    _id: user
  }, function(err, userData) {
    if (err) {
      return cb(err);
    } else if (userData === null) {
      // User not found.
      return cb(null, null);
    }
    var productManager = userData.productManager
    var resolvedContents = [];
    function processNextItem(i) {
      // Asynchronously resolve a feed item.
      getItem(productManager.items[i], function(err, item) {
        if (err) {
          // Pass an error to the callback.
          cb(err);
        } else {
          // Success!
          resolvedContents.push(item);
          if (resolvedContents.length === productManager.items.length) {
            // I am the final feed item; all others are resolved.
            // Pass the resolved feed document back to the callback.
            productManager.items = resolvedContents;
            cb(null, productManager);
          } else {
            // Process the next feed item.
            processNextItem(i + 1);
          }
        }
      });
    }
    if (productManager.items.length === 0) {
      cb(null, productManager);
    } else {
      processNextItem(0);
    }
  });
}

app.get('/user/:userid/pm', function(req, res) {
  // var fromUser = getUserIdFromToken(req.get('Authorization'));
  // var userId = parseInt(req.params.userid, 10);
  // if(fromUser === userId){
  //   var productManager = readDocument('users', userId).productManager;
  //   productManager.items = productManager.items.map((item) => getItem(item));
  //   res.send(productManager);
  // } else {
  //   res.status(401).end();
  // }
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = req.params.userid;
  if(fromUser === userId){
    getProductManager(new ObjectID(userId), function(err, pm) {
      if (err) {
        // A database error happened.
        // Internal Error: 500.
        res.status(500).send("Database error: " + err);
      } else if (pm === null) {
        // Couldn't find the feed in the database.
        res.status(400).send("Could not look up product manager for user " + userId);
      } else {
        // Send data.
        res.send(pm);
      }
    });
  } else {
    res.status(403).end();
  }
});

app.delete('/user/:userid/pm/item/:itemid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var itemId = new ObjectID(req.params.itemid);
  var userId = req.params.userid;
  if(userId === fromUser){
    db.collection('items').findOne({
      _id: itemId,
      vendorID: new ObjectID(fromUser)
    }, function(err, itemData) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (itemData === null){
        return res.status(400).end();
      }
      db.collection('feeds').updateMany({}, {
        $pull: {
          items: itemId
        }
      }, function(err) {
        if(err) {
          return sendDatabaseError(res, err);
        }
      });
    });

    db.collection('users').updateOne({_id: new ObjectID(userId)}, {
      $pull: {
        "productManager.items": itemId
      }
    }, function(err) {
      if(err) {
        return sendDatabaseError(res, err);
      }
    });
    db.collection('items').deleteOne({
      _id: itemId
    }, function(err) {
      if (err) {
        return sendDatabaseError(res,err);
      }
    });

    res.send();
  } else {
    res.status(401).end();
  }
});

// function sendMessage(sender, recipient, contents) {
//   var senderData = readDocument('users', sender);
//   var recipientData = readDocument('users', recipient);
//   var senderMessages = readDocument('messages', senderData.messages);
//   var recipientMessages = readDocument('messages', recipientData.messages);
//
//   var date = new Date().getTime();
//   var newMessage = {
//     "type" : "message",
//     "contents" : {
//       "sender" : sender,
//       "recipient" : recipient,
//       "date" : date,
//       "contents" : contents
//     }
//   }
//   senderMessages.push(newMessage);
//   recipientMessages.push(newMessage);
//   senderMessages.writeDocument('messages', newMessage);
//   recipientMessages.writeDocument('messages', newMessage);
//   return newMessage;
// }

function sendMessage(sender, recipient, callback) {
  return null;
}

// HTTP request to send message to database
app.post( '/user/:userid/messages', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userid = req.params.userid;
  if (fromUser === userid) {
    var recipientid = req.body.recipient;
    var newMessage = {
      "sender" : userid,
      "recipient" : recipientid,
      "date" : new Date().getTime(),
      "contents" : req.body.contents
    }
    // newMessage = addDocument('messages', newMessage);

    // var sender = readDocument('users', userid);
    // var recipient = readDocument('users', recipientid);
    // sender.messages.push(newMessage._id);
    // recipient.messages.push(newMessage._id);
    // writeDocument('users', sender);
    // writeDocument('users', recipient);
  } else {
    res.status(401).end();
  }
});


// Get message
function getMessage(messageid, callback) {
  db.collection('messages').findOne({ _id: messageid },
    function(err, message) {
      if (err) {
        callback(err);
      } else if (message === null) {
        callback(null, null);
      }
        db.collection('users').findOne({ _id: message.sender },
          function(err, userData) {
            if (err) {
              return callback(err);
            } else if (userData === null) {
              return callback(null, null);
            }
            message.sender = userData;
        });
        db.collection('users').findOne({ _id: message.recipient },
          function(err, userData) {
            if (err) {
              return callback(err);
            } else if (userData === null) {
              return callback(null, null);
            }
            console.log(userData);
            message.recipient = userData;
        });
        callback(null, message);
      }
  );
}

function getMessages(userId, callback) {
  db.collection('users').findOne({ _id: userId },
    function(err, userData) {
      if (err) {
        return callback(err);
      } else if (userData === null) {
        return callback(null, null);
      }
      var messageData = userData.messages;
      var messages = [];
      function processNextMessage(i) {
        getMessage(messageData.messages[i], function(err, message) {
          if (err) {
            return callback(err);
          } else {
            messages.push(message);
            if (messages.length === messageData.messages.length) {
              messageData.messages = messages;
              callback(null, messageData);
            } else {
              processNextMessage(i + 1);
            }
          }
        });
      }
      messages.forEach((message) => console.log(message.recipient));
      if (messageData.messages.length === 0) {
        callback(null, messageData);
      } else {
        processNextMessage(0);
      }
    }
  );
}

// HTTP request for messages from database
app.get('/user/:userid/messages', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = req.params.userid;
  if(fromUser === userId){
    // var messages = readDocument('users', userId).messages;
    getMessages(new ObjectID(userId), function(err, messageData) {
      if (err) {
        res.status(500).send("Database error: " + err);
      } else if (messageData === null) {
        res.status(400).send("Could not look up messages for user " + userId);
      } else {
        res.send(messageData);
      }
    });
  } else {
    res.status(403).end();
  }
});



function getUserProfile(user, callback) {
  db.collection('users').findOne({
    _id: user
  }, function(err, userData) {
    if (err) {
      return callback(err);
    } else if (userData === null) {
      //User not found
      return callback(null, null);
    } else {
      return callback(null, userData);
    }
  });
}


app.get('/profile/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(fromUser === userid){
    // Convert userid into an ObjectID before passing it to database queries.
    getUserProfile(new ObjectID(userid), function(err, userData) {
      if (err) {
        // A database error happened.
        // Internal Error: 500.
        res.status(500).send("Database error: " + err);
      } else if (userData === null) {
        // Couldn't find the user profile data in the database.
        res.status(400).send("Could not look up profile data for user " + userid);
      } else {
        // Send data
        res.send(userData);
      }
    })
  } else {
    // 403: Unauthorized request.
    res.status(403).end();
  }
});

/**
* Translate JSON Schema Validation failures into error 400s.
*/
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err);
  }
});
// Reset the database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  ResetDatabase(db, function() {
    res.send();
  });
});


// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
});
// The file ends here. Nothing should be after this.
