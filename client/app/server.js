var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNSJ9';

function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // The below comment tells ESLint that FacebookError is a global.
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


export function getProductManager(userId, cb){
  sendXHR("GET", "/user/" + userId + "/pm", undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function removeItem(userId, itemId, cb){
  sendXHR("DELETE", "/user/" + userId + "/pm/item/" + itemId, undefined, () => {
    cb();
  });
}

export function getUserProfile(userId, cb) {
  sendXHR('GET', '/profile/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getFeedData(user, cb) {
  sendXHR('GET', '/user/' + "000000000000000000000005" + '/feed' , undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function getCategories(user, cb){
  sendXHR('GET', '/users/' + user + '/feeds/categories', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function getItem(itemId, cb){ //hardcoded 5, add user with all items?
  sendXHR('GET', '/items/' + itemId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function likeItem(itemId, userId,cb) {
  sendXHR('PUT', '/users/' + userId + '/feeds/items/' + itemId +'/like',
  undefined, () => {
    cb();
  });
}
export function dislikeItem(itemId, userId, cb) {
  sendXHR('PUT', '/users/' + userId + '/feeds/items/' + itemId + '/dislike',
  undefined, () => {
    cb();
  });
}

export function sendMessage(senderId, recipientId, message, cb) {
  sendXHR('POST', '/users/' + senderId + '/messages', message, () => {
    cb();
  });
  sendXHR('POST', '/users/' + recipientId + '/messages', message, () => {
    cb();
  });
}

export function getMessages(userId, cb) {
  sendXHR('GET', '/user/' + userId + '/messages',
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function uploadItem(item, userid, cb) {
  sendXHR('POST', '/upload/' + userid, item, () => {
    cb();
  });

}
