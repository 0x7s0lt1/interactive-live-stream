const http = require("http");
const io = require("socket.io");

const port = process.env.PORT || 4444;

const app = http.createServer();

const server = io(app, {
    cors: { origin: "*" },
});

let screenSocket;
server.on("connection", (socket) => {

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