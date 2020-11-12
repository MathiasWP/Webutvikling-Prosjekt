import WebSocket from 'ws';

/**
 * Chat server
 */
export default class QuizSocket {
  /**
   * Constructs a WebSocket server that will respond to the given path on webServer.
   */
  constructor(webServer, path: string) {
    const server = new WebSocket.Server({ server: webServer, path: path + '/grouproom' });

    server.on('connection', (connection, request) => {
      connection.on('message', (message) => {
        // Send the message to all current client connections
        server.clients.forEach((connection) => connection.send(message));
      });
    });
  }
}
