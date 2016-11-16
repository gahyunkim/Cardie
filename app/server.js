import {readDocument, writeDocument, addDocument} from './database.js';

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
function getFeedItemSync(itemId) {
  var item = readDocument('items', itemId);
  return item;
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
  feedData.items = feedData.items.map(getFeedItemSync);
  // Return FeedData with resolved references.
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  emulateServerReturn(feedData, cb);
}

export function getItems(){
  var items = readDocument('items', 8);
  return items;
}


export function getUserProfile(userId) {
  var userData = readDocument('users', userId);
  return userData;
}

export function createUserDescription(content, userId, cb) {
  var userData = readDocument('users', userId)
  var description = userData.description;
  userData.description.replace(description, content);
  writeDocument('users', userId);
  emulateServerReturn(userData, cb);
}
