"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_router_1 = __importDefault(require("./quiz-router"));
const livereload_1 = __importDefault(require("livereload"));
const connect_livereload_1 = __importDefault(require("connect-livereload"));
const path_1 = __importDefault(require("path"));
// LiveReload setup
const CLIENT_DIR = '/../../client/public';
const liveReloadServer = livereload_1.default.createServer();
liveReloadServer.watch(path_1.default.join(__dirname, CLIENT_DIR));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
// Express application
const app = express_1.default();
// Serve and watch client files
app.use(connect_livereload_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '/../../client/public')));
// Use express json
app.use(express_1.default.json());
// Api
app.use('/api/v1', quiz_router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map