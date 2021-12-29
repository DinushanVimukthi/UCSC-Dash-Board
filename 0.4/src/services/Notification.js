import { fAuth, fDb } from "boot/firebase";
import {
  onChildAdded,
  onChildChanged,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";
const Create_Notifications = (
  Notification_Name,
  Notification_Title,
  Notification_Body
) => {
const notifications = new Notification(Notification_Name, {
    title: Notification_Title,
    body: Notification_Body,
    tag: "notification",
  });
};
const Update_Course = () => {
  console.log("Updated_lik");
  const courseref = ref(fDb, "courses/");
  onChildChanged(courseref, (snapshot) => {
    console.log(snapshot.val());
    let Tag = snapshot.key.toString().substring(0, 7) + " ";
    snapshot.key.toString().substring(8, 10) == "PS"
      ? (Tag += "Practical Session")
      : snapshot.key.toString().substring(8, 10) == "LS"
      ? (Tag += "Lecture Session")
      : snapshot.key.toString().substring(8, 10) == "TS"
      ? (Tag += "Tutorial Session")
      : (Tag += "Other Session");
    // console.log(Tag);
    console.log(snapshot.key.toString().substring(0, 7));
    Create_Notifications(Tag, Tag, "Course Updated");
  });
};

const Update_Events = () => {
  console.log("Update_Events");
  const eventref = ref(fDb, "Events/");
  onChildAdded(eventref, (snapshot) => {
    console.log(snapshot.val());
    Create_Notifications(
      snapshot.key.split("_").join(" "),
      snapshot.key.split("_").join(" "),
      "New Event Added"
    );
    set_Notification(
      "Events",
      snapshot.key,
      snapshot.key.split("_").join(" "),
      snapshot.key.split("_").join(" "),
      snapshot.key.split("_")[0] + " Event Added"
    );
  });
  onChildChanged(eventref, (snapshot) => {
    let Tag = snapshot.key.split("_").join(" ");
    if (snapshot.val().IsSpecial) {
      console.log("Special Event");
      Create_Notifications(Tag, Tag, "Event Updated");
    } else {
      console.log("Normal Event");
      // Create_Notifications(Tag, "Event Updated");
    }
  });
};
const set_Notification = async (event, type, not_name, not_title, not_body) => {
  let Time = new Date();
  const notificationref = ref(fDb, "Notifications/" + event + "/" + type);
  const get_snap = await set(notificationref, {
    Notification_Added_Time: Time,
    Notification_Name: not_name,
    Notification_Title: not_title,
    Notification_Body: not_body,
  });
  console.log(get_snap);
};
const Remove_Notifications = async (event, type) => {
  remove(ref(fDb, "Notifications/" + event + "/" + type));
  console.log("Removed");
};

export {
  Create_Notifications,
  Update_Course,
  Update_Events,
  Remove_Notifications,
  set_Notification,
};
