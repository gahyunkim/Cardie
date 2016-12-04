// Your startup's initial mock objects go here

var initialData = {
  // USERS
  "users": {
    "1" : {
      "_id" : 1,
      "nickname" : "phancis",
      "fullName" : "Francis Phan",
      "email" : "fphan@umass.edu",
      "location" : "Amherst, MA",
      "feed": 1,
      "productManager" : {
        "_id" : 1,
        "items" : [1,5,6,7,8]
      },
      "messages" : {
        "_id" : 1,
        "messages" : [1, 2, 3]
      }
    },
    "2" : {
      "_id" : 2,
      "nickname" : "rcui",
      "fullName" : "Richard Cui",
      "email" : "rcui@umass.edu",
      "location" : "Amherst, MA",
      "feed": 2,
      "productManager" : {
        "_id" : 2,
        "items" : []
      },
      "messages" : {
        "_id" : 2,
        "messages" : []
      }
    },
    "3" : {
      "_id" : 3,
      "nickname" : "r-man",
      "fullName" : "Roman Ganchin",
      "email" : "rganchin@umass.edu",
      "location" : "Amherst, MA",
      "feed": 3,
      "productManager" : {
        "_id" : 3,
        "items" : []
      },
      "messages" : {
        "_id" : 3,
        "messages" : []
      }
    },
    "4" : {
      "_id" : 4,
      "nickname" : "SuzyQ",
      "fullName" : "Suzie Kim",
      "email" : "gahyunkim@umass.edu",
      "location" : "Amherst, MA",
      "feed": 4,
      "productManager" : {
        "_id" : 4,
        "items" : []
      },
      "messages" : {
        "_id" : 4,
        "messages" : []
      }
    },
    "5" : {
      "_id" : 5,
      "username" : "DMix-Dogs",
      "description" : "We are DMix's dogs.",
      "languages" : "English",
      "fullName" : "Cardie Duncan",
      "email" : "cardieduncan@umass.edu",
      "location" : "Amherst, MA",
      "feed": 5,
      "productManager" : {
        "_id" : 5,
        "items" : [2, 3, 4]
      },
      "messages" : {
        "_id" : 5,
        "messages": [1, 2, 3]
      }
    }
  },

  // FEEDS
  "feeds" : {
    "1" : {
      "_id" : 1,
      "items" : [2, 3, 4],
      "categories" : ["Dorm","Snacks","Electronics"]
    },
    "2" : {
      "_id" : 2,
      "items" : [1, 2, 3, 4, 5, 6, 7, 8],
      "categories" : ["Dorm","Snacks","Electronics"]
    },
    "3" : {
      "_id" : 3,
      "items" : [1, 2, 3, 4, 5, 6, 7, 8],
      "categories" : ["Dorm","Snacks","Electronics"]
    },
    "4" : {
      "_id" : 4,
      "items" : [1, 2, 3, 4, 5, 6, 7, 8],
      "categories" : ["Dorm","Snacks","Electronics"]
    },
    "5" : {
      "_id" : 5,
      "items" : [1, 5, 6, 7, 8],
      "categories" : ["Dorm","Snacks","Electronics"]
    }

  },
  "categories":{
    "Dorm": {
      "_id": "Dorm",
      "items" : [1]
    },
    "Snacks":{
      "_id": "Snacks",
      "items": [2]
    },
    "Electronics":{
      "_id": "Electronics",
      "items":[3,4,5,6,7,8]
    }
  },
  // ITEMS
  "items" : {
    "1" :{
      "_id" : 1,
      "name" : "Lamp",
      "description" : "Nice lamp",
      "category" : "Dorm",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "http://placehold.it/400x300",
      "photoID" : 1,
      "vendorID" : 1
    },
    "2" :{
      "_id" : 2,
      "name" : "Dog Biscuit",
      "description" : "Yummy",
      "category" : "Snacks",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "http://placehold.it/400x300",
      "photoID" : 2,
      "vendorID" : 5
    },
    "3" :{
      "_id" : 3,
      "name" : "Apple Lightning Charging Cable",
      "description" : "Nylon Braided Cable",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "http://placehold.it/400x300",
      "photoID" : 3,
      "vendorID" : 5
    },
    "4" :{
      "_id" : 4,
      "name" : "Computer Mouse",
      "description" : "Cool computer mouse",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "http://placehold.it/400x300",
      "photoID" : 4,
      "vendorID" : 5
    },
    "5" :{
      "_id" : 5,
      "name" : "Monitor",
      "description" : "Next generation 20K monitor",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "http://placehold.it/400x300",
      "photoID" : 5,
      "vendorID" : 1
    },
    "6" :{
      "_id" : 6,
      "name" : "Dongle",
      "description" : "You probably lost your last one",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "http://placehold.it/400x300",
      "photoID" : 6,
      "vendorID" : 1
    },
    "7" :{
      "_id" : 7,
      "name" : "Apple Watch",
      "description" : "time at your convenience",
      "category" : "Electronics",
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "http://placehold.it/400x300",
      "photoID" : 7,
      "vendorID" : 1
    },
    "8" :{
      "_id" : 8,
      "name" : "tiger",
      "description" : "this should not be in Electronics",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "https://tse4.mm.bing.net/th?id=OIP.Mf749e3b566949daac2ba418a7e8fbbbbo0&pid=15.1",
      "photoID" : 8,
      "vendorID" : 1
    }
  },
  // Messages
  "messages" : {
    "1" : {
      "_id" : 1,
      "sender" : 1,
      "recipient" : 5,
      "date" : "1/1/2016",
      "contents" : "Hi, I would like to buy your tiger."
    },
    "2" : {
      "_id" : 2,
      "sender" : 5,
      "recipient" : 1,
      "date" : "1/1/2016",
      "contents" : "I am willing to trade my tiger for your dongle."
    },
    "3" : {
      "_id" : 3,
      "sender" : 1,
      "recipient" : 5,
      "date" : "1/1/2016",
      "contents" : "Ok I will meet you at the campus zoo."
    }
  }
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
