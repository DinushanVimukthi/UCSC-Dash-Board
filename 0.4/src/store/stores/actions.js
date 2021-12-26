import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateuser
} from "firebase/auth";
import {
  ref,
  set,
  get,
  onChildAdded,
  onChildChanged,
  remove,
  onChildRemoved,
} from "firebase/database";
import { uploadBytes, ref as Sref, getDownloadURL,deleteObject } from "firebase/storage";
import { fAuth, fDb, fS } from "boot/firebase";
import { Notify } from "quasar";
import imageCompression from "browser-image-compression";
const MakeAdmin = async ({}, ID) => {
  console.log(ID);
  const userref = ref(fDb, "users" + "/" + ID + "/admin");
  const previousadminstatus = await get(userref);
  console.log(previousadminstatus.val());
  if (previousadminstatus.val()) {
    set(userref, false).then(() => {
      Notify.create({
        message: "User is no longer an admin",
        color: "negative",
      });
    });
  } else {
    set(userref, true);
    Notify.create({
      message: "User is an admin",
      color: "positive",
    });

  }
};
const RegisterUser = async ({ commit }, payload) => {
  console.log(payload);
  if (payload) {
    const val = await createUserWithEmailAndPassword(
      fAuth,
      payload.FormData.email,
      payload.FormData.password
    );
    const UserID = val.user.uid;
    if (val.user.uid) {
      Notify.create({
        timeout: "1000",
        color: "green-4",
        textColor: "white",
        icon: "account_circle",
        message: "Registered Successfully",
      });
    }
    // console.log(val);
    console.log(payload.model);
    const imageFile = payload.model;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const FileStorageref = Sref(fS, "/images/" + val.user.uid);
    const compressedFile = await imageCompression(imageFile, options);
    console.log(compressedFile);
    const snapshot = await uploadBytes(FileStorageref, compressedFile).then(
      () => {
        console.log("Uploaded a blob or file!");
      }
    );
    const Url = await getDownloadURL(FileStorageref);
    console.log(Url);

    const userref = ref(fDb, "users" + "/" + UserID);
    set(userref, {
      name: payload.FormData.name,
      email: payload.FormData.email,
      password: payload.FormData.password,
      admin: false,
      SuperAdmin: false,
      Url: Url,
    })
      .then(() => {
        console.log("User created");
        commit("userstore", {
          UserID,
          Data: {
            name: payload.FormData.name,
            email: payload.FormData.email,
            password: payload.FormData.password,
            admin: false,
            SuperAdmin: false,
            Url: Url,
          },
        });
        // route.push("/dash");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
async function LogUser({ commit }, payload) {
  console.log("LogUser");
  signInWithEmailAndPassword(fAuth, payload.email, payload.password)
    .then((response) => {
      // console.log(response);
      const getuserref = ref(fDb, "users" + "/" + response.user.uid);
      get(getuserref).then((snapshot) => {
        // console.log(snapshot.val());
        // console.log(snapshot.key);
        const userID = snapshot.key;
        commit("userstore", {
          UserID: snapshot.key,
          Data: {
            name: snapshot.val().name,
            email: snapshot.val().email,
            password: snapshot.val().password,
            admin: snapshot.val().admin,
            Url: snapshot.val().Url,
            SuperAdmin: snapshot.val().SuperAdmin,
          },
        });
      });
    })
    .catch((err) => {
      console.log(err.toString());
      Notify.create({
        timeout: "1000",
        color: "green-4",
        textColor: "white",
        icon: "account_circle",
        message: err.toString(),
      });
      // q.notify({
      //   timeout:'1000',
      //   color: 'green-4',
      //   textColor: 'white',
      //   icon: 'account_circle',
      //   message: 'Error'
      // })
    });
}
function LogOut({ commit }) {
  signOut(fAuth).then(() => {
    Notify.create({
      timeout: "1000",
      color: "green-4",
      textColor: "white",
      icon: "account_circle",
      message: "Logged Out",
    });
  });
}
function HandleAuthenticationStateChange({ commit, dispatch }) {
  onAuthStateChanged(fAuth, (user) => {
    console.log("Auth");
    if (user) {
      // console.log(user);
      const getuserref = ref(fDb, "users" + "/" + user.uid);
      // console.log(getuserref);
      dispatch("getCourses");
      get(getuserref).then((snapshot) => {
        // console.log(snapshot.val());
        if (snapshot.val()) {
          commit("userstore", {
            ID: snapshot.key,
            Data: {
              name: snapshot.val().name,
              email: snapshot.val().email,
              password: snapshot.val().password,
              admin: snapshot.val().admin,
              Url: snapshot.val().Url,
              SuperAdmin: snapshot.val().SuperAdmin,
            },
          });
          this.$router.push({ path: "/dash" });
        }
      });
    } else {
      console.log("not logged in");
      commit("clearuser");
      this.$router.push({ path: "/" });
    }
  });
}
const GetAllusers = async ({ commit }) => {
  let Alluserslist = {};
  console.log("Clicked");
  const usrsref = ref(fDb, "users/");
  const Allusers = await get(usrsref);
  Allusers.forEach((user) => {
    commit("AddAllUsers", {
      ID: user.key,
      Data: {
        name: user.val().name,
        email: user.val().email,
        password: user.val().password,
        admin: user.val().admin,
        SuperAdmin: user.val().SuperAdmin,
        Url: user.val().Url,
      },
    });

    Alluserslist[user.key] = user.val();
  });
  onChildRemoved(usrsref, (user) => {
    console.log("removed");
    commit("RemoveAUser", user.key);
    delete Alluserslist[user.key];
  });
  onChildChanged(usrsref, (user) => {
    console.log("changed");
    commit("UpdateAUser", {
      ID: user.key,
      Data: {
        name: user.val().name,
        email: user.val().email,
        password: user.val().password,
        admin: user.val().admin,
        SuperAdmin: user.val().SuperAdmin,
        Url: user.val().Url,
      },
    });
  });

  onChildAdded(usrsref, (user) => {
    console.log("added", user.val());
    Alluserslist[user.key] = user.val();
    commit("AddAllUsers", {
      ID: user.key,
      Data: {
        name: user.val().name,
        email: user.val().email,
        password: user.val().password,
        admin: user.val().admin,
        SuperAdmin: user.val().SuperAdmin,
        Url: user.val().Url,
      },
    });
    console.log(Alluserslist);
  });
};
function Updatecourses({ commit }, payload) {
  console.log(payload);
  const courseref = ref(fDb, "courses/" + payload.ID);
  // remove(courseref).then(()=>{
  //   console.log("Removed");
  // })
  console.log(payload);
  set(courseref, {
    CourseName: payload.CourseName,
    Day: payload.Day,
    Lecturer: payload.Lecturer,
    StartTime: payload.StartTime,
    EndTime: payload.EndTime,
    link: payload.link,
  });

  console.log("Successfully Updated");
}
function getCourses({ commit }) {
  const courseref = ref(fDb, "courses");
  const userref = ref(fDb, "users");
  onChildChanged(userref, (snapshot) => {
    console.log("user changed", fAuth.currentUser.uid);
    console.log(snapshot.key);
    const ID = snapshot.key;
    const Data = snapshot.val();
    if (snapshot.key === fAuth.currentUser.uid) {
      commit("updateusers", {
        ID,
        Data,
      });
    }
  });
  onChildAdded(courseref, (snapshot) => {
    console.log("child Added!");
    const ID = snapshot.key;
    const Type = snapshot.val();
    commit("getcourse", {
      ID,
      Type,
    });
  });
  onChildChanged(courseref, (snapshot) => {
    const ID = snapshot.key;
    const Type = snapshot.val();
    console.log("child Changed!");
    commit("updatecourse", {
      ID,
      Type,
    });
  });
  onChildRemoved(courseref, (snapshot) => {
    const ID = snapshot.key;
    commit("RemovecourseMut", ID);
  });
}
function RemoveCourse({ commit }, ID) {
  const courseref = ref(fDb, "courses/" + ID);
  remove(courseref).then(() => {
    console.log("removed");
  });
  commit("RemovecourseMut", ID);
}
const ChangeProfilename=({},payload)=>{
  console.log(payload);
  const userref = ref(fDb, "users/"+fAuth.currentUser.uid+"/name");
  set(userref,payload.name)
}
const ChangeProfilePicture=async ({},payload)=>{
 
  // console.log(payload);
  console.log(payload.file.type);
  const StorRef=Sref(fS,"images/"+fAuth.currentUser.uid);

  const Previousref=Sref(fS,"images/"+fAuth.currentUser.uid);
  deleteObject(Previousref).then((del)=>{
    console.log(del);
  })
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  const compressedfile=await imageCompression(payload.file,options);
  const Uploadnew=await uploadBytes(StorRef,compressedfile);
  console.log(Uploadnew);
  const newUrl=await getDownloadURL(StorRef,fAuth.currentUser.uid);
  const userref = ref(fDb, "users/"+fAuth.currentUser.uid+"/Url");
  set(userref,newUrl)
}

export {
  RegisterUser,
  RemoveCourse,
  LogUser,
  HandleAuthenticationStateChange,
  LogOut,
  MakeAdmin,
  getCourses,
  Updatecourses,
  GetAllusers,
  ChangeProfilename,
  ChangeProfilePicture
};
