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
  function getCategories(user) {
    var userData = readDocument('users', user);
    var feedData = readDocument('feeds', userData.feed);
    // While map takes a callback, it is synchronous, not asynchronous.
    // It calls the callback immediately.
    feedData.categories = feedData.categories.map((catagory) => getCategorySync(catagory));
    // Return FeedData with resolved references.
    return feedData;
  }
  function getCategorySync(cId){
    var category = readDocument('categories', cId);
    category.items = category.items.map((item) => getItem(item));
    return category;
  }
  app.get('/users/:userid/feeds/categories', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var useridNumber = parseInt(userid, 10);

    if (fromUser === useridNumber) {
      // Send response.
      var feedData = getCategories(userid);
      res.send(feedData);
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

  app.post('/upload/:userid', function(req, res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userid = parseInt(req.params.userid, 10);
    if (fromUser === userid) {
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
    } else {
      res.status(401).end();
    }

/*    // Adds the item to the database.
  db.collection('feedItems').insertOne(newItem, function(err, result) {
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
    db.collection('users').findOne({ _id: user }, function(err, userObject) {
      if (err) {
        return callback(err);
      }
      // Update the author's feed with the new status update's ID.
      db.collection('feeds').updateOne({ _id: userObject.feed },
        {
          $push: {
            contents: {
              $each: [newItem._id],
              $position: 0
            }
          }
        },
        function(err) {
          if (err) {
            return callback(err);
          }
          // Return the new status update to the application.
          callback(null, newItem);
        }
      );
    });
  }); */
  });


  // Like an item.
  app.put('/users/:userid/feeds/items/:itemid/like', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var itemId = parseInt(req.params.itemid, 10);
    var userId = parseInt(req.params.userid, 10);
    if (fromUser === userId) {
      var item = readDocument('items', itemId);
      var feed = readDocument('feeds', userId);
      if (item.likeCounter.indexOf(userId) === -1) {
        item.likeCounter.push(userId);
        var itemIdx = feed.items.indexOf(itemId);
        feed.items.splice(itemIdx, 1);
        writeDocument('feeds', feed);
        writeDocument('items', item);
      }
      // Return a resolved version of the likeCounter
      res.send();
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  // disike an item.
  app.put('/users/:userid/feeds/items/:itemid/dislike', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var itemId = parseInt(req.params.itemid, 10);
    var userId = parseInt(req.params.userid, 10);
    if (fromUser === userId) {
      var item = readDocument('items', itemId);
      var feed = readDocument('feeds', userId);
      if (item.dislikeCounter.indexOf(userId) === -1) {
        item.dislikeCounter.push(userId);
        var itemIdx = feed.items.indexOf(itemId);
        feed.items.splice(itemIdx, 1);
        writeDocument('feeds', feed);
        writeDocument('items', item);
      }
      // Return a resolved version of the likeCounter
      res.send();
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });
  app.get('/user/:userid/pm', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = parseInt(req.params.userid, 10);
    if(fromUser === userId){
      var productManager = readDocument('users', userId).productManager;
      productManager.items = productManager.items.map((item) => getItem(item));
      res.send(productManager);
    } else {
      res.status(401).end();
    }
  });

  app.delete('/user/:userid/pm/item/:itemid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var itemId = parseInt(req.params.itemid, 10);
    var feeds = getCollection('feeds');
    var feedKeys = Object.keys(feeds);
    var userId = parseInt(req.params.userid, 10);
    var user = readDocument('users', userId);
    var feed, itemIdx;
    if( fromUser === userId){

      feedKeys.forEach((key) => {
        feed = readDocument('feeds', key);
        itemIdx = feed.items.indexOf(itemId);
        if(itemIdx !== -1){
          feed.items.splice(itemIdx, 1);
          database.writeDocument('feeds', feed);
        }
      });
      itemIdx = user.productManager.items.indexOf(itemId);
      user.productManager.items.splice(itemIdx, 1);
      writeDocument('users', user);
      deleteDocument('items', itemId);
      res.send();
    } else {
      res.status(401).end();
    }
  });

  function sendMessage(sender, recipient, contents) {
    var senderData = readDocument('users', sender);
    var recipientData = readDocument('users', recipient);
    var senderMessages = readDocument('messages', senderData.messages);
    var recipientMessages = readDocument('messages', recipientData.messages);

    var date = new Date().getTime();
    var newMessage = {
      "type" : "message",
      "contents" : {
        "sender" : sender,
        "recipient" : recipient,
        "date" : date,
        "contents" : contents
      }
    }
    senderMessages.push(newMessage);
    recipientMessages.push(newMessage);
    senderMessages.writeDocument('messages', newMessage);
    recipientMessages.writeDocument('messages', newMessage);
    return newMessage;
  }

  // HTTP request to send message to database
  app.post( '/user/:userid/messages', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userid = parseInt(req.params.userid, 10);
    if (fromUser === userid) {
      var recipientid = req.body.recipient;
      var newMessage = {
        "sender" : userid,
        "recipient" : recipientid,
        "date" : new Date().getTime(),
        "contents" : req.body.contents
      }
      // newMessage = addDocument('messages', newMessage);
      db.collection('messages').insertOne(newMessage, function(err, result){
        if (err) {
          return callback(err);
        } else {
          newMessage._id = result.insertedId;
          db.collection('users').findOne({ _id: userid }, function(err, userObject){
            if (err) {
              return callback(err);
            } else {
              db.collection('messages').updateOne({ _id: userObject.messages },
                {
                  $push: {
                    contents: {
                      $each: [newMessage._id],
                      $position: 0
                    }
                  }
                },
                function(err) {
                  if (err) {
                    return callback(err);
                  } else {
                    callback(null, newMessage);
                  }
                }
              );
            }
          });
          db.collection('users').findOne({ _id: recipientid }, function(err, userObject){
            if (err) {
              return callback(err);
            } else {
              db.collection('messages').updateOne({ _id: userObject.messages },
                {
                  $push: {
                    contents: {
                      $each: [newMessage._id],
                      $position: 0
                    }
                  }
                },
                function(err) {
                  if (err) {
                    return callback(err);
                  } else {
                    callback(null, newMessage);
                  }
                }
              );
            }
          });
        }
      });
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
  function getMessage(messageid) {
    var message = readDocument('messages', messageid);
    return message;
  }

  // HTTP request for messages from database
  app.get('/user/:userid/messages', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = parseInt(req.params.userid, 10);
    if(fromUser === userId){
      var messages = readDocument('users', userId).messages;
      messages.messages = messages.messages.map((message) => getMessage(message));
      res.send(messages);
    } else {
      res.status(401).end();
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
        return callback(null, null)
      } else {
        return callback(null, userData)
      }
    })
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
  // Reset database.
  app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    // This is a debug route, so don't do any validation.
    database.resetDatabase();
    // res.send() sends an empty response with status code 200
    res.send();
  });

  // Starts the server on port 3000!
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
// The file ends here. Nothing should be after this.
