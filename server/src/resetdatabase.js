var ObjectID = require('mongodb').ObjectID;

var databaseName = "Cardie";
// Put the initial mock objects here.
var initialData = {
  // USERS
  "users": {
    "1" : {
      "_id" : new ObjectID("000000000000000000000001"),
      "nickname" : "phancis",
      "fullName" : "Francis Phan",
      "email" : "fphan@umass.edu",
      "location" : "Amherst, MA",
      "feed": new ObjectID("000000000000000000000001"),
      "productManager" : {
        "_id" : new ObjectID("000000000000000000000001"),
        "items" : [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000006"),new ObjectID("000000000000000000000007"),new ObjectID("000000000000000000000008")]
      },
      "messages" : {
        "_id" : new ObjectID("000000000000000000000001"),
        "messages" : [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")]
      }
    },
    "2" : {
      "_id" : new ObjectID("000000000000000000000002"),
      "nickname" : "rcui",
      "fullName" : "Richard Cui",
      "email" : "rcui@umass.edu",
      "location" : "Amherst, MA",
      "feed": new ObjectID("000000000000000000000002"),
      "productManager" : {
        "_id" : new ObjectID("000000000000000000000002"),
        "items" : []
      },
      "messages" : {
        "_id" : new ObjectID("000000000000000000000002"),
        "messages" : []
      }
    },
    "3" : {
      "_id" : new ObjectID("000000000000000000000003"),
      "nickname" : "r-man",
      "fullName" : "Roman Ganchin",
      "email" : "rganchin@umass.edu",
      "location" : "Amherst, MA",
      "feed": new ObjectID("000000000000000000000003"),
      "productManager" : {
        "_id" : new ObjectID("000000000000000000000003"),
        "items" : []
      },
      "messages" : {
        "_id" : new ObjectID("000000000000000000000003"),
        "messages" : []
      }
    },
    "4" : {
      "_id" : new ObjectID("000000000000000000000004"),
      "nickname" : "SuzyQ",
      "fullName" : "Suzie Kim",
      "email" : "gahyunkim@umass.edu",
      "location" : "Amherst, MA",
      "feed": new ObjectID("000000000000000000000004"),
      "productManager" : {
        "_id" : new ObjectID("000000000000000000000004"),
        "items" : []
      },
      "messages" : {
        "_id" : new ObjectID("000000000000000000000004"),
        "messages" : []
      }
    },
    "5" : {
      "_id" : new ObjectID("000000000000000000000005"),
      "username" : "DMix-Dogs",
      "description" : "We are DMix's dogs.",
      "languages" : "English",
      "fullName" : "Cardie Duncan",
      "email" : "cardieduncan@umass.edu",
      "location" : "Amherst, MA",
      "feed": new ObjectID("000000000000000000000005"),
      "productManager" : {
        "_id" : new ObjectID("000000000000000000000005"),
        "items" : [new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000004")]
      },
      "messages" : {
        "_id" : new ObjectID("000000000000000000000005"),
        "messages": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")]
      }
    }
  },

  // FEEDS
  "feeds" : {
    "1" : {
      "_id" : new ObjectID("000000000000000000000001"),
      "items" : [new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000004")],
      "categories" : ["Dorm","Snacks","Electronics"]
    },
    "2" : {
      "_id" : new ObjectID("000000000000000000000002"),
      "items" : [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"),
       new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000004"), new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000006"), new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000008")],
      "categories" : ["Dorm","Snacks","Electronics"]
    },
    "3" : {
      "_id" : new ObjectID("000000000000000000000003"),
      "items" : [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003"),
       new ObjectID("000000000000000000000004"), new ObjectID("000000000000000000000005"), new ObjectID("000000000000000000000006"),
        new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000008")],
      "categories" : ["Dorm","Snacks","Electronics"]
    },
    "4" : {
      "_id" : new ObjectID("000000000000000000000004"),
      "items" : [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"),
       new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000004"), new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000006"), new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000008")],
      "categories" : ["Dorm","Snacks","Electronics"]
    },
    "5" : {
      "_id" : new ObjectID("000000000000000000000005"),
      "items" : [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000005"), new ObjectID("000000000000000000000006"),
       new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000008")],
      "categories" : ["Dorm","Snacks","Electronics"]
    }

  },
  "categories":{
    "Dorm": {
      "_id": "Dorm",
      "items" : [new ObjectID("000000000000000000000001")]
    },
    "Snacks":{
      "_id": "Snacks",
      "items": [new ObjectID("000000000000000000000002")]
    },
    "Electronics":{
      "_id": "Electronics",
      "items":[new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000004"),
      new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000006"),new ObjectID("000000000000000000000007"),
      new ObjectID("000000000000000000000008")]
    }
  },
  // ITEMS
  "items" : {
    "1" :{
      "_id" : new ObjectID("000000000000000000000001"),
      "name" : "Lamp",
      "description" : "Nice lamp",
      "category" : "Dorm",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsMCzxryx0QSwPsKr-ScRGc3kSxdaosqJu8chDkyEwXiC4aqU1Aw",
      "photoID" : new ObjectID("000000000000000000000001"),
      "vendorID" : new ObjectID("000000000000000000000001")
    },
    "2" :{
      "_id" : new ObjectID("000000000000000000000002"),
      "name" : "Dog Biscuit",
      "description" : "Yummy",
      "category" : "Snacks",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "http://www.osm.net/images/08/06/broccoli/pasta-400-300.jpg",
      "photoID" : new ObjectID("000000000000000000000002"),
      "vendorID" : new ObjectID("000000000000000000000005")
    },
    "3" :{
      "_id" : new ObjectID("000000000000000000000003"),
      "name" : "Apple Lightning Charging Cable",
      "description" : "Nylon Braided Cable",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFFC_pYolfXwKK57BaDEBjLKNFJe6rhZzqHahgv2txwgCKs02Y",
      "photoID" : new ObjectID("000000000000000000000003"),
      "vendorID" : new ObjectID("000000000000000000000005")
    },
    "4" :{
      "_id" : new ObjectID("000000000000000000000004"),
      "name" : "Computer Mouse",
      "description" : "Cool computer mouse",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsS2HU6CFHO0I1KvzaQNGMeClVRmXpkjhQPQ5eqI0pVpajJk2",
      "photoID" : new ObjectID("000000000000000000000004"),
      "vendorID" : new ObjectID("000000000000000000000005")
    },
    "5" :{
      "_id" : new ObjectID("000000000000000000000005"),
      "name" : "Monitor",
      "description" : "Next generation 20K monitor",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "http://placehold.it/400x300",
      "photoID" : new ObjectID("000000000000000000000005"),
      "vendorID" : new ObjectID("000000000000000000000001")
    },
    "6" :{
      "_id" : new ObjectID("000000000000000000000006"),
      "name" : "Dongle",
      "description" : "You probably lost your last one",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG-Hryk1gJouTvAZapfsJncUDPyKnaqpp2s391AqhhcNkCd3MC",
      "photoID" : new ObjectID("000000000000000000000006"),
      "vendorID" : new ObjectID("000000000000000000000001")
    },
    "7" :{
      "_id" : new ObjectID("000000000000000000000007"),
      "name" : "Apple Watch",
      "description" : "time at your convenience",
      "category" : "Electronics",
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "https://s-media-cache-ak0.pinimg.com/564x/1e/a8/07/1ea80716e093c6de3e8f341c503533d8.jpg",
      "photoID" : new ObjectID("000000000000000000000007"),
      "vendorID" : new ObjectID("000000000000000000000001")
    },
    "8" :{
      "_id" : new ObjectID("000000000000000000000008"),
      "name" : "tiger",
      "description" : "this should not be in Electronics",
      "category" : "Electronics",
      //stores all the users that liked the item
      "likeCounter": [],
      "dislikeCounter": [],
      "contents" : "https://tse4.mm.bing.net/th?id=OIP.Mf749e3b566949daac2ba418a7e8fbbbbo0&pid=15.1",
      "photoID" : new ObjectID("000000000000000000000008"),
      "vendorID" : new ObjectID("000000000000000000000001")
    }
  },
  // Messages
  "messages" : {
    "1" : {
      "_id" : new ObjectID("000000000000000000000001"),
      "sender" : new ObjectID("000000000000000000000001"),
      "recipient" : new ObjectID("000000000000000000000005"),
      "date" : "1/1/2016",
      "contents" : "Hi, I would like to buy your tiger."
    },
    "2" : {
      "_id" : new ObjectID("000000000000000000000002"),
      "sender" : new ObjectID("000000000000000000000005"),
      "recipient" : new ObjectID("000000000000000000000001"),
      "date" : "1/1/2016",
      "contents" : "I am willing to trade my tiger for your dongle."
    },
    "3" : {
      "_id" : new ObjectID("000000000000000000000003"),
      "sender" : new ObjectID("000000000000000000000001"),
      "recipient" : new ObjectID("000000000000000000000005"),
      "date" : "1/1/2016",
      "contents" : "Ok I will meet you at the campus zoo."
    }
  }
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
