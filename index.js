const express = require("express");
const socketio = require("socket.io");
const app = express();
var routes = require("./services/routes.js");
const PORT = process.env.PORT || 3000;

app.use("/", routes);

const http = require("http").Server(app);
const io = socketio(http);

var socketrouter = require("./services/routes.socket");

io.on("connection", (socket) => socketrouter(socket, io));

http.listen(PORT, () => console.log("listening on http://localhost:" + PORT));
