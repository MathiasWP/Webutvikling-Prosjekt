/**
 * Web server entry point used in `npm start`.
 */
import app from './app';
import http from 'http';
import QuizSocket from './quiz-socket'

const port = 3001;

const webServer = http.createServer(app);
const chatServer = new QuizSocket(webServer, '/api/v1');

webServer.listen(port, () => {
    console.info(`Server running on port ${port}`);
});
