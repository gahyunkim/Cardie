import {readDocument, writeDocument, addDocument} from './database.js';

var token = 'eyJpZCI6NX0=';

function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global FacebookError */
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
    FacebookError('Could not ' + verb + " " + resource + ": Received " +
    statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    FacebookError('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    FacebookError('Could not ' + verb + " " + resource +
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

// /**
// * Given a feed item ID, returns a FeedItem object with references resolved.
// * Internal to the server, since it's synchronous.
// */
export function getItemSync(itemId) {
  var item = readDocument('items', itemId);
  return item;
}
function getCategorySync(cId){
  var category = readDocument('categories', cId);
  category.items = category.items.map(getItemSync);
  return category;
}

export function removeItem(userId, itemId, cb){
  var user = readDocument('users', userId);
  var items = user.productManager.items;
  items = items.splice(items.indexOf(itemId), 1);
  writeDocument('users', user);
  emulateServerReturn(user, cb);
  sendXHR("DELETE", "/pm/" + userId + "/item/" + itemId, undefined, () => {
    cb();
  });
}

//
// /**
// * Emulates a REST call to get the feed data for a particular user.
// * @param user The ID of the user whose feed we are requesting.
// * @param cb A Function object, which we will invoke when the Feed's data is available.
// */
export function getFeedData(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Get the Feed object for the user.
  var feedData = readDocument('feeds', userData.feed);
  // Map the Feed's FeedItem references to actual FeedItem objects.
  // Note: While map takes a callback function as an argument, it is
  // synchronous, not asynchronous. It calls the callback immediately.
  feedData.items = feedData.items.map(getItemSync);
  // Return FeedData with resolved references.
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  emulateServerReturn(feedData, cb);
}

export function getCategories(user, cb){
  var userData = readDocument('users', user);
  var feedData = readDocument('feeds', userData.feed);
  feedData.categories = feedData.categories.map(getCategorySync);

  emulateServerReturn(feedData, cb);
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

export function getItem(itemId){
  var item = readDocument('items', itemId);
  return item;
}

export function likeItem(itemId, userId) {
  var item = readDocument('items', itemId);
  item.likeCounter.push(userId);
  writeDocument('items', item);
}

export function dislikeItem(itemId, userId) {
  var item = readDocument('items', itemId);
  item.dislikeCounter.push(userId);
  writeDocument('items', item);
}
