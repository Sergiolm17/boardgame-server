const superagent = require("superagent");
var { config } = require("../variables");

async function CreateRoom(sessionID, RoomID, DisplayName, admin = false) {
  await superagent
    .put(`${config.urlsocket}/Rooms/${sessionID}.json`)
    .send({ sessionID, RoomID, DisplayName, admin });
}
async function UpdateDisplayName(sessionID, DisplayName) {
  await superagent
    .put(`${config.urlsocket}/Rooms/${sessionID}.json`)
    .send({ sessionID, DisplayName });
}

async function DeleteSessionID(sessionID) {
  await superagent.delete(`${config.urlsocket}/Rooms/${sessionID}.json`);
}

async function GetRoom(RoomID) {
  const { body } = await superagent.get(
    `${config.urlsocket}/Rooms.json?orderBy="RoomID"&equalTo="${RoomID}"`
  );
  return body;
}

async function GetSession(sessionID) {
  const { body } = await superagent.get(
    `${config.urlsocket}/Rooms/${sessionID}.json`
  );
  return body;
}

module.exports = {
  CreateRoom,
  UpdateDisplayName,
  DeleteSessionID,
  GetRoom,
  GetSession,
};
