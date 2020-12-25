const randomstring = require("randomstring");
const {
  DeleteSessionID,
  CreateRoom,
  UpdateDisplayName,
  UpdateAdmin,
  GetRoom,
  GetSession,
} = require("./database_supabase");
const lenght_code = 4;
module.exports = async (socket, io) => {
  const sessionID = socket.id;
  //console.log("a user connected ", sessionID);

  socket.on("disconnecting", disconnecting);
  socket.on("createRoom", createRoom);
  socket.on("joinRoom", joinRoom);
  socket.on("leaveRoom", leaveRoom);

  socket.on("eventRoom", eventRoom);

  async function disconnecting(msg) {
    let [Room] = await GetSession(sessionID);
    if (Room) {
      await DeleteSessionID(sessionID);
      let list = await GetRoom(Room.RoomID);
      await UpdateAdmin(list[0].sessionID, true);
      console.log(list);

      socket.broadcast.to(Room.RoomID).emit("playersUpdated", list);
    }
    socket.leaveAll();
  }

  async function createRoom({ DisplayName }) {
    let [Room] = await GetSession(sessionID);
    if (Room) {
      let list = await GetRoom(Room.RoomID);
      socket.join(Room.RoomID);
      socket.emit("roomJoined", {
        RoomID: Room.RoomID,
        players: list,
      });
    } else {
      var RoomID = randomstring.generate({
        length: lenght_code,
        charset: "numeric",
      });
      let Room = await CreateRoom(sessionID, RoomID, DisplayName, true);
      socket.join(RoomID.toString());
      socket.emit("roomJoined", {
        RoomID: RoomID.toString(),
        players: Room,
      });
    }
  }

  async function joinRoom({ RoomID, DisplayName }) {
    //Comprobar si el codigo es correcto
    if (RoomID.length !== lenght_code) {
      socket.emit("roomBadId");
      return;
    }
    //Buscar en BD si uniste al grupo
    let list = await GetRoom(RoomID);
    if (list.filter((e) => e.sessionID === sessionID).length) {
      console.log("Ya te uniste a este grupo");
      await UpdateDisplayName(sessionID, DisplayName);
      return;
    }

    if (Object.keys(list).length > 0) {
      console.log(
        "Usuarios activos en la habitación ",
        Object.keys(list).length
      );
      let Room = await CreateRoom(sessionID, RoomID, DisplayName);
      socket.join(RoomID);
      let players = [...Room, ...list];
      socket.emit("roomJoined", {
        RoomID: RoomID.toString(),
        players,
      });
      socket.broadcast.to(RoomID).emit("playersUpdated", players);
    } else {
      socket.emit("roomBadId");
    }
  }

  async function leaveRoom({ RoomID }) {
    if (RoomID) {
      socket.leave(RoomID);
    } else {
      let [Room] = await GetSession(sessionID);
      if (Room) {
        await DeleteSessionID(sessionID);
        let list = await GetRoom(Room.RoomID);
        socket.broadcast.to(Room.RoomID).emit("playersUpdated", list);
      }
      socket.leaveAll();
    }
  }

  async function eventRoom({ RoomID, msg }) {
    if (RoomID) {
      console.log({ RoomID, msg });
      socket.broadcast.to(RoomID).emit("eventRoom", msg);
    }
  }
};
