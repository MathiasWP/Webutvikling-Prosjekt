const express = require('express');
const quizRouter = require('./quiz-router');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const path = require('path');

/**
 * NOTE:
 * There is a bug with importing .ts files (https://l.messenger.com/l.php?u=https%3A%2F%2Fgithub.com%2FMicrosoft%2FTypeScript%2Fissues%2F27481&h=AT0OSFV9KMgv2JlsmMI6Wf_s-9lUyWaxu1RLPR1WbQnagQIHJ9n9V_emd7vsrAvBXOBCoGmDgdJoWy65kdfPGwrIYsBFFzsYraTtOyKydcHpSfRYv2pde2PE4kcBYHdmK-SLi4ZWvV0)
 * Therefore this has to be a JavaScript file, we hope that's okay.
 */

const CLIENT_DIR = '../../../client/public'; // This is relative server/dist/src
const CLIENT_DIR_STATIC = '../../../client/public//static'; // This is relative server/dist/src

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

app.use('/static', express.static(path.join(__dirname, CLIENT_DIR_STATIC)));

app.use(connectLivereload());

// Use express json
app.use(express.json());

// Api
app.use('/api/v1', quizRouter);

app.get('*', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, CLIENT_DIR) });
});

app.get('/*/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, CLIENT_DIR) });
});

module.exports = app;
