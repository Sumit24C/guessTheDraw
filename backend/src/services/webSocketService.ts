import { Server, Socket } from "socket.io";
import { Server as httpServer } from "http";
import { gameCreateHandler } from "../handlers/gameHandler";
import type { EventTypeEnum } from "../enums/EventTypeEnum";

class WebSocketService {
    private static _instance: WebSocketService | null
    private io: Server | null = null
    private constructor() { }

    public static getInstance(): WebSocketService {
        if (!WebSocketService._instance) {
            WebSocketService._instance = new WebSocketService()
        }
        return WebSocketService._instance
    }

    public init(server: httpServer): void {
        this.io = new Server(server, {
            transports: ["websocket"],
            cors: {
                origin: ["http://localhost:3000"]
            },
        });

        this.io.on("connection", (socket) => {
            gameCreateHandler(socket)
        })
    }

    public sendPrivate(socket: Socket, event: EventTypeEnum, message: any) {
        this.io?.to(socket.id).emit(event, message);
    }

    public sendToRoom(roomId: string, event: EventTypeEnum, message: any) {
        this.io?.to(roomId).emit(event, message);
    }

    public sendToAll(socket: Socket, event: EventTypeEnum, message: any) {
        socket.broadcast.emit(event, message);
    }
}

export const webSocketService = WebSocketService.getInstance()