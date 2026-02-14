import express from "express";
import http from "http";
import { webSocketService } from "./services/webSocketService";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

webSocketService.init(server);

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})