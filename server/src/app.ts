import express from 'express';
import quizRouter from './quiz-router';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import path from 'path';

const CLIENT_DIR = '../../../client/public'; // This is relative server/dist/src

// LiveReload setup - TODO: Make this work
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, CLIENT_DIR));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Express application
const app = express();

// Serve static and watch client files
app.use(express.static(path.join(__dirname, CLIENT_DIR)));
app.use(connectLivereload());

// Use express json
app.use(express.json());

// Api
app.use('/api/v1', quizRouter);

export default app;
