import express from 'express';
import quizRouter from './quiz-router';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import path from 'path';

// LiveReload setup
const CLIENT_DIR = '/../../client/public'
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
app.use(express.static(path.join(__dirname, '/../../client/public')));
app.use(connectLivereload());

// Use express json
app.use(express.json());

// Api
app.use('/api/v1', quizRouter);

export default app;
