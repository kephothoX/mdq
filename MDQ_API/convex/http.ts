import { httpRouter } from 'convex/server'

import {
  newItem,
  updateItem,
  getItemById,
  getItems,
  getAllItems

} from './MDQBids';


import {
  submitTopicMessage,
  subscribeToTopic
} from './MDQ';

const http = httpRouter();



http.route({
  path: '/api/topics/message',
  method: 'POST',
  handler: submitTopicMessage
});


http.route({
  path: '/api/topic/subscribe',
  method: 'POST',
  handler: subscribeToTopic
});


http.route({
  path: '/api/items/new',
  method: 'POST',
  handler: newItem
});


http.route({
  path: '/api/item',
  method: 'POST',
  handler: getItemById
});

http.route({
  path: '/api/items/10',
  method: 'GET',
  handler: getItems
});

http.route({
  path: '/api/items',
  method: 'GET',
  handler: getAllItems
});


http.route({
  path: '/api/item/update',
  method: 'POST',
  handler: updateItem
});




// Convex expects the router to be the default export of `convex/http.js`.
export default http;

