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
  console.log(items)
  items = items.splice(items.indexOf(itemId), 1);
  console.log(user.productManager.items);
  writeDocument('users', user);
  emulateServerReturn(user, cb);
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
