import {readDocument, writeDocument, addDocument} from './database.js';

var token = 'eyJpZCI6NX0=';

function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // The below comment tells ESLint that CardieError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global CardieError */
  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      CardieError('Could not ' + verb + " " + resource + ": Received " +
      statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    CardieError('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    CardieError('Could not ' + verb + " " + resource +
    ": Request timed out.");
  });
  switch (typeof(body)) {
    case 'undefined':
    // No body to send.
    xhr.send();
    break;
    case 'string':
    // Tell the server we are sending text.
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.send(body);
    break;
    case 'object':
    // Tell the server we are sending JSON.
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Convert body into a JSON string.
    xhr.send(JSON.stringify(body));
    break;
    default:
    throw new Error('Unknown body type: ' + typeof(body));
  }
}






/**
* Emulates how a REST call is *asynchronous* -- it calls your function back
* some time in the future with data.
*/
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function removeItem(userId, itemId, cb){
  sendXHR("DELETE", "/pm/" + userId + "/item/" + itemId, undefined, () => {
    cb();
  });
}

export function getUserProfile(userId) {
  var userData = readDocument('users', userId);
  return userData;
}

export function createUserDescription(content, userId, cb) {
  var userData = readDocument('users', userId)
  var description = userData.description;
  if (description !== "") {
    userData.description = content;
    // userData.description.replace(description, content);
  }
  writeDocument('users', userId);
  emulateServerReturn(userData, cb);
}
export function getFeedData(user, cb) {
  sendXHR('GET', '/users/' + user + '/feeds', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function getCategories(user, cb){
  sendXHR('GET', '/users/' + user + '/feeds/categories', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function getItem(itemId, cb){
  sendXHR('GET', '/items/' + itemId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function likeItem(itemId, userId,cb) {
  sendXHR('PUT', '/users/' + userId + '/feeds/items/' + itemId + '/likeCounter/'+ userId,
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function dislikeItem(itemId, userId, cb) {
  sendXHR('PUT', '/users/' + userId + '/feeds/items/' + itemId + '/dislikeCounter/'+ userId,
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function sendMessage(senderId, recipientId, message) {
  var date = new Date();

}

export function getMessages(userId) {

}

export function uploadItem(user, itemName, contents, category, picture, cb) {
  var item = {
    "_id" : user,
    "name" : itemName,
    "description" : contents,
    "category" : category,
    //stores all the users that liked the item
    "likeCounter": [],
    "dislikeCounter": [],
    "contents" : "http://placehold.it/400x300" //replace with uploaded picture later
  };
  item = addDocument('items', item);
  var userData = readDocument('users', user);
  var feedData = readDocument('feeds', userData.feed);  //update the feed
  writeDocument('feeds', feedData);
  emulateServerReturn(item, cb);
}
