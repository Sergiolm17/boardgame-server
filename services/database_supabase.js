const { supabase } = require("./supabase");

async function CreateRoom(sessionID, RoomID, DisplayName, admin = false) {
  let { body } = await supabase
    .from("Room")
    .insert([{ sessionID, RoomID, DisplayName, admin }], { upsert: true });

  return body;
}

async function DeleteSessionID(sessionID) {
  let { body } = await supabase
    .from("Room")
    .delete()
    .eq("sessionID", sessionID);
  return body;
}
async function UpdateDisplayName(sessionID, DisplayName) {
  let { body } = await supabase
    .from("Room")
    .update({ DisplayName })
    .eq("sessionID", sessionID);
  return body;
}
async function UpdateAdmin(sessionID, admin) {
  let { body } = await supabase
    .from("Room")
    .update({ admin })
    .eq("sessionID", sessionID);
  return body;
}
async function DeleteAll() {
  console.log("eliminado todo");
  let { body } = await supabase.from("Room").delete();
  return body;
}
//DeleteAll();
async function GetRoom(RoomID) {
  console.log(Object.keys({ RoomID }).pop());
  let { data: Room, error } = await supabase
    .from("Room")
    .select("*")
    .eq("RoomID", RoomID);
  return Room;
}

async function GetSession(sessionID) {
  let { data: Room, error } = await supabase
    .from("Room")
    .select("*")
    .eq("sessionID", sessionID);
  return Room;
}

module.exports = {
  CreateRoom,
  DeleteSessionID,
  UpdateDisplayName,
  UpdateAdmin,
  GetRoom,
  GetSession,
};
