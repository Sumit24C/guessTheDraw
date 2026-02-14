import { Socket } from "socket.io";
import { EventTypeEnum } from "../enums/EventTypeEnum";
import { webSocketService } from "../services/webSocketService";

export const gameCreateHandler = (socket: Socket) => {
    socket.on(EventTypeEnum.CREATE_GAME, () => {
        console.log("game created")
    })
}

export const drawHandler = (socket: Socket) => {
    socket.on(EventTypeEnum.DRAW, (commands: Array<Array<Number>>) => {
        webSocketService.sendToAll(
            socket,
            EventTypeEnum.DRAW,
            commands
        )
    })
}
