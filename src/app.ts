import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

// Routes
import {CommonRoutes} from './common/common.routes';
import { BookRoutes } from './books/books.routes';
import { AuthorRoutes } from './books/authors.routes';



const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.SERVER_PORT;
console.log(port)
const routes: Array<CommonRoutes> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));


routes.push(new BookRoutes(app));
routes.push(new AuthorRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});



server.listen(port, () => {    
    routes.forEach((route: CommonRoutes) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});