// this has to be definet: export type Update = { line: { from: { x: number, y: number }, to: { x: number, y: number } } };

export class Subscription {
    onopen: () => any = () => { };
    onmessage: (arg0: Message) => any = () => { };
    onclose: (code: number, reason: string) => any = () => { };
    onerror: (error: Error) => any = () => { };
}
  

class SocketService {
    /**
     * Connection to Chat server.
     *
     * @private
     */
    connection = new WebSocket('ws://localhost:3000/api/v1/grouproom');
    /**
     * Component subscriptions.
     *
     * @private
     */
    subscriptions = new Set(); // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  
    constructor() {
      this.connection.onopen = () => {
        // Call subscription onopen functions when connection is ready
        this.subscriptions.forEach((subscription) => subscription.onopen());
      };
  
      this.connection.onmessage = (event) => {
        // Call subscription onmessage functions on messages from Chat server
         const data = event.data;
        if (typeof data === 'string') {
            this.subscriptions.forEach((subscription) => subscription.onmessage(JSON.parse(data)));
        }
      };
  
      this.connection.onclose = (event) => {
        // Call subscription onclose functions when connection is closed
        this.subscriptions.forEach((subscription) => subscription.onclose(event.code, event.reason));
      };
  
      this.connection.onerror = () => {
        // Call subscription onerror functions on connection error
        const error = this.createError();
        this.subscriptions.forEach((subscription) => subscription.onerror(error));
      };
    }
  
    /**
     * Create Error object with more helpful information from connection ready state.
     *
     * @private
     */
    createError() {
      // Error messages from https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
      if (this.connection.readyState === WebSocket.CLOSING)
        return new Error('The connection is in the process of closing.');
      else if (this.connection.readyState === WebSocket.CLOSED)
        return new Error("The connection is closed or couldn't be opened.");
      else return new Error();
    }
  
    /**
     * Returns a subscription that enables multiple components to receive events from Chat server.
     */
    subscribe() {
      const subscription = new Subscription();
      this.subscriptions.add(subscription);
  
      // Call subscription.onopen or subscription.onerror() after subscription is returned
      setTimeout(() => {
        // Call subscription.onopen() if connection is already opened
        if (this.connection.readyState === WebSocket.OPEN) subscription.onopen();
        // Call subscription.onerror() if connection is already in a closing or closed state
        else if (
          this.connection.readyState === WebSocket.CLOSING ||
          this.connection.readyState === WebSocket.CLOSED
        )
          subscription.onerror(this.createError());
      });
  
      return subscription;
    }
  
    /**
     * Given subscription will no longer receive events from Chat server.
     */
    unsubscribe(subscription) {
        if (subscription) this.subscriptions.delete(subscription);
    }
  
    /**
     * Send message to Chat server.
     */
    send(update) {
      this.connection.send(JSON.stringify(update));
    }
  }
  
  const socketService = new SocketService();
  export default socketService;
  