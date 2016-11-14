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
      "fullName" : "Francis Phan",
      "email" : "fphan@umass.edu",
      "location" : "Amherst, MA",
      "productManager" : {
        "_id" : 1,
        "items" : [1,3]
      }
    },
    "2" : {
      "_id" : 2,
      "fullName" : "Richard Cui",
      "email" : "rcui@umass.edu",
      "location" : "Amherst, MA",
      "productManager" : {
        "_id" : 2,
        "items" : []
      }
    },
    "3" : {
      "_id" : 3,
      "fullName" : "Roman Ganchin",
      "email" : "rganchin@umass.edu",
      "location" : "Amherst, MA",
      "productManager" : {
        "_id" : 3,
        "items" : []
      }
    },
    "4" : {
      "_id" : 4,
      "fullName" : "Suzie Kim",
      "email" : "gahyunkim@umass.edu",
      "location" : "Amherst, MA",
      "productManager" : {
        "_id" : 4,
        "items" : []
      }
    },
    "5" : {
      "_id" : 5,
      "fullName" : "Cardie Duncan",
      "email" : "cardieduncan@umass.edu",
      "location" : "Amherst, MA",
      "productManager" : {
        "_id" : 5,
        "items" : [2]
      }
    }
  },
  // FEEDS
  "feeds" : {
    "1" : {
      "_id" : 1,
      "items" : [2]
    },
    "2" : {
      "_id" : 2,
      "items" : [1,2,3]
    },
    "3" : {
      "_id" : 3,
      "items" : [1,2,3]
    },
    "4" : {
      "_id" : 4,
      "items" : [1,2,3]
    },
    "5" : {
      "_id" : 5,
      "items" : [1,3]
    }

  },
  // ITEMS
  "items" : {
    "1" :{
      "_id" : 1,
      "name" : "Lamp",
      "description" : "Nice lamp",
      "category" : "Dorm",
      "photoID" : 1,
      "vendorID" : 1
    },
    "2" :{
      "_id" : 2,
      "name" : "Dog Biscuit",
      "description" : "Yummy",
      "category" : "Snacks",
      "photoID" : 2,
      "vendorID" : 5
    },
    "3" :{
      "_id" : 3,
      "name" : "Apple Lightning Charging Cable",
      "description" : "Nylon Braided Cable",
      "category" : "Eletronics",
      "photoID" : 3,
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
 * half of the course. :)
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
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
