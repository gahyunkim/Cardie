import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "Cardie";

// Put your mock objects here, as in Workshop 4
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
      "likeCounter": [2,3],
      "dislikeCounter": [4,5],
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
      "likeCounter": [5],
      "dislikeCounter": [],
      "contents" : "https://tse4.mm.bing.net/th?id=OIP.Mf749e3b566949daac2ba418a7e8fbbbbo0&pid=15.1",
      "photoID" : 8,
      "vendorID" : 1
    }
  }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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
* half of the course. 🙂
*/
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
* Emulates writing a "document" to a NoSQL database.
*/
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
* Adds a new document to the NoSQL database.
*/
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
* Reset our browser-local database.
*/
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
* Reset database button.
*/
export class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/resetdb');
        xhr.addEventListener('load', function() {
          window.alert("Database reset! Refreshing the page now...");
          document.location.reload(false);
        });
        xhr.send();
      }}>Reset Mock DB</button>
    );
  }
}
