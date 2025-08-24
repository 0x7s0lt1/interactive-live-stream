import { Server } from "socket.io";
import { createServer } from "http";

const port = process.env.PORT || 4444;

let screenSocket;

(async () => {

    const server = createServer();

    const io = new Server(server, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {

        socket.emit("handshake", { id: socket.id });

        socket.on("screenConnect", () => {
            screenSocket = socket;
        });

        socket.on("action", (data) => {
            if (screenSocket) {
                screenSocket.emit("action", data);
            }
        });

        socket.on("disconnect", () => {
            if (screenSocket?.id === socket.id) {
                screenSocket = null;
            }
        });

    });

    server.listen(port);

})();