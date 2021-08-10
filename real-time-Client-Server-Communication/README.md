# Real Time Client/Server Communication

> /long-polling
Long polling is the simplest way of having persistent connection with server, that doesn’t use any specific protocol like WebSocket or Server Side Events.
Being very easy to implement, it’s also good enough in a lot of cases.


> /event-sourcing
The Server-Sent Events specification describes a built-in class EventSource, that keeps connection with the server and allows to receive events from it.
Similar to WebSocket, the connection is persistent. EventSource is a less-powerful way of communicating with the server than WebSocket. Server-Sent Events are simpler. In many applications, the power of WebSocket is a little bit too much.


> /websockets
The WebSocket protocol provides a way to exchange data between browser and server via a persistent connection. The data can be passed in both directions as “packets”, without breaking the connection and additional HTTP-requests.
WebSocket is especially great for services that require continuous data exchange, e.g. online games, real-time trading systems and so on.


To start the server use:
node server.js

To view the client, go to the address:
http://127.0.0.1:5000/index.html 